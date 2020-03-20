const {
    override,
    addWebpackPlugin,
    addWebpackModuleRule,
    removeModuleScopePlugin,
    fixBabelImports
} = require("customize-cra");
module.exports = {
    webpack: override(
        addWebpackModuleRule({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        }),
        removeModuleScopePlugin(),
        fixBabelImports('pc', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        fixBabelImports('mobile', {
            libraryName: 'antd-mobile',
            style: 'css',
        }),
    )
}