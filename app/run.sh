#TODO: Cleanup app/ build tree
#this includes libWrappers/build.sh
npm install

pushd libWrappers
./build.sh
popd

./node_modules/.bin/electron-rebuild

LD_LIBRARY_PATH=../build/lib ./node_modules/.bin/electron .