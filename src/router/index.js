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
    // 首页
    path: '/home',
    component: Home,
  },
  {
    // 分类
    path: '/category',
    component: Category,
  },
  {
    // 购物车
    path: '/cart',
    component: Cart,
  },
  {
    // 我的
    path: '/profile',
    component: Profile,
  },
  {
    // 首页-详情页
    path: '/detail',
    component: Detail,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
