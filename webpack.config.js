const webpack = require("webpack");
const path = require("path");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      // eslint-disable-line quote-props
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      tslint: {
        emitErrors: true,
        failOnHint: true
      }
    }
  })
];


if (!isProd) {
  plugins.push(new DashboardPlugin());
  plugins.push(new TypedocWebpackPlugin({
    out: './docs',
    module: 'commonjs',
    target: 'es5',
    exclude: [
      path.resolve(__dirname, '/node_modules'),
      path.resolve(__dirname, '/examples'),
      path.resolve(__dirname, '/.history'),
      path.resolve(__dirname, '/templates')
    ],
    experimentalDecorators: true,
    excludeExternals: true
  }));
}

var config = {
  devtool: isProd ? "hidden-source-map" : "source-map",
  context: path.resolve("./src"),
  entry: {
    app: "./index.ts"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    sourceMapFilename: "index.map",
    devtoolModuleFilenameTemplate: function(info) {
      return "file:///" + info.absoluteResourcePath;
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts?$/,
        exclude: path.resolve(__dirname, '/node_modules'),
        use: ["awesome-typescript-loader", "source-map-loader"]
      },
      {
        test: /\.(js|ts)$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, '/node_modules')
      }
    ]
  },
  stats: {
    errorDetails: true,
    cached: true
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: plugins
};

module.exports = config;
