/*
roll - rollWrapper.h
Created on: June 26, 2017

OpenRPG Software License - Version 1.0 - February 10th, 2017 <http://www.openrpg.io/about/license/>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
*/
#ifndef SRC_DIE_WRAPPER_H_
#define SRC_DIE_WRAPPER_H_

#include <node.h>
#include <node_object_wrap.h>

#include "roll.h"

namespace electronGUI {

class DieWrapper : public Die, public node::ObjectWrap {
    private:
        explicit DieWrapper(int max);
        ~DieWrapper();

        static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
        static v8::Persistent<v8::Function> constructor;

        static void roll(const v8::FunctionCallbackInfo<v8::Value>& args);

    public:
        static void Init(v8::Local<v8::Object> exports);
};

}

#endif /* SRC_DIE_WRAPPER_H_*/
