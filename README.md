# NOTE
This repository is for the front end application for OpenRPG. If you are looking for the back end libraries, please visit our sister repository, [here](https://github.com/incomingstick/OpenRPG).

# OpenRPG
[![Build Status](https://travis-ci.org/incomingstick/OpenRPG-App.svg?branch=master)](https://travis-ci.org/incomingstick/OpenRPG-App)
![Version Number](https://img.shields.io/badge/version-v0.5.0--dev-blue.svg)
[![Discord Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/xEwaYE5)

OpenRPG is still in its infancy and I want it to do a lot by v1.0.0!  
What OpenRPG aims to accomplish two fold.  

First, it will be a tool for someone to use to quickly create content
for a tabletop RPG world. v1.0.0 will focus specifically on the
5e rules, however I hope to have that expand out to include
Pathfinder and as far back as AD&D.

Secondly, OpenRPG should be structured in such a way that game developers
that want to emulate the d20 system in a video game could easily implement
our libraries in their games to help speed production of back end tools.

Some of the features this tool will include by v1.0.0 are:
- A GUI front-end for the CLI tools
- A die simulation tool
- A name generator tool
- A character generator tool (with the option to autofill a character sheet)
- A town generator tool
- An encounter/combat generator tool
- A world generator tool
- A world/town map generator

... And more (hopefully)!

v0.1.0 is a basis for the CLI/developer version, but v1.0.0 will contain a
portable GUI that works on Windows, Linux, and macOS.

## Building
This is a node project, and as such you will need `npm` or `yarn` installed. Currently we require your choice of C/C++ compiler for the backend library [binaries](https://github.com/incomingstick/OpenRPG).

Run `npm install` to download all dependancies.
Run `npm start` to run the OpenRPG app.


# License
OpenRPG Software License - Version 1.0 - February 10th, 2017 <https://openrpg.io/about/license/>
