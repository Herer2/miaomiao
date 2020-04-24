module.exports = {
    // 跨域
    devServer: {
        proxy: {
            'api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    }
}