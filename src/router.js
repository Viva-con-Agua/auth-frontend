import Vue from 'vue'
import Router from 'vue-router'
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
        path: '/', redirect: { name: 'Register', query: {scope: 'factory'}}
        
    },
    {
        path: '/login',
        name: 'Login',
        component: loadView('LoginPage'),
        meta: { requiresAuth: false, title: "LoginPage" },
        props: route => ({ scope: route.query.scope, language: route.query.language, callback: route.query.callback, msg: route.query.msg, source: route.query.source })
    },
    {
        path: '/register',
        name: 'Register',
        component: loadView('Register'),
        meta: { requiresAuth: false, title: "RegisterPage" },
        props: route => ({ scope: route.query.scope, language: route.query.language, callback: route.query.callback })

    },
    {
        path: '/confirm/:code',
        name: 'Confirm',
        component: loadView('Confirm'),
        props: true
    },
    {
        path: '/logout',
        name: 'Logout',
        component: loadView('Logout'),
        props: route => ({ callback: route.query.callback })
    },    
    {
        path: '/reset/:token',
        name: 'PasswordReset',
        component: loadView('ResetPassword'),
        meta: { requiresAuth: false },
        props: true
    }

]

var router = new Router({
 //   mode: 'history',
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
