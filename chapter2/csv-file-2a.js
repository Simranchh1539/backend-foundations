/*** Build a CLI script that: accepts a CSV file path and a column=value 
 * fiter it as command-line arguments, streams the CSV using fs.createReadStream , 
 * parses and filters rows using a Transform stream, and writes matching rows to an
 * output file via fs.createWriteStream. 
 * No readFileSync or readFile anywhere. */


import fs from 'node:fs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

async function filterCSV() {
  const [, , inputPath, filterArg, outputPath] = process.argv;
  if (!inputPath || !filterArg || !filterArg.includes('=')) {
    console.error(
      'Please provide a valid input CSV file path and a filter in the format column=value.'
    );
    process.exitCode = 1;
    return;
  }

  const separatorIndex = filterArg.indexOf('=');
  const column = filterArg.slice(0, separatorIndex);
  const expectedValue = filterArg.slice(separatorIndex + 1);

  let headers = null;
  let columnIndex = -1;
  let buffer = '';
  let matchedRows = 0;

  function parseRow(line) {
    const fields = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(field);
        field = '';
      } else {
        field += char;
      }
    }

    fields.push(field);
    return fields;
  }

  const filterTransform = new Transform({
    transform(chunk, encoding, callback) {
      buffer += chunk.toString();

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;

        const record = parseRow(line);
        console.log('Parsed record:', record);
        if (!headers) {
          headers = record;
          columnIndex = headers.indexOf(column);

          if (columnIndex === -1) {
            callback(new Error(`Column "${column}" not found`));
            return;
          }

          this.push(`${line}\n`);
          continue;
        }

        if (record[columnIndex] === expectedValue) {
          matchedRows++;
          this.push(`${line}\n`);
        }
      }

      callback();
    },

    flush(callback) {
      if (buffer.length > 0) {
        const record = parseRow(buffer);

        if (!headers) {
          headers = record;
          columnIndex = headers.indexOf(column);

          if (columnIndex === -1) {
            callback(new Error(`Column "${column}" not found`));
            return;
          }

          this.push(`${buffer}\n`);
        } else if (record[columnIndex] === expectedValue) {
          matchedRows++;
          this.push(`${buffer}\n`);
        }
      }

      callback();
    },
  });

  try {
    await pipeline(
      fs.createReadStream(inputPath),
      filterTransform,
      fs.createWriteStream(outputPath)
    );

    console.log(`Output saved to ${outputPath}`);
    console.log(`Matching rows: ${matchedRows}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

filterCSV();
