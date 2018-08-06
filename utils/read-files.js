const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);

const directoryTreeToObj = async path => {
  const results = await readdir(path);

  const sorted = results.reduce(async (acc, item) => {
    const collection = await acc;
    const filePath = `${path}/${item}`;
    if (fs.lstatSync(filePath).isFile()) {
      collection.files.push(filePath);
    } else {
      collection.dirs[item] = await directoryTreeToObj(filePath);
    }
    return acc;
  }, Promise.resolve({ files: [], dirs: {} }));

  return sorted;
};

// (async () => {
//   const obj = await directoryTreeToObj('/Users/john/Downloads/pythonforkids');
//   console.log(obj);
// })();

module.exports = directoryTreeToObj;
