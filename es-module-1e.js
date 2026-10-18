/*** Write a CommonJS module that exports a greet(name) function. Import it in another file using require.
 *  Then convert both files to ES Modules: change to export / import , 
 * add "type": "module" to package.json , and fix __dirname using import.meta.url. */

//Import the greet function from the greet.js ES module 
import greet from './greet.js';

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// greet function
console.log(greet('Admin'));

// Recreate __filename and __dirname for ES Modules because in CommonJS they are available by default, 
// but in ES Modules they are not.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('File path:', __filename);
console.log('Directory path:', __dirname);

//In latest version (after 20.10+) there is no need to recreate __filename and __dirname as they are available in ES Modules.
console.log('Directory path:', import.meta.dirname);


