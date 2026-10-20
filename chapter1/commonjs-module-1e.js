/*** Write a CommonJS module that exports a greet(name) function. Import it in another file using require.
 *  Then convert both files to ES Modules: change to export / import , 
 * add "type": "module" to package.json , and fix __ dirname using import.meta.url. */

// Import the greet function from the greet.js module (CommonJS module that need require)
const greet = require('./greet');

console.log(greet('Admin')); // Output: Welcome, Admin!
