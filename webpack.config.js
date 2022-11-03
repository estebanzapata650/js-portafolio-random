const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.m?js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          }, 
          {
            test: /\.css|.styl$/i,
            use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ]
          },
        ]
    }, 
    plugins: [
      new HtmlWebpackPlugin({ 
        inject: 'body',
        template: './public/index.html',
        filename: './index.html'
      }),
      new MiniCssExtractPlugin(),
      new CopyPlugin({ // CONFIGURACIÓN DEL COPY PLUGIN
        patterns: [
            {
                from: path.resolve(__dirname , "src" , "assets/images"), // CARPETA A MOVER AL DIST
                to: "assets/images" // RUTA FINAL DEL DIST
            }
        ]
      })
    ]
};