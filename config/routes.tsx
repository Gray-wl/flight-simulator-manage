const routes = [
  { path: '/', redirect: '/scenario' },
  {
    path: '/scenario',
    name: '剧情管理',
    component: './Scenario',
  },
  {
    path: '/talent',
    name: '天赋管理',
    component: './Talent',
  },
  {
    path: '/dictionary',
    name: '字典管理',
    component: './Dictionary',
  },
  {
    path: '/login',
    component: './Login',
    layout: false,
  },
];

export default routes;
