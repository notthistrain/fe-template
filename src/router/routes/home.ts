import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  name: 'Home',
  path: 'home',
  component: async () => import('~/view/Home.vue'),
}

export default route
