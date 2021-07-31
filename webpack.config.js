const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


module.exports = function(env) {
  const mode = env.mode || "development";
  return {
    mode: mode,
    entry: "./src/main.js",
    devtool: mode === "development" ? "source-map" : false,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    devServer: {
      contentBase: "./dist"
    },
    output: {
      clean: true,
      filename: "js/[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "js/[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext]"
    },
    module: {
      rules: [
        {
          test: /\.vue$/i,
          use: "vue-loader"
        },
        {
          test: /\.css$/i,
          use: [ MiniCssExtractPlugin.loader, "css-loader" ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset",
          generator: {
            filename: "images/[name].[contenthash][ext]"
          },
          parser: {
            dataUrlCondition: {
              maxSize: 32 * 1024
            }
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[contenthash][ext]"
          }
        },
        {
          test: /\.svg$/i,
          type: "asset/inline"
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body"
      }),
      new CssMinimizerPlugin(),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css"
      })
    ],
    optimization: {
      runtimeChunk: "single",
      minimize: mode === "production",
      minimizer: [ new TerserPlugin() ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/i,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    performance: {
      maxAssetSize: 2048 * 1024
    }
  }
}
