v3.6.2 2017-06-01
=================

* [[`72afdd62cd`](https://github.com/nodejs/node-gyp/commit/72afdd62cd)] - **build**: rename copyNodeLib() to doBuild() (Liu Chao) [#1206](https://github.com/nodejs/node-gyp/pull/1206)
* [[`bad903ac70`](https://github.com/nodejs/node-gyp/commit/bad903ac70)] - **win**: more robust parsing of SDK version (Refael Ackermann) [#1198](https://github.com/nodejs/node-gyp/pull/1198)
* [[`241752f381`](https://github.com/nodejs/node-gyp/commit/241752f381)] - Log dist-url. (Ben Noordhuis) [#1170](https://github.com/nodejs/node-gyp/pull/1170)
* [[`386746c7d1`](https://github.com/nodejs/node-gyp/commit/386746c7d1)] - **configure**: use full path in node_lib_file GYP var (Pavel Medvedev) [#964](https://github.com/nodejs/node-gyp/pull/964)
* [[`0913b2dd99`](https://github.com/nodejs/node-gyp/commit/0913b2dd99)] - **build, win**: use target_arch to link with node.lib (Pavel Medvedev) [#964](https://github.com/nodejs/node-gyp/pull/964)
* [[`c307b302f7`](https://github.com/nodejs/node-gyp/commit/c307b302f7)] - **doc**: blorb about setting `npm_config_OPTION_NAME` (Refael Ackermann) [#1185](https://github.com/nodejs/node-gyp/pull/1185)

v3.6.1 2017-04-30
=================

* [[`49801716c2`](https://github.com/nodejs/node-gyp/commit/49801716c2)] - **test**: fix test-find-python on v0.10.x buildbot. (Ben Noordhuis) [#1172](https://github.com/nodejs/node-gyp/pull/1172)
* [[`a83a3801fc`](https://github.com/nodejs/node-gyp/commit/a83a3801fc)] - **test**: fix test/test-configure-python on AIX (Richard Lau) [#1131](https://github.com/nodejs/node-gyp/pull/1131)
* [[`8a767145c9`](https://github.com/nodejs/node-gyp/commit/8a767145c9)] - **gyp**: Revert quote_cmd workaround (Kunal Pathak) [#1153](https://github.com/nodejs/node-gyp/pull/1153)
* [[`c09cf7671e`](https://github.com/nodejs/node-gyp/commit/c09cf7671e)] - **doc**: add a note for using `configure` on Windows (Vse Mozhet Byt) [#1152](https://github.com/nodejs/node-gyp/pull/1152)
* [[`da9cb5f411`](https://github.com/nodejs/node-gyp/commit/da9cb5f411)] - Delete superfluous .patch files. (Ben Noordhuis) [#1122](https://github.com/nodejs/node-gyp/pull/1122)

v3.6.0 2017-03-16
=================

* [[`ae141e1906`](https://github.com/nodejs/node-gyp/commit/ae141e1906)] - **win**: find and setup for VS2017 (Refael Ackermann) [#1130](https://github.com/nodejs/node-gyp/pull/1130)
* [[`ec5fc36a80`](https://github.com/nodejs/node-gyp/commit/ec5fc36a80)] - Add support to build node.js with chakracore for ARM. (Kunal Pathak) [#873](https://github.com/nodejs/node-gyp/pull/873)
* [[`a04ea3051a`](https://github.com/nodejs/node-gyp/commit/a04ea3051a)] - Add support to build node.js with chakracore. (Kunal Pathak) [#873](https://github.com/nodejs/node-gyp/pull/873)
* [[`93d7fa83c8`](https://github.com/nodejs/node-gyp/commit/93d7fa83c8)] - Upgrade semver dependency. (Ben Noordhuis) [#1107](https://github.com/nodejs/node-gyp/pull/1107)
* [[`ff9a6fadfd`](https://github.com/nodejs/node-gyp/commit/ff9a6fadfd)] - Update link of gyp as Google code is shutting down (Peter Dave Hello) [#1061](https://github.com/nodejs/node-gyp/pull/1061)


v3.5.0 2017-01-10
=================

* [[`762d19a39e`](https://github.com/nodejs/node-gyp/commit/762d19a39e)] - \[doc\] merge History.md and CHANGELOG.md (Rod Vagg) 
* [[`80fc5c3d31`](https://github.com/nodejs/node-gyp/commit/80fc5c3d31)] - Fix deprecated dependency warning (Simone Primarosa) [#1069](https://github.com/nodejs/node-gyp/pull/1069)
* [[`05c44944fd`](https://github.com/nodejs/node-gyp/commit/05c44944fd)] - Open the build file with universal-newlines mode (Guy Margalit) [#1053](https://github.com/nodejs/node-gyp/pull/1053)
* [[`37ae7be114`](https://github.com/nodejs/node-gyp/commit/37ae7be114)] - Try python launcher when stock python is python 3. (Ben Noordhuis) [#992](https://github.com/nodejs/node-gyp/pull/992)
* [[`e3778d9907`](https://github.com/nodejs/node-gyp/commit/e3778d9907)] - Add lots of findPython() tests. (Ben Noordhuis) [#992](https://github.com/nodejs/node-gyp/pull/992)
* [[`afc766adf6`](https://github.com/nodejs/node-gyp/commit/afc766adf6)] - Unset executable bit for .bat files (Pavel Medvedev) [#969](https://github.com/nodejs/node-gyp/pull/969)
* [[`ddac348991`](https://github.com/nodejs/node-gyp/commit/ddac348991)] - Use push on PYTHONPATH and add tests (Michael Hart) [#990](https://github.com/nodejs/node-gyp/pull/990)
* [[`b182a19042`](https://github.com/nodejs/node-gyp/commit/b182a19042)] - ***Revert*** "add "path-array" dep" (Michael Hart) [#990](https://github.com/nodejs/node-gyp/pull/990)
* [[`7c08b85c5a`](https://github.com/nodejs/node-gyp/commit/7c08b85c5a)] - ***Revert*** "**configure**: use "path-array" for PYTHONPATH" (Michael Hart) [#990](https://github.com/nodejs/node-gyp/pull/990)
* [[`9c8d275526`](https://github.com/nodejs/node-gyp/commit/9c8d275526)] - Add --devdir flag. (Ben Noordhuis) [#916](https://github.com/nodejs/node-gyp/pull/916)
* [[`f6eab1f9e4`](https://github.com/nodejs/node-gyp/commit/f6eab1f9e4)] - **doc**: add windows-build-tools to readme (Felix Rieseberg) [#970](https://github.com/nodejs/node-gyp/pull/970)

v3.4.0 2016-06-28
=================

* [[`ce5fd04e94`](https://github.com/nodejs/node-gyp/commit/ce5fd04e94)] - **deps**: update minimatch version (delphiactual) [#961](https://github.com/nodejs/node-gyp/pull/961)
* [[`77383ddd85`](https://github.com/nodejs/node-gyp/commit/77383ddd85)] - Replace fs.accessSync call to fs.statSync (Richard Lau) [#955](https://github.com/nodejs/node-gyp/pull/955)
* [[`0dba4bda57`](https://github.com/nodejs/node-gyp/commit/0dba4bda57)] - **test**: add simple addon test (Richard Lau) [#955](https://github.com/nodejs/node-gyp/pull/955)
* [[`c4344b3889`](https://github.com/nodejs/node-gyp/commit/c4344b3889)] - **doc**: add --target option to README (Gibson Fahnestock) [#958](https://github.com/nodejs/node-gyp/pull/958)
* [[`cc778e9215`](https://github.com/nodejs/node-gyp/commit/cc778e9215)] - Override BUILDING_UV_SHARED, BUILDING_V8_SHARED. (Ben Noordhuis) [#915](https://github.com/nodejs/node-gyp/pull/915)
* [[`af35b2ad32`](https://github.com/nodejs/node-gyp/commit/af35b2ad32)] - Move VC++ Build Tools to Build Tools landing page. (Andrew Pardoe) [#953](https://github.com/nodejs/node-gyp/pull/953)
* [[`f31482e226`](https://github.com/nodejs/node-gyp/commit/f31482e226)] - **win**: work around __pfnDliNotifyHook2 type change (Alexis Campailla) [#952](https://github.com/nodejs/node-gyp/pull/952)
* [[`3df8222fa5`](https://github.com/nodejs/node-gyp/commit/3df8222fa5)] - Allow for npmlog@3.x (Rebecca Turner) [#950](https://github.com/nodejs/node-gyp/pull/950)
* [[`a4fa07b390`](https://github.com/nodejs/node-gyp/commit/a4fa07b390)] - More verbose error on locating msbuild.exe failure. (Mateusz Jaworski) [#930](https://github.com/nodejs/node-gyp/pull/930)
* [[`4ee31329e0`](https://github.com/nodejs/node-gyp/commit/4ee31329e0)] - **doc**: add command options to README.md (Gibson Fahnestock) [#937](https://github.com/nodejs/node-gyp/pull/937)
* [[`c8c7ca86b9`](https://github.com/nodejs/node-gyp/commit/c8c7ca86b9)] - Add --silent option for zero output. (Gibson Fahnestock) [#937](https://github.com/nodejs/node-gyp/pull/937)
* [[`ac29d23a7c`](https://github.com/nodejs/node-gyp/commit/ac29d23a7c)] - Upgrade to glob@7.0.3. (Ben Noordhuis) [#943](https://github.com/nodejs/node-gyp/pull/943)
* [[`15fd56be3d`](https://github.com/nodejs/node-gyp/commit/15fd56be3d)] - Enable V8 deprecation warnings for native modules (Matt Loring) [#920](https://github.com/nodejs/node-gyp/pull/920)
* [[`7f1c1b960c`](https://github.com/nodejs/node-gyp/commit/7f1c1b960c)] - **gyp**: improvements for android generator (Robert Chiras) [#935](https://github.com/nodejs/node-gyp/pull/935)
* [[`088082766c`](https://github.com/nodejs/node-gyp/commit/088082766c)] - Update Windows install instructions (Sara Itani) [#867](https://github.com/nodejs/node-gyp/pull/867)
* [[`625c1515f9`](https://github.com/nodejs/node-gyp/commit/625c1515f9)] - **gyp**: inherit CC/CXX for CC/CXX.host (Johan Bergstr??m) [#908](https://github.com/nodejs/node-gyp/pull/908)
* [[`3bcb1720e4`](https://github.com/nodejs/node-gyp/commit/3bcb1720e4)] - Add support for the Python launcher on Windows (Patrick Westerhoff) [#894](https://github.com/nodejs/node-gyp/pull/894

v3.3.1 2016-03-04
=================

* [[`a981ef847a`](https://github.com/nodejs/node-gyp/commit/a981ef847a)] - **gyp**: fix android generator (Robert Chiras) [#889](https://github.com/nodejs/node-gyp/pull/889)

v3.3.0 2016-02-16
=================

* [[`818d854a4d`](https://github.com/nodejs/node-gyp/commit/818d854a4d)] - Introduce NODEJS_ORG_MIRROR and IOJS_ORG_MIRROR (Rod Vagg) [#878](https://github.com/nodejs/node-gyp/pull/878)
* [[`d1e4cc4b62`](https://github.com/nodejs/node-gyp/commit/d1e4cc4b62)] - **(SEMVER-MINOR)** Download headers tarball for ~0.12.10 || ~0.10.42 (Rod Vagg) [#877](https://github.com/nodejs/node-gyp/pull/877)
* [[`6e28ad1bea`](https://github.com/nodejs/node-gyp/commit/6e28ad1bea)] - Allow for npmlog@2.x (Rebecca Turner) [#861](https://github.com/nodejs/node-gyp/pull/861)
* [[`07371e5812`](https://github.com/nodejs/node-gyp/commit/07371e5812)] - Use -fPIC for NetBSD. (Marcin Cie??lak) [#856](https://github.com/nodejs/node-gyp/pull/856)
* [[`8c4b0ffa50`](https://github.com/nodejs/node-gyp/commit/8c4b0ffa50)] - **(SEMVER-MINOR)** Add --cafile command line option. (Ben Noordhuis) [#837](https://github.com/nodejs/node-gyp/pull/837)
* [[`b3ad43498e`](https://github.com/nodejs/node-gyp/commit/b3ad43498e)] - **(SEMVER-MINOR)** Make download() function testable. (Ben Noordhuis) [#837](https://github.com/nodejs/node-gyp/pull/837)

v3.2.1 2015-12-03
=================

* [[`ab89b477c4`](https://github.com/nodejs/node-gyp/commit/ab89b477c4)] - Upgrade gyp to b3cef02. (Ben Noordhuis) [#831](https://github.com/nodejs/node-gyp/pull/831)
* [[`90078ecb17`](https://github.com/nodejs/node-gyp/commit/90078ecb17)] - Define WIN32_LEAN_AND_MEAN conditionally. (Ben Noordhuis) [#824](https://github.com/nodejs/node-gyp/pull/824)

v3.2.0 2015-11-25
=================

* [[`268f1ca4c7`](https://github.com/nodejs/node-gyp/commit/268f1ca4c7)] - Use result of `which` when searching for python. (Refael Ackermann) [#668](https://github.com/nodejs/node-gyp/pull/668)
* [[`817ed9bd78`](https://github.com/nodejs/node-gyp/commit/817ed9bd78)] - Add test for python executable search logic. (Ben Noordhuis) [#756](https://github.com/nodejs/node-gyp/pull/756)
* [[`0e2dfda1f3`](https://github.com/nodejs/node-gyp/commit/0e2dfda1f3)] - Fix test/test-options when run through `npm test`. (Ben Noordhuis) [#755](https://github.com/nodejs/node-gyp/pull/755)
* [[`9bfa0876b4`](https://github.com/nodejs/node-gyp/commit/9bfa0876b4)] - Add support for AIX (Michael Dawson) [#753](https://github.com/nodejs/node-gyp/pull/753)
* [[`a8d441a0a2`](https://github.com/nodejs/node-gyp/commit/a8d441a0a2)] - Update README for Windows 10 support. (Jason Williams) [#766](https://github.com/nodejs/node-gyp/pull/766)
* [[`d1d6015276`](https://github.com/nodejs/node-gyp/commit/d1d6015276)] - Update broken links and switch to HTTPS. (andrew morton) 

v3.1.0 2015-11-14
=================

* [[`9049241f91`](https://github.com/nodejs/node-gyp/commit/9049241f91)] - **gyp**: don't use links at all, just copy the files instead (Nathan Zadoks)
* [[`8ef90348d1`](https://github.com/nodejs/node-gyp/commit/8ef90348d1)] - **gyp**: apply https://codereview.chromium.org/11361103/ (Nathan Rajlich)
* [[`a2ed0df84e`](https://github.com/nodejs/node-gyp/commit/a2ed0df84e)] - **gyp**: always install into $PRODUCT_DIR (Nathan Rajlich)
* [[`cc8b2fa83e`](https://github.com/nodejs/node-gyp/commit/cc8b2fa83e)] - Update gyp to b3cef02. (Imran Iqbal) [#781](https://github.com/nodejs/node-gyp/pull/781)
* [[`f5d86eb84e`](https://github.com/nodejs/node-gyp/commit/f5d86eb84e)] - Update to tar@2.0.0. (Edgar Muentes) [#797](https://github.com/nodejs/node-gyp/pull/797)
* [[`2ac7de02c4`](https://github.com/nodejs/node-gyp/commit/2ac7de02c4)] - Fix infinite loop with zero-length options. (Ben Noordhuis) [#745](https://github.com/nodejs/node-gyp/pull/745)
* [[`101bed639b`](https://github.com/nodejs/node-gyp/commit/101bed639b)] - This platform value came from debian package, and now the value (J??r??my Lal) [#738](https://github.com/nodejs/node-gyp/pull/738)

v3.0.3 2015-09-14
=================

* [[`ad827cda30`](https://github.com/nodejs/node-gyp/commit/ad827cda30)] - tarballUrl global and && when checking for iojs (Lars-Magnus Skog) [#729](https://github.com/nodejs/node-gyp/pull/729)

v3.0.2 2015-09-12
=================

* [[`6e8c3bf3c6`](https://github.com/nodejs/node-gyp/commit/6e8c3bf3c6)] - add back support for passing additional cmdline args (Rod Vagg) [#723](https://github.com/nodejs/node-gyp/pull/723)
* [[`ff82f2f3b9`](https://github.com/nodejs/node-gyp/commit/ff82f2f3b9)] - fixed broken link in docs to Visual Studio 2013 download (simon-p-r) [#722](https://github.com/nodejs/node-gyp/pull/722)

v3.0.1 2015-09-08
=================

* [[`846337e36b`](https://github.com/nodejs/node-gyp/commit/846337e36b)] - normalise versions for target == this comparison (Rod Vagg) [#716](https://github.com/nodejs/node-gyp/pull/716)

v3.0.0 2015-09-08
=================

* [[`9720d0373c`](https://github.com/nodejs/node-gyp/commit/9720d0373c)] - remove node_modules from tree (Rod Vagg) [#711](https://github.com/nodejs/node-gyp/pull/711)
* [[`6dcf220db7`](https://github.com/nodejs/node-gyp/commit/6dcf220db7)] - test version major directly, don't use semver.satisfies() (Rod Vagg) [#711](https://github.com/nodejs/node-gyp/pull/711)
* [[`938dd18d1c`](https://github.com/nodejs/node-gyp/commit/938dd18d1c)] - refactor for clarity, fix dist-url, add env var dist-url functionality (Rod Vagg) [#711](https://github.com/nodejs/node-gyp/pull/711)
* [[`9e9df66a06`](https://github.com/nodejs/node-gyp/commit/9e9df66a06)] - use process.release, make aware of io.js & node v4 differences (Rod Vagg) [#711](https://github.com/nodejs/node-gyp/pull/711)
* [[`1ea7ed01f4`](https://github.com/nodejs/node-gyp/commit/1ea7ed01f4)] - **deps**: update graceful-fs dependency to the latest (Sakthipriyan Vairamani) [#714](https://github.com/nodejs/node-gyp/pull/714)
* [[`0fbc387b35`](https://github.com/nodejs/node-gyp/commit/0fbc387b35)] - Update repository URLs. (Ben Noordhuis) [#715](https://github.com/nodejs/node-gyp/pull/715)
* [[`bbedb8868b`](https://github.com/nodejs/node-gyp/commit/bbedb8868b)] - **(SEMVER-MAJOR)** **win**: enable delay-load hook by default (Jeremiah Senkpiel) [#708](https://github.com/nodejs/node-gyp/pull/708)
* [[`85ed107565`](https://github.com/nodejs/node-gyp/commit/85ed107565)] - Merge pull request #664 from othiym23/othiym23/allow-semver-5 (Nathan Rajlich)
* [[`0c720d234c`](https://github.com/nodejs/node-gyp/commit/0c720d234c)] - allow semver@5 (Forrest L Norvell)

2.0.2 / 2015-07-14
==================

  * Use HTTPS for dist url (#656, @SonicHedgehog)
  * Merge pull request #648 from nevosegal/master
  * Merge pull request #650 from magic890/patch-1
  * Updated Installation section on README
  * Updated link to gyp user documentation
  * Fix download error message spelling (#643, @tomxtobin)
  * Merge pull request #637 from lygstate/master
  * Set NODE_GYP_DIR for addon.gypi to setting absolute path for
    src/win_delay_load_hook.c, and fixes of the long relative path issue on Win32.
    Fixes #636 (#637, @lygstate).

2.0.1 / 2015-05-28
==================

  * configure: try/catch the semver range.test() call
  * README: update for visual studio 2013 (#510, @samccone)

2.0.0 / 2015-05-24
==================

  * configure: check for python2 executable by default, fallback to python
  * configure: don't clobber existing $PYTHONPATH
  * configure: use "path-array" for PYTHONPATH
  * gyp: fix for non-acsii userprofile name on Windows
  * gyp: always install into $PRODUCT_DIR
  * gyp: apply https://codereview.chromium.org/11361103/
  * gyp: don't use links at all, just copy the files instead
  * gyp: update gyp to e1c8fcf7
  * Updated README.md with updated Windows build info
  * Show URL when a download fails
  * package: add a "license" field
  * move HMODULE m declaration to top
  * Only add "-undefined dynamic_lookup" to loadable_module targets
  * win: optionally allow node.exe/iojs.exe to be renamed
  * Avoid downloading shasums if using tarPath
  * Add target name preprocessor define: `NODE_GYP_MODULE_NAME`
  * Show better error message in case of bad network settings
