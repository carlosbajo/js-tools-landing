const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';
    return {
        entry: './src/js/index.js',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            hot: true,
            compress: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: /src/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.html$/,
                    include: /src/,
                    use: 'html-loader',
                },
            ],
        },
        optimization: {
            minimizer: [`...`, new CssMinimizerPlugin()],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[contenthash]-[name].css',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html',
            }),
        ],
    };
};
