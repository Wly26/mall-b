import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  },
  {
    path: '/detail',
    component: Detail,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
