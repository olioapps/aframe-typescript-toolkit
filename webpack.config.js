const webpack = require("webpack");
const path = require("path");
const DashboardPlugin = require("webpack-dashboard/plugin");
const nodeEnv = process.env.NODE_ENV || "development";
const isProd = nodeEnv === "production";

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      // eslint-disable-line quote-props
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
    filename: "vendor.bundle.js"
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
        exclude: ["node_modules"],
        use: ["awesome-typescript-loader", "source-map-loader"]
      },
      {
        test: /\.(js|ts)$/,
        loader: "babel-loader",
        exclude: [/\/node_modules\//]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: plugins
};

module.exports = config;
