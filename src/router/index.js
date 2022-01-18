import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home/0',
  },
  {
    path: '/home/:page',
    name: 'Frontpage',
    component: () => import(/* webpackChunkName: "frontpage" */ '../views/Frontpage.vue')
  },
  {
    path: '/new-post',
    name: 'NewPost',
    component: () => import(/* webpackChunkName: "new-post" */ '../views/NewPost.vue')
  },
  {
    path: '/post-details/:id',
    name: 'PostDetails',
    component: () => import(/* webpackChunkName: "post-details" */ '../views/PostDetails.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
