/*** Build a Transform stream that takes a Readable stream of text, 
 * uppercases every chunk, and pipes it to a Writable stream. 
 * Use stream.pipeline() , not pipe(). Handle errors in the pipeline. */

import { Readable, Transform, Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

//Readable stream
const readable = Readable.from([
  'stream ',
  'uppercase ',
  'transform '
]);

//Transform stream
const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const uppercaseValue = chunk.toString().toUpperCase();
      callback(null, uppercaseValue);
    } catch (error) {
      callback(error);
    }
  }
});

//Writable stream
const writable = new Writable({
  write(chunk, encoding, callback) {
    process.stdout.write(chunk);
    callback();
  }
});

// Connect streams with pipeline and error handling
try {
  await pipeline(
    readable,
    uppercaseTransform,
    writable
  );

  console.log('\nPipeline completed successfully.');
} catch (error) {
  console.error('Pipeline failed:', error.message);
  process.exitCode = 1;
}
