import axios from "axios";
import store from "./store";
import router from "./router";

axios.defaults.baseURL = '/';

axios.interceptors.request.use(
    config => {
        if (store.state.user.token) {
            config.headers.Authorization = store.state.user.token;
        }
        return config;
    }, err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => response,
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 401: {
                    store.commit('logout');
                    router.replace({
                        path: '/login', query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                }
            }
        }
        return Promise.reject(err.response.data);
    }
);

export default axios;