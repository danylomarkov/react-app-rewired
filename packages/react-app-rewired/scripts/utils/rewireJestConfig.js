'use strict';

const paths = require('./paths');

module.exports = (config) => {
  const overrides = Object.assign({}, require(paths.appPackageJson).jest);

  // Jest configuration in package.json will be added to the the default config
  Object.keys(overrides)
    .forEach(key => {
      //We don't overwrite the default config, but add to each property if not a string
      if(config[key]) {
        if(typeof overrides[key] === 'string') {
          config[key] = overrides[key];
        } else if(Array.isArray(overrides[key])) {
          config[key] = overrides[key].concat(config[key]);
        }
        else if(typeof overrides[key] === 'object') {
          config[key] = Object.assign({}, overrides[key], config[key]);
        }
      } else {
        config[key] = overrides[key];
      }
    });
  return config;
};
