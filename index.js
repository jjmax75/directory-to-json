const directoryTreeToObj = require('./utils/read-files');

module.exports = async (req, res) => {
  const directortoryStructure = await directoryTreeToObj(
    '/Users/john/Downloads/pythonforkids',
  );

  res.end(`Here it is yoh: ${directortoryStructure}`);
};
