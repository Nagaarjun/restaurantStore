const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  context: __dirname,
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    hot: true,
    port: 4500,
    historyApiFallback: true
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};

// let webpackConfig = {
//   entry: {
//     main: "./src/index.tsx",
//     upload: "./src/public/js/index.ts"
//   },

//   output: {
//     filename: "[name].bundle.js",
//     path: __dirname + "/dist",
//     publicPath: "/"
//   },

//   devtool: "source-map",

//   resolve: {
//     // Add '.ts' and '.tsx' as resolvable extensions.
//     extensions: [".ts", ".tsx", ".js", ".json"]
//   },

//   externals: {
//     "aws-exports": "VDEM_CONFIG"
//   },

//   module: {
//     rules: [
//       {
//         test: /\.(ts|js)x?$/,
//         loader: "babel-loader",
//         exclude: /node_modules/
//       },
//       {
//         enforce: "pre",
//         test: /\.js$/,
//         exclude: /node_modules[\/\\](react-circular-progressbar)/,
//         loader: "source-map-loader"
//       },
//       {
//         test: /fonts[\\\/]([\w-]+)\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//         exclude: /node_modules/,
//         loader: "file-loader?name=fonts/[name].[ext]"
//       },
//       {
//         test: /\.s?css$/,
//         use: ["style-loader", "css-loader", "sass-loader"]
//       },
//       {
//         test: /\.html$/,
//         exclude: /index\.html/,
//         use: ["html-loader"]
//       },
//       {
//         oneOf: [
//           {
//             test: /\.svg$/,
//             issuer: {
//               test: /\.(t|j)sx?$/
//             },
//             use: [
//               "babel-loader",
//               "@svgr/webpack",
//               {
//                 loader: "url-loader",
//                 options: {
//                   limit: 8192
//                 }
//               }
//             ]
//           },
//           {
//             test: /\.(png|jpg|jpeg|ico|svg)$/,
//             exclude: /(fonts|node_modules)/,
//             loader: "file-loader?name=images/[name].[ext]"
//           }
//         ]
//       }
//     ]
//   },

//   devServer: {
//     contentBase: path.join(__dirname, "config"),
//     historyApiFallback: true
//   },

//   mode: process.env.NODE_ENV === "production" ? "production" : "development"
// };

// module.exports = env => {
//   webpackConfig.plugins = plugins(env);
//   return setAlias(webpackConfig);
// };
