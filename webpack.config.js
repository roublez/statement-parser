const path = require('path');

module.exports = {
    entry: './src/parser.ts',
    output: {
        filename: 'parser.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        library: 'statementParser',
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            include: path.resolve(__dirname, 'src')
        }],
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
}
