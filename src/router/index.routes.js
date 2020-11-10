// /**
//  * 登录
//  *
//  */
// export default {
//   path: '/:menuId/:Id',
//   name: 'index',
//   title: "index",
//   component: () => import('@/views/index'),
//   sort: 0,
//   hidden: true,
// }
export default {
  path: '/',
  name: 'index',
  title: "index",
  component: () => import('@/views/index'),
  sort: 0,
  hidden: true,
  children: [
    {
      path: ':menuId',
      name: 'indexmenu',
      title: "indexmenu",
      component: () => import('@/views/index'),
      sort: 0,
      hidden: true,
      children: [
        {
          path: ':Id',
          name: 'indexContent',
          title: "indexContent",
          component: () => import('@/views/index'),
          sort: 0,
          hidden: true,
          children: []
        }
      ]
    }
  ],
}

