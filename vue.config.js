module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_CONTEXT
    : '/',
    devServer: {
        disableHostCheck: true
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/assets/styles/main.scss";`,
            },
        },
    },
}
