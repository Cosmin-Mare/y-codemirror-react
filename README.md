# Installation instructions
You need to have [Node](https://nodejs.org/en) installed, as well as npm which comes bundled with node.
Commands:

`git clone https://github.com/Cosmin-Mare/y-codemirror-react.git`

`cd y-codemirror-react`

`npm i` -> if this gives error, then `npm i --legacy-peer-deps`

`npm start` to run app.

if that gives an error, `ctrl+C` to stop the app and then:

1. for windows: run `$env:NODE_OPTIONS = "--openssl-legacy-provider"` from Powershell.
2. for Linux, MacOS, bash: `export NODE_OPTIONS=--openssl-legacy-provider`

And then try `npm start` again
