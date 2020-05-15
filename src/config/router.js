import vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home"
import LogIn from "../components/LogIn";
import Register from "../components/Register";
import About from "../components/About";
import Add from "../components/Add";
import Edit from "../components/Edit";
import Content from "../components/Content";

import store from "./store";

vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: Home,
        children: [
            { path: '/', component: Content },
            { path: '/add', component: Add },
            { path: '/edit/:id', component: Edit }
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
    if (to.meta.publicPage) {
        next();
        return;
    }
    if (store.state.user.logined) {
        next();
        return;
    }
    next({
        path: '/login', query: {
            redirect: to.fullPath
        }
    });
});

export default router;