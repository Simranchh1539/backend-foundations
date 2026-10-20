/*** Using fs.promises , write a script that reads a directory, 
 * filters only .txt files, reads each file's contents concurrently with Promise.all, 
 * and writes a single merged output file. */

import fs from 'node:fs';
import path from 'node:path';

async function mergeTxtFiles() {
  const [, , directoryPath, outputFile] = process.argv;

  if (!directoryPath || !outputFile) {
    console.error(
      'Please use this format: node chapter2/merge-txt-files-2b.js <directory> <output.txt>'
    );
    process.exitCode = 1;
    return;
  }

  try {
    const files = await fs.promises.readdir(directoryPath);

    //for fetching only .txt files
    const txtFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === '.txt'
    );

    if (txtFiles.length === 0) {
      console.log('No .txt files found.');
      return;
    }

    //for reading .txt files 
    const contents = await Promise.all(
      txtFiles.map((file) =>
        fs.promises.readFile(path.join(directoryPath, file), 'utf8')
      )
    );

    // for merging contents of files
    const mergedContent = contents.join('\n\n');

    //for creating output file with merged content
    await fs.promises.writeFile(outputFile, mergedContent, 'utf8');

    console.log(`Successfully merged ${txtFiles.length} text files.`);
    console.log(`Output: ${outputFile} file created.`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

mergeTxtFiles();
