/*** Convert a string to a Buffer in utf8 , then re-encode it as base64 and hex. 
 * Convert each back to a string and verify they match the original. */


const original = 'Hello Admin, Welcome ';

const buffer = Buffer.from(original, 'utf8');

console.log('Original string:', original);
console.log('Buffer:', buffer);

//Encode in base64
const base64Value = buffer.toString('base64');
console.log('Value in Base64 is:', base64Value);

// Encode in hexadecimal
const hexValue = buffer.toString('hex');
console.log('Value in Hex is:', hexValue);

// Decode Base64 back to a string
const fromBase64 = Buffer.from(base64Value, 'base64').toString();
console.log('From Base64 to String:', fromBase64);

// Decode hexadecimal back to a string
const fromHex = Buffer.from(hexValue, 'hex').toString();
console.log('From Hex to String:', fromHex);

//verification
console.log('Base64 matches:', fromBase64 === original);
console.log('Hex matches:', fromHex === original);
