#TODO: Cleanup app/ build tree
#this includes libWrappers/build.sh
cwd=$(pwd)

if hash npm 2>/dev/null; then
    npm install

    pushd $cwd/libWrappers

    ./build.sh

    popd
else
    echo "NPM NOT INSTALLED, ABORTING..."
    exit 1
fi

if [[ $1 == "run" || $2 == "run" ]]; then
    ./node_modules/.bin/electron-rebuild

    LD_LIBRARY_PATH=../build/lib ./node_modules/.bin/electron .
fi