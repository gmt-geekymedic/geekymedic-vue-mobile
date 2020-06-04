const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

module.exports = {
  parallel: false,
  outputDir: "dist/geekymedic-vue-mobile",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "/api": {
        target: process.env.VUE_APP_PROXY_URL,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                style: name => `${name}/style/less`
              })
            ]
          }),
          compilerOptions: {
            module: "es2015"
          }
        });
        return options;
      });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          // "text-color": "#111",
          // "border-color": "#eee",
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "~@/theme.less";`
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ["*"]
          })
        ]
      }
    }
  }
};
