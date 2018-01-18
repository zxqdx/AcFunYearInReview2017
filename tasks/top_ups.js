const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');

module.exports = function (filename) {
  return new Promise((resolve, reject) => {
    let parser = parse({delimiter: ',', columns: true}, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
    fs.createReadStream(path.join(__dirname, '../local/', filename)).pipe(parser);
  });
};