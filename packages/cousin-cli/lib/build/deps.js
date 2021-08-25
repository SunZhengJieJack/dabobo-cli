const { getPkg } = require('../util');
const { LIBRARY, BUILDINGTOOL, CSSPREPROCESSOR } = require('../util/constant');

module.exports = (preset, registry) => {
  const { library, version, buildingTool, cssPreProcessor } = preset;
  const tools = [];

  if (buildingTool === BUILDINGTOOL.VUE) {
    tools.push('@vue/cli-service@~4.5.0');

    // vue-service only for webpack4 - need related loaders
    if (cssPreProcessor === CSSPREPROCESSOR.LESS) {
      tools.push('less-loader@^5.0.0', 'less@^3.0.4');
    } else if (cssPreProcessor === CSSPREPROCESSOR.SASS) {
      tools.push('sass-loader@^8.0.2', 'node-sass@^4.12.0');
    } else if (cssPreProcessor === CSSPREPROCESSOR.STYLUS) {
      tools.push('stylus-loader@3.0.2', 'stylus@0.54.7');
    }
  } else {
    if (buildingTool === BUILDINGTOOL.UMI) {
      tools.push('umi');
    } else if (buildingTool === BUILDINGTOOL.REACT) {
      tools.push('react-scripts');
    } else {
      tools.push('cousin-service');
    }

    if (cssPreProcessor === CSSPREPROCESSOR.LESS) {
      tools.push(...getPkg('less-loader', registry, 'webpack'));
    } else if (cssPreProcessor === CSSPREPROCESSOR.SASS) {
      tools.push(...getPkg('sass-loader', registry, 'webpack'));
    } else if (cssPreProcessor === CSSPREPROCESSOR.STYLUS) {
      tools.push(...getPkg('stylus-loader', registry, 'webpack'));
    }
  }

  if (library === LIBRARY.VUE) {
    // tools.push('vue-loader', 'vue-loader-plugin');

    if (version === 2) {
      tools.push('vue-template-compiler');
    } else if (version === 3) {
      tools.push('@vue/compiler-sfc');
    }
  }

  return tools;
};
