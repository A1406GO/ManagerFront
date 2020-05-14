import store from "./store";
import axios from "./http";
import router from "./router";


export default function (Vue, conf) {
    conf.router = router;
    conf.store = store;
    Vue.prototype.$axios = axios;
};

