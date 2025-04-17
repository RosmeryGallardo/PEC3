const path = require('path');

module.exports = {
  entry: './app.ts',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'PEC3_Ej4', 'dist')  
  },
  devServer: {
    static: path.join(__dirname),  
    port: 8080,
    open: true,  
    historyApiFallback: true,  
  }
};
