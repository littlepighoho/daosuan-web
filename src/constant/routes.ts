/**
 * Created by romchung on 2020-02-01.
 *
 */
// 路由 component相对于src/pages目录
// Routes 写绝对路径 根为src
exports.routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index' },
      { path: '/register', component: './register/register_view', Routes: ['src/routes/authority/login_authority']},
      {
        path: '/account',
        routes: [
          { path: '/account/setting', component: './account/setting/setting_view' },
          { path: '/account/dashboard', component: './account/dashboard/dashboard_view' },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/market',
        routes: [
          { path: '/market', component: './market/market_view' },
          {
            component: './404',
          },
        ]
      },
      {
        path: '/community',
        routes: [
          { path: '/community', component: './community/community_view' },
          {
            component: './404',
          },
        ]
      },
      {
        component: './404',
      },
    ]
  },
  {
    component: './404',
  },
];
