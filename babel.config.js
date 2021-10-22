
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['module:react-native-dotenv', {
      'moduleName': '@env',
      'path': `.env.${process.env.NODE_ENV}`,
      "safe": false,
      "allowUndefined": true,
      "verbose": false
    }]]
  };
};
