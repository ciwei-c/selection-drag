import getters from '../getters';

const moduleRegExp = /\.\/(\w+)(?:\/index)?\.js/i;

// 遍历本文件夹及子文件夹下的所有.js文件
const modulesFiles = require.context('./', true, /\.js$/);

// 取本文件夹下的.js文件以及第一层子文件夹下的index.js文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleMatch = modulePath.match(moduleRegExp);

  if (moduleMatch) {
    const name = modulePath.replace(moduleRegExp, '$1');

    if (name !== 'index') {
      modules[name] = modulesFiles(modulePath).default;
    }
  }
  return modules;
}, {});

export default {
  modules,
  getters
};
