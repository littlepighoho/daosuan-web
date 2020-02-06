/**
 * Created by romchung on 2020-02-01.
 *
 */
// 路由 component相对于src/pages目录
exports.routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index' },
      { path: '/register', component: './register/register_view'}
    ]
  }
];
