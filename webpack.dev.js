const CopyPlugin = require('copy-webpack-plugin');
const type = require('@lowdefy/helpers').type;
const path = require('path');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const packageJson = require('./package.json');

const port = type.isNumber(process.argv[process.argv.findIndex((val) => val === '--port') + 1])
  ? process.argv[process.argv.findIndex((val) => val === '--port') + 1]
  : 3002;

const sanitizeName = (name) => {
  return name
    .replace('@', '_at_')
    .replace('/', '_slash_')
    .replace('-', '_dash_')
    .replace(/^[a-zA-Z0-9_]/g, '_');
};

const addRemoteEntryUrl = (content, absoluteFrom) => {
  const scope = sanitizeName(packageJson.name);
  const meta = JSON.parse(content);
  meta.moduleFederation = {
    module: path.basename(absoluteFrom, '.json'),
    scope,
    version: packageJson.version,
    remoteEntryUrl: `http://localhost:${port}/remoteEntry.js`,
  };
  return JSON.stringify(meta);
};

module.exports = merge(common, {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/blocks/**/*.json',
          transformPath: (targetPath) => {
            return path.join('meta', path.basename(targetPath));
          },
          transform: addRemoteEntryUrl,
        },
      ],
    }),
  ],
});
