const routes = [
  { path: '/', redirect: '/scenario' },
  {
    path: '/scenario',
    name: '剧情管理',
    component: '@/pages/Scenario',
  },
  {
    path: '/talent',
    name: '天赋管理',
    component: '@/pages/Talent',
  },
  {
    path: '/dictionary',
    name: '字典管理',
    component: '@/pages/Dictionary',
  },
  {
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
];

export default routes;
