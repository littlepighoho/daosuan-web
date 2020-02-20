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
      { path: '/register', component: './register/register_view' },
      {
        path: '/account',
        routes: [
          { path: '/account/setting', component: './account/setting/setting_view' },
          { path: '/account/dashboard', component: './account/dashboard/dashboard_view' },
        ]
      },
      {
        path: '/market',
        routes: [
          { path: '/market', component: './market/market_view' },
        ]
      },
      {
        path: '/community',
        routes: [
          { path: '/community', component: './community/community_view' }
        ]
      }
    ]
  }
];
