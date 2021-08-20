const { LIBRARY } = require('./util/constant');

module.exports = [
  {
    type: 'list',
    name: 'language',
    message: 'Select a programming language you want to use',
    default: 0,
    choices: [
      { name: 'ES6+', value: 'es6' },
      { name: 'Typescript', value: 'typescript' },
    ],
  },
  {
    type: 'list',
    name: 'jsLinter',
    message: 'Pick a linter/formatter config(Prettier is enabled by default)',
    default: 0,
    choices: [
      { name: 'ESLint:recommended', value: 'recommended' },
      { name: 'Standard', value: 'standard' },
      { name: 'AirBnB', value: 'airbnb' },
    ],
  },
  {
    type: 'list',
    name: 'library',
    message: 'What functionality do you want to use',
    default: 0,
    choices: [
      { name: 'Vue', value: 'vue' },
      { name: 'React', value: 'react' },
      { name: 'No Library/Framework', value: 'empty' },
    ],
  },
  {
    type: 'list',
    name: 'version',
    message: 'Choose a version of Vue.js that you want to start with',
    default: 0,
    when: function (answers) {
      return answers.library === LIBRARY.VUE;
    },
    choices: [
      { name: '2.x', value: 2 },
      { name: '3.x', value: 3 },
    ],
  },
  {
    type: 'list',
    name: 'version',
    message: 'Choose a version of React.js that you want to start with',
    default: 0,
    when: function (answers) {
      return answers.library === LIBRARY.REACT;
    },
    choices: [
      { name: '16.x', value: 16 },
      { name: '17.x', value: 17 },
    ],
  },
  {
    type: 'list',
    name: 'cssPreProcessor',
    message:
      'Pick a CSS pre-processor(PostCSS, Autoprefix and CSS Modules are supported by default)',
    default: 0,
    choices: [
      { name: 'less', value: 'less' },
      { name: 'sass/scss', value: 'sass' },
      { name: 'stylus', value: 'stylus' },
      { name: 'No pre-processor', value: 'noprocessor' },
    ],
  },
  {
    type: 'confirm',
    name: 'useStyleLint',
    message: 'Do you want to enable stylelint?',
    default: true,
  },
  {
    type: 'list',
    name: 'buildingTool',
    message: 'Choose a Building tool',
    default: 'cousin',
    when: function (answers) {
      return answers.library === LIBRARY.VUE;
    },
    choices: [
      { name: 'cousin-service(default)', value: 'cousin' },
      { name: 'vue-cli-service', value: 'vue' },
    ],
  },
  {
    type: 'list',
    name: 'buildingTool',
    message: 'Choose a Building tool',
    default: 'cousin',
    when: function (answers) {
      return answers.library === LIBRARY.REACT;
    },
    choices: [
      { name: 'cousin-service(default)', value: 'cousin' },
      { name: 'umi', value: 'umi' },
      { name: 'react-scripts', value: 'react' },
    ],
  },
];