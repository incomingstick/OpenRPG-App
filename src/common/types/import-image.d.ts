/**
 * NOTE(incomingstick): This is a small typescript definition script to allow for
 * loading of png's and other image types. We should expand this only as needed.
 **/
declare module '*.png' {
    const value: any;
    export = value;
}
