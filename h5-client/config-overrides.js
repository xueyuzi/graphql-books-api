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
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        // fixBabelImports('import', {
        //     libraryName: 'antd-mobile',
        //     style: 'css',
        // }),
    )
}