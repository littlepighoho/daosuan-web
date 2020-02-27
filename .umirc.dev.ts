import { IConfig } from 'umi-types';


const config: IConfig = {
  define: {
    "process.env.webUrl": 'http://local.daosuan.net:8000',
    "process.env.apiUrl": 'http://api.v1.daosuan.net',

  }
};

export default config;
