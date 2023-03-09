module.exports = function(options, callback) {

  var childProcess = require('child_process')
  var path = require('path')

  var args = [options.temp]
  var spawnOptions = {}

  if (options.multi) {
    args = ['-m', options.temp]
  }

  if (options.env) {
    spawnOptions.env = options.env
  }

  switch(process.arch) {
  case 'arm':
    var archDir = 'arm'
    break;
  case 'loong64':
    var archDir = 'loongarch64'
    break;
  default:
    var archDir = 'scrot'
} 
  var scrot = childProcess.spawn(path.join(__dirname, 'bin', archDir), args, spawnOptions)
  scrot.on('close', function(code) {
    if (code !== 0) {
      return callback('scrot failed', null)
    }

    return callback(null, options) // callback with options, in case options added
  })
}
