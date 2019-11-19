module.exports = function(api) {
  const isTest = api.env('test');
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: false,
          modules: isTest ? 'commonjs' : false,
          loose: true,
          targets:['ie>=10']
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [['@babel/plugin-transform-runtime', {}]]
  };
};
