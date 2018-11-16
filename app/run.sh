#TODO: Cleanup app/ build tree
#this includes libWappers/build.sh
npm install
./libWrappers/build.sh
./node_modules/.bin/electron-rebuild
LD_LIBRARY_PATH=../build/lib ./node_modules/.bin/electron .