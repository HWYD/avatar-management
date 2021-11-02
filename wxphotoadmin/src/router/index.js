import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import User from '../views/user/User.vue'
import Mixedhead from '../views/mixedhead/Mixedhead.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:Login
  },
  {
    path:'/home',
    redirect:'/welcome',
    component:Home,
    children:[
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/user',
        component:User
      },
      {
        path:'/mixedhead',
        component:Mixedhead
      }
    ]
  },
  {
    path:'*',
    redirect:'/login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
