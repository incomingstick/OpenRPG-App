# Clear old cache
rm -rf ~/.electron-gyp/
# Electron's version.
npm_config_target=1.6.11
# The architecture of Electron, can be ia32 or x64.
npm_config_arch=x64
npm_config_target_arch=x64
# Download headers for Electron.
npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp node-gyp rebuild --target=1.6.11 --arch=x64 --dist-url=https://atom.io/download/electron --verbose