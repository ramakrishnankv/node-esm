# ES Modules in NodeJS
Can I use import to require a module in NodeJS?
What need to know working between CommonJS and ES module in NodeJS?

Yes, from version 13 NodeJS supports ESM (ES Module) and can use import to include modules. Experimentally it supports version 8 to 12 too. This example explains how to use ESM.

Let us walk through some of the basic stuffs that will help to understand the usage.

## CommonJS
NodeJS uses CommonJS pattern to require modules into another module. A module is nothing but an independent JavaScript functionality that has it's own context. 

Sample code:
```
var http = require("http");

http.createServer((req, res) => {
    .....
})
```

ES6 brings in a lot of new features among which import statement is one of the key features. Import does the same job as require but with a slightly different syntax. The differences between require and import are explained [here](https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x#answers-header) 

## Global Scope
In browser window is the global space, whereas, in NodeJS 'global' is the global space.

## Module Export
exports or module.exports expose the module to the global space in CommonJS.

```
exports.name = Object
module.exports = Object
```

Example:
```
// ./modules/req.js
const myModule = {
  calc: function(a, b) { 
    return a + b
  }
}

module.exports = myModule;

// ./server.js
const myModule = require("./modules/req");

myModule.calc(1, 2)
// returns 3
```

## ES Module
To use ES Module add "type": "module" in package.json.

[ES Module](https://nodejs.org/api/esm.html#esm_introduction)

This feature is available only NodeJS Version 13 and above. For version between 8 to 12 the file extension should be .mjs and need to execute the command "node --experimental-modules my-app.mjs". When CommonJS adds a module to global scope via module.exports, ESM export default or name export of a module. 

## Example - CommonJS
```
// package.json

"main":  "server.js"

// ./server.js

const myModule = require("./modules/req");
// Note that the file extension is not mandatory here

myModule.calc(1, 2); // returns 3

// ./modules/req.js
const myModule = {
  calc: function(a, b) { 
    return a + b
  }
}

module.exports = myModule;
```

Explanation:
In the above snippet, key "main" in package.json refers the entry point for the Node app. 

Now let us see how ES module works for a similar requirement;

## Example - ESM
```
// package.json

"main":  "server.js",
"type": "module"

// ./server.js

import myModule from './modules/imp.js';

myModule.calc(1, 2); // returns 3

// ./modules/imp.js

const myModule = { 
  calc: (a, b) => a + b
}

export default myModule;
```

Explanation:
Compared to the example of CommonJS, the addition here in the package.json is an entry to specify the type as module. It is mandatory to mention the file extension while importing a module - "./myModule.js".

Importantly, CommonJS variables such as require, exports, module.exports, __filename, __dirname are not available in ESM. Replacement for require is import. Exports or module.exports will be replaced by export default or export { <ModuleName> } (named export). 

```
__filename & __dirname will be; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

What if it is required to import a CommonJS module into ESM?

createRequire() method helps to achieve this. 

```
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const myFn = require("./containers/com.cjs");
```

The above three lines will do the job. Note the extension of the required file must be .cjs.

### Working Example

This repository is a tiny example of the ways to use ESM over CommonJS. 

Have a look at package.json that has an entry "type": "module" to enable ESM. The ./server.js is the entry point for this application.

Clone the code and run ``` $ npm run start ``` to start the application. Hit [http://localhost:3000/](http://localhost:3000/) and watch the terminal/command prompt console to see the messages that displays according to the module used. One might need to restart the application if any code changes are done.

There are 3 sections in server.js;
1. CommonJS module: This set of code demonstrates how CommonJS modules are required. The file required using this is "./modules/req.js". See the module.exports entry. Initially this section is commented out, once enabled it can be tested how the require works. Ensure to remove "type": "module" from package.json before starting the app.

2. ESM module: This section shows how to import ES Modules. Initially this section is active and can be tested starting the app. When CommonJS module (section 1) to be tested, this section should be commented out. Pleae read through instructions in server.js file.

3. How CommonJS module imported in ESM. This can also be tested directly starting the app. When CommonJS module (section 1) to be tested, this section should be commented out. Pleae read through instructions in server.js file. 

Note: there are no external modules required to run this app and no need to run npm intall.