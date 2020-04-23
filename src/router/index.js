import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieRouter from '@/router/movie'
import CinemaRouter from '@/router/cinema'
import MineRouter from '@/router/mine'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        MovieRouter,
        CinemaRouter,
        MineRouter,
        {
            path: '/*',
            redirect: '/movie'
        }
    ]
})