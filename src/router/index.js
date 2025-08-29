import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Libraries from '../views/Libraries.vue'
import LibraryVideo from '../views/LibraryVideo.vue'
import AddLibrary from '@/views/AddLibrary.vue'
import AddVideo from '@/views/AddVideo.vue'
import Profile from '@/views/Profile.vue'
import Weight from '@/views/Weight.vue'
import WeightShow from '@/views/WeightShow.vue'
import Phrases from '@/views/Phrases.vue'
import PhrasesShow from '@/views/PhrasesShow.vue'
import Events from '@/views/Events.vue'
import EventsShow from '@/views/EventsShow.vue'
import Banner from '@/views/Banner.vue'
import BannerShow from '@/views/BannerShow.vue'
import EditProfile from '@/views/EditProfile.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ResetLinkSuccess from '@/views/ResetLinkSuccess.vue'

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
  {
    path: '/weight/create',
    name: 'weight-create',
    component: Weight,
    meta: { requiresAuth: true }
  },
  {
    path: '/weight/show',
    name: 'weight-show',
    component: WeightShow,
    meta: { requiresAuth: true }
  },

  {
    path: '/phrases/show',
    name: 'phrases-show',
    component: PhrasesShow,
    meta: { requiresAuth: true }
  },

  {
    path: '/phrases/create',
    name: 'phrases-create',
    component: Phrases,
    meta: { requiresAuth: true }
  },

  {
    path: '/events/show',
    name: 'events-show',
    component: EventsShow,
    meta: { requiresAuth: true }
  },

  {
    path: '/events/create',
    name: 'events-create',
    component: Events,
    meta: { requiresAuth: true }
  },

  {
    path: '/banner/show',
    name: 'banner-show',
    component: BannerShow,
    meta: { requiresAuth: true }
  },

  {
    path: '/banner/create',
    name: 'banner-create',
    component: Banner,
    meta: { requiresAuth: true }
  },

  {
    path: "/profile/edit",
    name: "edit-profile",
    component: EditProfile,
    meta: { requiresAuth: true }
  },

  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },

  {
    path: "/reset-link-success",
    name: "ResetLinkSuccess",
    component: ResetLinkSuccess,
  }

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