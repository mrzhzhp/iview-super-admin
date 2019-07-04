/** When your routing table is too long, you can split it into small modules **/

import Main from '@/components/main'

const talentsRouter = {
  path: '/talents',
  component: Main,
  redirect: 'noRedirect',
  name: 'talents',
  meta: {
    title: 'talents',
    icon: 'ios-book'
  },
  children: [
    // 我的人才
    {
      path: 'my-talents',
      component: () => import('@/pages/talents/my-talents'),
      name: 'myTalents',
      meta: {
        title: 'myTalents',
        icon: 'ios-book'
      }
    },
    // 录入人才
    {
      path: 'input-talents',
      component: () => import('@/pages/talents/input-talents/input-talents'),
      name: 'inputTalents',
      meta: {
        title: 'inputTalents',
        icon: 'ios-book'
      }
    },
    // 简历查询
    {
      path: 'search-talents',
      component: () => import('@/pages/talents/search-talents'),
      name: 'searchTalents',
      meta: {
        title: 'searchTalents',
        icon: 'ios-book'
      }
    },
    // 公海简历
    {
      path: 'sea-talents',
      component: () => import('@/pages/talents/sea-talents'),
      name: 'seaTalents',
      meta: {
        title: 'seaTalents',
        icon: 'ios-book'
      }
    },
    // 长期不找工作
    {
      path: 'no-looking-talents',
      component: () => import('@/pages/talents/no-looking-talents'),
      name: 'noLookingTalents',
      meta: {
        title: 'noLookingTalents',
        icon: 'ios-book'
      }
    },
    // 变更所属人
    {
      path: 'change-subordinates',
      component: () => import('@/pages/talents/change-subordinates'),
      name: 'changeSubordinates',
      meta: {
        title: 'changeSubordinates',
        icon: 'ios-book'
      }
    },
    // 无效简历
    {
      path: 'garbage-talents',
      component: () => import('@/pages/talents/garbage-talents/garbage-talents'),
      name: 'garbageTalents',
      meta: {
        title: 'garbageTalents',
        icon: 'ios-book'
      },
      redirect: 'talents/garbage-talents/out-talents',
      children: [
        // 失联简历
        {
          path: 'out-talents',
          component: () => import('@/pages/talents/garbage-talents/out-talents'),
          name: 'outTalents',
          meta: {
            title: 'outTalents',
            icon: 'ios-book'
          }
        },
        // 同行对手
        {
          path: 'colleague-talents',
          component: () => import('@/pages/talents/garbage-talents/colleague-talents'),
          name: 'colleagueTalents',
          meta: {
            title: 'colleagueTalents',
            icon: 'ios-book'
          }
        }
      ]
    }
  ]
}

export default talentsRouter
