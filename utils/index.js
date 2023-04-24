const path = require('path');

const cwd = process.cwd();

/**
 * get project directory
 * @param {string} dir
 */
function getProjectDir(dir) {
  return path.join(cwd, dir);
}

function getCliDir(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = {
  getCliDir,
  getProjectDir,
};
