import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Registration from "../views/Registration"
import Login from "../views/Login"
import User from "../views/User"
import Search from "../views/Search"
import MyEvents from "../views/MyEvents"
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
    path: "/user/search",
    name: "Search",
    component: Search
  },
  {
    path: "/user/my_events",
    name: "MyEvents",
    component: MyEvents
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
