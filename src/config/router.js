import vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home";

import ManageUser from "../pages/manage/User";


import LogIn from "../pages/LogIn";
import About from "../pages/About";
import Register from "../pages/Register";



import Add from "../components/Add";
import Edit from "../components/Edit";
import Content from "../components/Content";

//import store from "./store";

vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: Home,
        children: [
            { path: 'manage/user', component: ManageUser, beforeEnter: checkPower(2) }
        ]
    },
    { meta: { publicPage: true }, path: '/login', component: LogIn },
    { meta: { publicPage: true }, path: '/register', component: Register },
    { meta: { publicPage: true }, path: '/about', component: About }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});



router.beforeEach((to, from, next) => {
    var store = router.app.$options.store;
    if (to.meta.publicPage) {
        next();
        return;
    }
    if (!store.state.user.logined) {
        next({
            path: '/login', query: {
                redirect: to.fullPath
            }
        });
        return;
    }

    next();
});



function checkPower(power) {
    return (to, from, next) => {
        var store = router.app.$options.store;
        if (store.state.user.power != power) {
            next('/');
            return;
        }
        next();
    }
}



export default router;