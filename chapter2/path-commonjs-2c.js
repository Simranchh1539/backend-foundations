//To run this file i removed "type": "module" from package.json 
// rather than using .cjs extension.

const path = require('node:path');

// Build a path to config.json 
const configPath = path.join(__dirname, 'config', 'config.json');

// Resolve to absolute path
const absolutePath = path.resolve(configPath);

// Path details
const directory = path.dirname(absolutePath);
const extension = path.extname(absolutePath);
const filename = path.basename(absolutePath, extension);

console.log('Script directory:', __dirname);
console.log('Config path:', configPath);
console.log('Absolute path:', absolutePath);
console.log('Directory is:', directory);
console.log('Filename is:', filename);
console.log('Extension is:', extension);
