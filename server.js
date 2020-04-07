// 1 - CommonJS Modules
// const http = require('http');
// const myModule = require("./modules/req");
/* 
  uncomment the section 1 above and remove "type": "module" entry in package.json 
  and comment out sections 2 & 3 below 
*/

// 2 - ESM
import http from 'http';
import myModule from './modules/imp.js';
/* comment out this section (2) when section 1 above is in use */ 

// 3 - CommonJS module imported in ESM
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const myFn = require("./modules/com.cjs");
/* comment out this section (3) when section 1 above is in use */ 

http.createServer((req, res) => {
    console.log('server started....');

    console.log('1 & 2 - Only CommonJS and only ESM :: ', myModule.calc(1, 2));

    // 3 - CommonJS module in ESM. Comment out this section when section 1 is in use
    console.log('3 - CommonJS module in ESM :: ', myFn(1, 2))
}).listen(3000)