const chalk = require('chalk');
const execa = require('execa');

function getPackageManager(options) {
  const { useYarn, useNpm, usePnpm } = options;
  const mutiManager = useYarn + useNpm + usePnpm > 1;

  if (mutiManager) {
    console.log(chalk.red('You can only config one package manager!'));
    process.exit(1);
  }

  const packageManager = useYarn
    ? 'yarn'
    : useNpm
    ? 'npm'
    : usePnpm
    ? 'pnpm'
    : 'yarn';

  return packageManager;
}

function addDependencies(packageManager, answer, registry) {
  const command = packageManager === 'npm' ? 'i' : 'add';
  const reg = registry ? [`--registry=${registry}`] : [];

  console.log();
  console.log(chalk.greenBright(`checking for dependencies...`));

  const { dependencies, devDependencies } = require('./dependencies')(
    answer,
    registry
  );

  if (dependencies.length) {
    console.log(chalk.greenBright(`Start to install the dependencies...`));
    execa.sync(packageManager, [command, ...dependencies, '--silent', ...reg], {
      stdio: 'inherit',
    });
    console.log();
  }
  console.log(chalk.greenBright(`Start to install the devDependencies...`));
  execa.sync(
    packageManager,
    [command, ...devDependencies, '-D', '--silent', ...reg],
    {
      stdio: 'inherit',
    }
  );
}

module.exports = (root, answer, options) => {
  const template = require('./config/template')(root, answer);
  const presetrc = require('./config/presetrc')(root, answer);
  const eslint = require('./config/eslint')(root, answer);
  const stylelint = require('./config/stylelint')(root, answer);
  const babel = require('./config/babel')(root, answer);
  const pkg = require('./config/package')(root, answer);
  const building = require('./config/building')(root, answer);
  const registry = options.registry;

  console.log();
  console.log(chalk.greenBright('Initializing the necessary files...'));
  Promise.all([
    ...template,
    presetrc,
    eslint,
    stylelint,
    babel,
    pkg,
    building,
  ]).then(() => {
    const packageManager = getPackageManager(options);
    addDependencies(packageManager, answer, registry);
  });
};