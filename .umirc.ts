import { IConfig } from 'umi-types';
// @ts-ignore
import { routes } from './src/constant/routes';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,

  // 路由
  routes: routes,

  cssLoaderOptions: {
    localIdentName:'[local]',
  },

  manifest: {
    basePath: '/',
  },

  // API转发
  proxy: {
    '/server/api/': {
      target: 'https://api.fh.shoogoome.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/server/api/': '',
      },
    },
  },

  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'DAOSUAN',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
