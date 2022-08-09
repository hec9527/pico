#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const chalk = require('chalk');
const { initProject, build, clean } = require('../cli');

program.name(pkg.name).description(pkg.description).version(`v${pkg.version}`, '-v, --version');

program
  .command('create <project>')
  .description('create project')
  .option('--no-git', "don't init git")
  .option('--engin <type>', 'which package manager to use', 'npm')
  .action((name, option) => {
    console.log('create project', name);
    initProject(name, option);
  })
  .on('--help', () => {
    console.log(chalk.bold('\n\nUsage:\n'));
    console.log(chalk.white('    pico create my-lib'));
    console.log(chalk.gray('    create project named my-lib'));
    console.log('\n\n\n');
  });

program
  .command('build [type]')
  .description('build source code')
  .action(type => {
    console.log(chalk.bold(`\nCompile project\n`));
    build(type);
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

program
  .command('clean')
  .description('clean dist directory')
  .action(() => {
    console.log(chalk.bold(`\nClean dist directory\n`));
    clean();
  })
  .on('--help', () => {
    console.log(chalk.bold('\n\nUsage:\n'));
    console.log(chalk.white('    pico clean'));
    console.log(chalk.gray('    clean output directory'));
    console.log('\n\n\n');
  });

program.addHelpText('after', `\nPowered by ${pkg.author}\n\n`);

program.parse(process.argv);
