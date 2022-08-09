const path = require('path');
const fs = require('fs');

const cwd = process.cwd();

/**
 * get project directory
 * @param {string} dir
 */
function getProjectDir(dir) {
  return path.join(cwd, dir);
}

module.exports = {
  getProjectDir
};
