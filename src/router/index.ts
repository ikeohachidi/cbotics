import store from '@/store'
import { isUserAuthenticated } from '@/store/modules/auth'
import Vue from 'vue'
import VueRouter, { NavigationGuard, NavigationGuardNext, Route, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{ path: '/', name: 'Home', component: Home, meta: {
		requireAuth: true
	} },
	{ path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue') },
	{ path: '/signup', name: 'Signup', component: () => import(/* webpackChunkName: "signup" */ '@/views/SignUp.vue') },
	{ path: '/reset_password', name: 'ResetPassword', component: () => import(/* webpackChunkName: "reset_password" */ '@/views/ResetPassword.vue') }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})


router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	if ((to.meta && to.meta.requireAuth) && !isUserAuthenticated(store)) {
		next({ path: '/login' })
		return;
	}
	next()
})

export default router
