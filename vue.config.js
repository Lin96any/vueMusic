let path = require('path');

let resolve = dir => path.join(__dirname,dir);

module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
            .set('conponents', resolve('src/conponents'))
            .set('common', resolve('src/common'))
            .set('views', resolve('src/views'))
            .set('assets', resolve('src/assets'))
            .set('utials', resolve('src/utials'))
            .set('network', resolve('src/network'))
    }
}