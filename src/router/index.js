import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: Login,
        name: 'Login'
    }
]

const router = new VueRouter({
    routes
})

export default router
