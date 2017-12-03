const loaderUtils = require('loader-utils');

function processOptions(source, options) {
  const name = options.name || 'everyone';

  const greeting = `Hello, ${name}`;
  const newSource = source + greeting;

  return newSource;
}

module.exports = function(source, map) {
  this.cacheable();

  const options = loaderUtils.getOptions(this);
  source = processOptions(source, options);

  this.callback(null, source, map);
};
