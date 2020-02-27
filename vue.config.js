let path = require('path');

let resolve = dir => path.join(__dirname, dir);

module.exports = {
    publicPath: "/",
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
            .set('utials', resolve('src/utials'))
            .set('network', resolve('src/network'))
            .set('base', resolve('src/base'))
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Lin',
        }
    }
}