import { IConfig } from 'umi-types';


const config: IConfig = {
  define: {
    "process.env.webUrl": 'http://dev.v1.daosuan.net/',
    "process.env.apiUrl": 'http://api.v1.daosuan.net',
  }
};

export default config;
