const fs = require('fs-extra');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { spawn } = require('child_process');

const { getProjectDir } = require('../utils');

/**
 *
 * @param {string} text
 */
function showProgress(text) {
  return ora({
    indent: 2,
    color: 'blue',
    interval: '50',
    text,
  }).start();
}

/**
 * @param {string} projectPath
 */
function initGit(projectPath) {
  const spin = showProgress('initializing git repository');
  const cp = spawn('git', ['init'], { cwd: projectPath });
  cp.on('exit', (code, signal) => {
    if (signal === null) {
      spin.succeed('init git repository success');
    } else {
      spin.fail('init git repository failure');
    }
  });
}

/**
 * @param {string} projectPath
 */
function copyTemplate(projectPath) {
  const spin = showProgress('copy template file');
  const source = path.join(__dirname, '../template');
  fs.copy(source, projectPath, error => {
    if (error) {
      spin.fail('copy template file failure');
    } else {
      spin.succeed('copy template file finished');
    }
  });
}

/**
 * init project
 * @param {string} name
 * @param {{git: boolean, engin: string}} option
 */
async function initProject(name, option) {
  const projectPath = getProjectDir(name);
  if (fs.existsSync(projectPath)) {
    const res = await inquirer.prompt({
      type: 'confirm',
      name: 'cover',
      message: 'file or directory is exist, recover it?',
    });
    if (!res.cover) {
      process.exit(0);
    }
    fs.emptyDirSync(projectPath);
  }
  fs.mkdirpSync(projectPath);
  option.git && initGit(projectPath);
  copyTemplate(projectPath);
}

function runGulpTask(task) {
  spawn(
    'gulp',
    [
      '--gulpfile',
      `${path.resolve(__dirname, './gulpfile.js')}`,
      '--cwd',
      process.cwd(),
      task || 'default',
    ],
    { stdio: 'inherit' },
  );
}

/**
 * @param {string|undefined} type
 */
function build(type) {
  if (type && !['lib', 'es', 'dist'].includes(type)) {
    console.log(
      chalk.redBright(`  unknown build type, required lib | es | dist, but receive ${type}\n`),
    );
    process.exit(0);
  }
  runGulpTask(type);
}

function clean() {
  runGulpTask('clean');
}

module.exports = {
  initProject,
  build,
  clean,
};
