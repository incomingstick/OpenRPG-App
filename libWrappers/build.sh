#TODO: Cleanup app/libWrapper build tree
#TODO check to see if OpenRPG is already installed on the system
# otherwise we should use the submodule. We will force use the SM
# for now.
git submodule init
git submodule update

../OpenRPG/build.sh

node-gyp configure build --verbose