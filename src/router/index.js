import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: HelloWorld
    }
]

const router = new VueRouter({
    routes
})

export default router
