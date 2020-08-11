const { resolve } = require('path');
const { withUnimodules } = require('@expo/webpack-config/addons');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        }
      },
    ]  
  });

  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' },
    },
  });

  config.module.rules.push({
    test: /\.(png|jpe?g|gif|jp2|webp)$/,
    loader: 'file-loader',
    options: {
      name: 'images/[name].[ext]',
    },
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: resolve(__dirname, '../'),
  });

  config.resolve.extensions = [
    '.web.js',
    '.js',
    '.json',
    '.web.jsx',
    '.jsx',
    'ts',
    'tsx',
  ];

  config.resolve.alias = {
    'react-native': 'react-native-web',
  };

  const configWithExpo = withUnimodules(config, {
    projectRoot: resolve(__dirname, '../'),
    // babel: {
    //   dangerouslyAddModulePathsToTranspile: [
    //     // Ensure that all packages starting with @evanbacon are transpiled.
    //     'dooboo-ui',
    //   ],
    // },
  });
  configWithExpo.output.publicPath = '';
  return configWithExpo;
};
