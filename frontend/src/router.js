import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from './store/userStore.js'

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '/',
                name: 'Home',
                component: () => import('./views/HomeView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/signup',
                name: 'Signup',
                component: () => import('./views/SignUpView.vue')
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('./views/LogInView.vue')
            },
            {
                path: '/menu',
                name: 'Menu',
                component: () => import('@/views/MenuView.vue'),
                meta: { requiresAuth: true }
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'PageNotFound',
                component: () => import('./views/NotFoundView.vue')
            }
        ]
    }
)

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(r => r.meta.requiresAuth)) {

        try {
            const userStore = useUserStore()
            const res = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/info`, {
                credentials: 'include'
            })
            const body = await res.json()
            if (res.status === 401) {
                console.error('Failed Auth:', body.error)

                if (to.fullPath === '/') {
                    console.log('no user logged in home')
                    return next()
                }
                console.log('no user logged in')
                return next('/login')
            }
            if (to.fullPath === '/') {
                console.log('authorized user')
                return next('/menu')
            }
            console.log('authorized user')
            userStore.userData = body.data
            return next()
        }
        catch (e) {
            console.error(e.message)
            next('/login')
        }
    } else {
        console.log('no auth required')
        next()
    }
})

export default router