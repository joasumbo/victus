import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Libraries from '../views/Libraries.vue'
import LibraryVideo from '../views/LibraryVideo.vue'
import AddLibrary from '@/views/AddLibrary.vue'
import AddVideo from '@/views/AddVideo.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/libraries',
    name: 'Libraries',
    component: Libraries,
    meta: { requiresAuth: true }
  },
  {
    path: '/libraries/create',
    name: 'libraries-create',
    component: AddLibrary,
    meta: { requiresAuth: true }
  },
  {
    path: '/libraries/:id',
    name: 'LibraryVideo',
    component: LibraryVideo,
    component: () => import('@/views/LibraryVideo.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/videos/upload',
    name: 'videos-create',
    component: AddVideo,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router