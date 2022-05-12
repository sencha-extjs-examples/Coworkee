const path = require('path');
const ExtWebpackPlugin = require('@sencha/ext-webpack-plugin');
const portfinder = require('portfinder');

module.exports = async function (env) {
  
  // Utility function for retrieving environment variables
  function get(it, val) {if(env == undefined) {return val} else if(env[it] == undefined) {return val} else {return env[it]}}

  const rules = [
    { test: /.(js)$/, use: ['babel-loader'] }
  ]
  const resolve = {}
  const host = '0.0.0.0'
  const stats = 'none'

  var framework     = get('framework',     'extjs')
  var contextFolder = get('contextFolder', './')
  var entryFile     = get('entryFile',     './index.js')
  var outputFolder  = get('outputFolder',  './')
  var toolkit       = get('toolkit',       'modern')
  var theme         = get('theme',         'theme-material')
  var packages      = get('packages',      ['treegrid'])
  var script        = get('script',        '')
  var emit          = get('emit',          'yes')
  var profile       = get('profile',       '')
  var environment   = get('environment',   'development')
  var treeshake     = get('treeshake',     'no')
  var browser       = get('browser',       'yes')
  var watch         = get('watch',         'yes')
  var verbose       = get('verbose',       'no')
  var isProd        = false;
  
  if (environment === 'production') { isProd = true; }

  // The build.xml Sencha Cmd plugin uses a regex to locate the webpack bundle for use in app.json to be included in 
  // the different build environments. For development builds, the file is served in memory.
  // For production builds, the hashed file name is stored as an ant property and added to the build via app.json.
  const bundleFormat = isProd ? "[name].[hash].js" : "[name].js";

  // Using Live Reload with a root context directory, necessary for Sencha Cmd, requires these folders be ignored 
  const ignoreFolders = [path.resolve(__dirname, './generatedFiles'), path.resolve(__dirname, './build')]

  portfinder.basePort = (env && env.port) || 1962
  return portfinder.getPortPromise().then(port => {
    const plugins = [
      new ExtWebpackPlugin({
        framework: framework,
        toolkit: toolkit,
        theme: theme,
        packages: packages,
        script: script,
        emit: emit,
        port: port,
        profile: profile, 
        environment: environment,
        treeshake: treeshake,
        browser: browser,
        watch: watch,
        verbose: verbose
      })
    ]
    return {
      mode: environment,
      devtool: (environment === 'development') ? 'inline-source-map' : false,
      context: path.join(__dirname, contextFolder),
      entry: entryFile,
      output: {
        path: path.join(__dirname, outputFolder),
        filename: bundleFormat
      },
      plugins: plugins,
      module: {
        rules: rules
      },
      resolve: resolve,
      performance: { hints: false },
      stats: 'none',
      optimization: { noEmitOnErrors: true },
      node: false,
      devServer: {
        watchOptions: {
          ignored: ignoreFolders
        },
        contentBase: [path.resolve(__dirname, outputFolder)],
        watchContentBase: !isProd,
        liveReload: !isProd,
        historyApiFallback: !isProd,
        host: host,
        port: port,
        disableHostCheck: isProd,
        compress: isProd,
        inline: !isProd,
        stats: stats
      }
    }
  })
}
