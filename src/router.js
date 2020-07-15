import Vue from 'vue'
import Router from 'vue-router'

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
var router = new Router({
   // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'default',
            component: () => import('./views/Default.vue'),
        },
        {
            path: '/confirm/:token',
            name: 'confirm',
            component: () => import('./views/Confirm.vue'),
            props: true,
        },
        {
            path: '/newtoken',
            name: 'newToken',
            component: () => import('./views/NewToken.vue'),
            props: true,
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('./views/Admin.vue'),
            props: true,
        }

    ]
})

export default router

