#!/usr/bin/env node

const chalk = require('chalk');
const pkg = require('../package.json');
const { program } = require('commander');
const { initProject, build } = require('../cli');

program.name(pkg.name).description(pkg.description).version(`v${pkg.version}`, '-v, --version');

program
  .command('create <project>')
  .description('create new project, you can provide a custom project name and package manage tool')
  .option('--no-git', "don't init git")
  .action(async (name, option) => {
    console.log('create project', name);
    await initProject(name, option);
    console.log(chalk.white('\nrun your project'));
    console.log(chalk.gray(`    cd ${name} && npm install`));
    console.log(chalk.gray('    npm run dev'));
  })
  .on('--help', () => {
    console.log(chalk.bold('\n\nUsage:\n'));
    console.log(chalk.white('    pico create my-lib'));
    console.log(chalk.gray('    create project named my-lib'));
    console.log('\n\n\n');
  });

program
  .command('build')
  .description('build source code')
  .action(() => {
    console.log(chalk.bold(`\nCompile project\n`));
    build();
  })
  .on('--help', () => {
    console.log(chalk.bold('\n\nUsage:\n'));
    console.log(chalk.white('    pico build'));
    console.log(chalk.gray('    build commonjs, ES module and UMD production'));
    console.log('');
    console.log(chalk.white('    pick build lib'));
    console.log(chalk.gray('    build commonjs lib only'));
    console.log('');
    console.log(chalk.white('    pick build es'));
    console.log(chalk.gray('    build es module only'));
    console.log('');
    console.log(chalk.white('    pick build dist'));
    console.log(chalk.gray('    build UMD production only'));
    console.log('\n\n\n');
  });

program.addHelpText('after', `\npico powered by ${pkg.author}\n\n`);

program.parse(process.argv);
