#TODO: Cleanup app/libWrapper build tree
#TODO: check to see if OpenRPG is already installed on the system
# otherwise we should use the submodule. We will force use the SM
# for now.
#FIXME(incomingstick): currently the binding.gyp will only locate the
#ORPG libs on Linux
git submodule init
git submodule update

../OpenRPG/build.sh

../node_modules/.bin/node-gyp configure build --verbose