module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '../index.js',
      '*.js'
    ],
    exclude: [],
    port: 8282,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
