// Copyright 2012 The Obvious Corporation.

/*
 * This simply fetches the right version of phantom for the current platform.
 */

'use strict'

var requestProgress = require('request-progress')
var progress = require('progress')
var AdmZip = require('adm-zip')
var cp = require('child_process')
var fs = require('fs-extra')
var glob = require('glob')
var helper = require('./lib/phantomjs')
var kew = require('kew')
var mkdirp = require('mkdirp')
var npmconf = require('npmconf')
var path = require('path')
var request = require('request')
var os = require('os')
var url = require('url')
var which = require('which')


var originalPath = process.env.PATH

// If the process exits without going through exit(), then we did not complete.
var validExit = false

process.on('exit', function () {
  if (!validExit) {
    console.log('Install exited unexpectedly')
    exit(1)
  }
})

// NPM adds bin directories to the path, which will cause `which` to find the
// bin for this package not the actual phantomjs bin.  Also help out people who
// put ./bin on their path
process.env.PATH = helper.cleanPath(originalPath)

var libPath = path.join(__dirname, 'lib')
var pkgPath = path.join(libPath, 'phantom', 'bin')
var phantomPath = null
var tmpPath = null

var npmConfPromise = kew.nfcall(npmconf.load)

// If the user manually installed PhantomJS, we want
// to use the existing version.
//
// Do not re-use a manually-installed PhantomJS with
// a different version.
//
// Do not re-use an npm-installed PhantomJS, because
// that can lead to weird circular dependencies between
// local versions and global versions.
// https://github.com/Obvious/phantomjs/issues/85
// https://github.com/Medium/phantomjs/pull/184
kew.resolve(true)
  .then(function () {
    return tryPhantomjsOnPath()
  })
  .then(function () {
    return downloadPhantomjs()
  })
  .then(function (downloadedFile) {
    return extractDownload(downloadedFile)
  })
  .then(function (extractedPath) {
    return copyIntoPlace(extractedPath, pkgPath)
  })
  .then(function () {
    var location = process.platform === 'win32' ?
        path.join(pkgPath, 'phantomjs.exe') :
        path.join(pkgPath, 'phantomjs')

    try {
      // Ensure executable is executable by all users
      fs.chmodSync(location, '755')
    } catch (err) {
      if (err.code == 'ENOENT') {
        console.error('chmod failed: phantomjs was not successfully copied to', location)
        exit(1)
      }
      throw err
    }

    var relativeLocation = path.relative(libPath, location)
    writeLocationFile(relativeLocation)

    console.log('Done. Phantomjs binary available at', location)
    exit(0)
  })
  .fail(function (err) {
    console.error('Phantom installation failed', err, err.stack)
    exit(1)
  })


function writeLocationFile(location) {
  console.log('Writing location.js file')
  if (process.platform === 'win32') {
    location = location.replace(/\\/g, '\\\\')
  }
  fs.writeFileSync(path.join(libPath, 'location.js'),
      'module.exports.location = "' + location + '"')
}

function exit(code) {
  validExit = true
  process.env.PATH = originalPath
  process.exit(code || 0)
}


function findSuitableTempDirectory(npmConf) {
  var now = Date.now()
  var candidateTmpDirs = [
    process.env.TEMP || process.env.TMPDIR || npmConf.get('tmp'),
    '/tmp',
    path.join(process.cwd(), 'tmp')
  ]

  for (var i = 0; i < candidateTmpDirs.length; i++) {
    var candidatePath = path.join(candidateTmpDirs[i], 'phantomjs')

    try {
      fs.mkdirsSync(candidatePath, '0777')
      // Make double sure we have 0777 permissions; some operating systems
      // default umask does not allow write by default.
      fs.chmodSync(candidatePath, '0777')
      var testFile = path.join(candidatePath, now + '.tmp')
      fs.writeFileSync(testFile, 'test')
      fs.unlinkSync(testFile)
      return candidatePath
    } catch (e) {
      console.log(candidatePath, 'is not writable:', e.message)
    }
  }

  console.error('Can not find a writable tmp directory, please report issue ' +
      'on https://github.com/Obvious/phantomjs/issues/59 with as much ' +
      'information as possible.')
  exit(1)
}


function getRequestOptions(conf) {
  var strictSSL = conf.get('strict-ssl')
  if (process.version == 'v0.10.34') {
    console.log('Node v0.10.34 detected, turning off strict ssl due to https://github.com/joyent/node/issues/8894')
    strictSSL = false
  }


  var options = {
    uri: getDownloadUrl(),
    encoding: null, // Get response as a buffer
    followRedirect: true, // The default download path redirects to a CDN URL.
    headers: {},
    strictSSL: strictSSL
  }

  var proxyUrl = conf.get('https-proxy') || conf.get('http-proxy') || conf.get('proxy')
  if (proxyUrl) {

    // Print using proxy
    var proxy = url.parse(proxyUrl)
    if (proxy.auth) {
      // Mask password
      proxy.auth = proxy.auth.replace(/:.*$/, ':******')
    }
    console.log('Using proxy ' + url.format(proxy))

    // Enable proxy
    options.proxy = proxyUrl

    // If going through proxy, use the user-agent string from the npm config
    options.headers['User-Agent'] = conf.get('user-agent')
  }

  // Use certificate authority settings from npm
  var ca = conf.get('ca')
  if (ca) {
    console.log('Using npmconf ca')
    options.ca = ca
  }

  return options
}


function requestBinary(requestOptions, filePath) {
  var deferred = kew.defer()

  var writePath = filePath + '-download-' + Date.now()

  console.log('Receiving...')
  var bar = null
  requestProgress(request(requestOptions, function (error, response, body) {
    console.log('')
    if (!error && response.statusCode === 200) {
      fs.writeFileSync(writePath, body)
      console.log('Received ' + Math.floor(body.length / 1024) + 'K total.')
      fs.renameSync(writePath, filePath)
      deferred.resolve(filePath)

    } else if (response) {
      console.error('Error requesting archive.\n' +
          'Status: ' + response.statusCode + '\n' +
          'Request options: ' + JSON.stringify(requestOptions, null, 2) + '\n' +
          'Response headers: ' + JSON.stringify(response.headers, null, 2) + '\n' +
          'Make sure your network and proxy settings are correct.\n\n' +
          'If you continue to have issues, please report this full log at ' +
          'https://github.com/Medium/phantomjs')
      exit(1)
    } else if (error && error.stack && error.stack.indexOf('SELF_SIGNED_CERT_IN_CHAIN') != -1) {
      console.error('Error making request, SELF_SIGNED_CERT_IN_CHAIN. Please read https://github.com/Medium/phantomjs#i-am-behind-a-corporate-proxy-that-uses-self-signed-ssl-certificates-to-intercept-encrypted-traffic')
      exit(1)
    } else if (error) {
      console.error('Error making request.\n' + error.stack + '\n\n' +
          'Please report this full log at https://github.com/Medium/phantomjs')
      exit(1)
    } else {
      console.error('Something unexpected happened, please report this full ' +
          'log at https://github.com/Medium/phantomjs')
      exit(1)
    }
  })).on('progress', function (state) {
    if (!bar) {
      bar = new progress('  [:bar] :percent :etas', {total: state.total, width: 40})
    }
    bar.curr = state.received
    bar.tick(0)
  })

  return deferred.promise
}


function extractDownload(filePath) {
  var deferred = kew.defer()
  // extract to a unique directory in case multiple processes are
  // installing and extracting at once
  var extractedPath = filePath + '-extract-' + Date.now()
  var options = {cwd: extractedPath}

  fs.mkdirsSync(extractedPath, '0777')
  // Make double sure we have 0777 permissions; some operating systems
  // default umask does not allow write by default.
  fs.chmodSync(extractedPath, '0777')

  if (filePath.substr(-4) === '.zip') {
    console.log('Extracting zip contents')

    try {
      var zip = new AdmZip(filePath)
      zip.extractAllTo(extractedPath, true)
      deferred.resolve(extractedPath)
    } catch (err) {
      console.error('Error extracting zip')
      deferred.reject(err)
    }

  } else {
    console.log('Extracting tar contents (via spawned process)')
    cp.execFile('tar', ['jxf', filePath], options, function (err) {
      if (err) {
        console.error('Error extracting archive')
        deferred.reject(err)
      } else {
        deferred.resolve(extractedPath)
      }
    })
  }
  return deferred.promise
}

function copyIntoPlace(extractedPath, targetPath) {
  mkdirp.sync(targetPath)

  var files = glob.sync(path.join(extractedPath, '**', 'phantomjs?(.exe)'))
  console.log(files)

  if (!files.length) {
    console.log('Could not find extracted file, or too many matches!', files)
    throw new Error('Could not find extracted file, or too many matches!')
  }

  for (var i = 0; i < files.length; i++) {
    var file = files[i]

    if (fs.statSync(file).isFile()) {
      console.log('Copying extracted folder', file, '->', targetPath)
      var dest = path.join(targetPath, path.basename(file))
      if (fs.existsSync(dest))
        fs.removeSync(dest)

      return kew.nfcall(fs.move, file, dest)
    }
  }

}

/**
 * Check to see if the binary on PATH is OK to use. If successful, exit the process.
 */
function tryPhantomjsOnPath() {
  return kew.nfcall(which, 'phantomjs')
  .then(function (result) {
    phantomPath = result

    // Horrible hack to avoid problems during global install. We check to see if
    // the file `which` found is our own bin script.
    if (phantomPath.indexOf(path.join('npm', 'phantomjs')) !== -1) {
      console.log('Looks like an `npm install -g` on windows; unable to check for already installed version.')
      return
    }

    var contents = fs.readFileSync(phantomPath, 'utf8')
    if (/NPM_INSTALL_MARKER/.test(contents)) {
      console.log('Looks like an `npm install -g`; unable to check for already installed version.')
    } else {
      return checkPhantomjsVersion(phantomPath).then(function (matches) {
        if (matches) {
          writeLocationFile(phantomPath)
          console.log('PhantomJS is already installed at', phantomPath + '.')
          exit(0)
        }
      })
    }
  }, function () {
    console.log('PhantomJS not found on PATH')
  })
  .fail(function (err) {
    console.error('Error checking path, continuing', err)
    return false
  })
}



/**
 * @return {?string} Get the download URL for phantomjs. May return null if no download url exists.
 */
function getDownloadUrl() {
  var downloadUrl = process.env.npm_config_phantomjs_downloadurl || process.env.PHANTOMJS_DOWNLOADURL
  if (downloadUrl)
    return downloadUrl

  var cdnUrl = process.env.npm_config_phantomjs_cdnurl ||
      process.env.PHANTOMJS_CDNURL ||
      'https://bitbucket.org/ariya/phantomjs/downloads'

  downloadUrl = cdnUrl + '/phantomjs-' + helper.version + '-'

  if (process.platform === 'linux' && process.arch === 'x64') {
    downloadUrl += 'linux-x86_64.tar.bz2'
  } if (process.platform === 'linux' && process.arch === 'loong64') {
    downloadUrl = 'http://ftp.loongnix.cn/nodejs/npm-registry/LoongArch/abi-v1.0/phantomjs/phantomjs-2.1.1-linux-loongarch64.tar.bz2'
  } else if (process.platform === 'linux' && process.arch == 'ia32') {
    downloadUrl += 'linux-i686.tar.bz2'
  } else if (process.platform === 'darwin' || process.platform === 'openbsd' || process.platform === 'freebsd') {
    downloadUrl += 'macosx.zip'

    // workaround for os-x yosemite, where ariya's build is broken
    // see https://github.com/ariya/phantomjs/issues/12928
    if (parseInt(os.release()) >= 14)
      downloadUrl = 'https://github.com/eugene1g/phantomjs/releases/download/2.0.0-bin/phantomjs-2.0.0-macosx.zip'

  } else if (process.platform === 'win32') {
    downloadUrl += 'windows.zip'
  } else {
    return null
  }

  return downloadUrl
}

/**
 * Download phantomjs, reusing the existing copy on disk if available.
 * Exits immediately if there is no binary to download.
 */
function downloadPhantomjs() {
  var downloadUrl = getDownloadUrl()
  if (!downloadUrl) {
    console.error(
        'Unexpected platform or architecture: ' + process.platform + '/' + process.arch + '\n' +
        'It seems there is no binary available for your platform/architecture\n' +
        'Try to install PhantomJS globally')
    exit(1)
  }

  return npmConfPromise.then(function (conf) {
    tmpPath = findSuitableTempDirectory(conf)

    // Can't use a global version so start a download.
    var fileName = downloadUrl.split('/').pop()
    var downloadedFile = path.join(tmpPath, fileName)

    // Start the install.
    if (!fs.existsSync(downloadedFile)) {
      console.log('Downloading', downloadUrl)
      console.log('Saving to', downloadedFile)
      return requestBinary(getRequestOptions(conf), downloadedFile)
    } else {
      console.log('Download already available at', downloadedFile)
      return downloadedFile
    }
  })
}

/**
 * Check to make sure a given binary is the right version.
 * @return {kew.Promise.<boolean>}
 */
function checkPhantomjsVersion(phantomPath) {
  console.log('Found PhantomJS at', phantomPath, '...verifying')
  return kew.nfcall(cp.execFile, phantomPath, ['--version']).then(function (stdout) {
    var version = stdout.trim()
    if (helper.version == version) {
      return true
    } else {
      console.log('PhantomJS detected, but wrong version', stdout.trim(), '@', phantomPath + '.')
      return false
    }
  }).fail(function (err) {
    console.error('Error verifying phantomjs, continuing', err)
    return false
  })
}
