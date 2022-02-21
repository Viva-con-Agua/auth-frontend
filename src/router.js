import Vue from 'vue'
import Router from 'vue-router'
import RegisterPage from '@/views/RegisterPage'
import LoginPage from '@/views/LoginPage'
import WebAppPage from '@/views/WebAppPage'
import LandingPage from '@/views/LandingPage'
//import store from './store'
Vue.use(Router)
/**
 * All routes
 * You can pass a "meta" parameter, that contains {{ 'roles' : [] }}. The content of `roles` can be a string of the values
 * "Admin", "Employee" or "Supporter" or a complex JSON with the keys "name", "crew" and "pillar". For example (all
 * attributes except "name" are optional):
 * {{
 *  "name": "VolunteerManager",
 *  "pillar": "education", // "operation", "network", "finance"
 *  "crew" : {
 *    "name": "VcA Berlin",
 *    "id": "<some UUID>"
 *  }
 * }}
 * @type {VueRouter}
 */
function loadView(view) {
    return () => import(/* webpackChunkName: '[request]' */ `@/views/${view}.vue`)
}

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
        meta: { requiresAuth: false, title: "LandingView" },
        children: [
            {
                path: '',
                name: 'WebAppPage',
                component: WebAppPage,
                meta: { requiresAuth: false, title: "LoginPage" },
                props: route => ({ login_challenge: route.query.login_challenge, language: route.query.language, callback: route.query.callback, msg: route.query.msg, source: route.query.source })
            },
            {
                path: 'login',
                name: 'Login',
                component: LoginPage,
                meta: { requiresAuth: false, title: "LoginPage" },
                props: route => ({ login_challenge: route.query.login_challenge, language: route.query.language, callback: route.query.callback, msg: route.query.msg, source: route.query.source })
            },
            {
                path: 'consent',
                name: 'Consent',
                component: loadView('ConsentPage'),
                meta: { requiresAuth: false, title: "ConsentPage" },
                props: route => ({ consent_challenge: route.query.consent_challenge })
            },
            {
                path: 'register',
                name: 'Register',
                component: RegisterPage,
                meta: { requiresAuth: false, title: "RegisterPage" },
                props: route => ({ login_challenge: route.query.login_challenge, language: route.query.language, callback: route.query.callback })

            },
            {
                path: 'confirm/:code',
                name: 'Confirm',
                component: loadView('Confirm'),
                props: true
            },
            {
                path: 'logout',
                name: 'Logout',
                component: loadView('Logout'),
                props: route => ({ callback: route.query.callback })
            },    
            {
                path: 'reset/:token',
                name: 'PasswordReset',
                component: loadView('ResetPassword'),
                meta: { requiresAuth: false },
                props: true
            }
        ]
    }

]

var router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
})
/*router.beforeEach(( to, from, next ) => {
    store.dispatch('current')
        .then(()=> {
            next()
        })
        .catch (error => {
            if (!to.meta.requiresAuth) {
                next()
            }
            else if (error.response.status === 401) {
                router.push({name: 'Sign'})
            }
        })
})*/
export default router
