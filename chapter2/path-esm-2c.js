/*** Use path.join , path.resolve , path.dirname , and path.extname to: 
 * build a path to a config file relative to the current script, extract its directory, 
 * name, and extension, then log all values. Do this in both CommonJS ( __dirname ) and 
 * ESM ( import.meta.url ). */


import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the current script path
const currentFile = fileURLToPath(import.meta.url);

const currentDir = path.dirname(currentFile);

// Build a path to config.json relative to this script directory ("currentDir")
//Url is by joining directory + new sub directory + exact file name)
const configPath = path.join(currentDir, 'config', 'config.json');

// Resolve to absolute path
const absolutePath = path.resolve(configPath);

// Path details
const directory = path.dirname(absolutePath);
const extension = path.extname(absolutePath);
const filename = path.basename(absolutePath, extension);

console.log('Script directory:', currentDir);
console.log('Config path:', configPath);
console.log('Absolute path:', absolutePath);
console.log('Directory is:', directory);
console.log('Filename is:', filename);
console.log('Extension is:', extension);
