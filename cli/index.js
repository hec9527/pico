const fs = require('fs-extra');
const ora = require('ora');
const path = require('path');
const inquirer = require('inquirer');
const { spawn } = require('child_process');
const pkg = require('../package.json');

const { getProjectDir } = require('../utils');
const chalk = require('chalk');

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
  return new Promise(resolve => {
    const spin = showProgress('initializing git repository');
    const cp = spawn('git', ['init'], { cwd: projectPath });
    cp.on('exit', (code, signal) => {
      if (signal === null) {
        spin.succeed('init git repository success');
      } else {
        spin.fail('init git repository failure');
      }
      resolve();
    });
  });
}

const blocked = ['node_modules', 'lib', 'package.json'];

function copyDir(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  for (const file of fs.readdirSync(source)) {
    if (blocked.includes(file)) continue;
    const fPath = path.join(source, file);
    const stat = fs.statSync(fPath);
    if (stat.isDirectory()) {
      copyDir(fPath, path.join(target, file));
    } else if (stat.isFile()) {
      fs.copyFileSync(fPath, path.join(target, file));
    }
  }
}

/**
 * @param {string} projectPath
 */
function copyTemplate(target, name) {
  return new Promise((resolve, reject) => {
    const spin = showProgress('copy template file');
    const source = path.join(__dirname, '../template');

    try {
      copyDir(source, target);

      const pPkg = JSON.parse(fs.readFileSync(path.join(source, 'package.json'), 'utf-8'));
      pPkg.name = name;
      pPkg.devDependencies['@hec9527/pico'] = pkg.version;
      fs.writeFileSync(path.join(target, 'package.json'), JSON.stringify(pPkg, null, 2) + '\n');

      spin.succeed('copy template file finished');
      resolve();
    } catch (e) {
      spin.fail('copy template file failure');
      console.log(e);
      reject();
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
  option.git && (await initGit(projectPath));
  return copyTemplate(projectPath, name);
}

function build() {
  spawn(
    'gulp',
    ['--gulpfile', `${path.resolve(__dirname, './gulpfile.js')}`, '--cwd', process.cwd()],
    { stdio: 'inherit' }
  );
}

module.exports = {
  initProject,
  build,
};
