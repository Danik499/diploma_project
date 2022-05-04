import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Registration from "../views/Registration"
import Login from "../views/Login"
import User from "../views/User"
import SearchPage from "../views/SearchPage"
import mySubscriptions from "../views/mySubscriptions"
import Create from "../views/Create"
import Events from "../views/Events"
import EventPage from "../views/EventPage"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'About',
    component: () => import('../views/Admin.vue')
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/user/search/:id",
    name: "SearchPage",
    component: SearchPage
  },
  {
    path: "/user/my_subscriptions",
    name: "mySubscriptions",
    component: mySubscriptions
  },
  {
    path: "/admin/create",
    name: "Create",
    component: Create
  },
  {
    path: "/admin/events",
    name: "Events",
    component: Events
  },
  {
    path: "/event/:id",
    name: "EventPage",
    component: EventPage
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
