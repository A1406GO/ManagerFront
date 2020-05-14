import vue from "vue";
import vuex from 'vuex'

vue.use(vuex);

var token = window.localStorage.getItem('login_token');
var logined = token != null && token != '';
if (!logined)
    token = '';

const store = new vuex.Store({
    state: {
        logined,
        token
    },
    mutations: {
        login(state, token) {
            state.token = token;
            state.logined = true;
            window.localStorage.setItem('login_token', token);
        },
        logout(state) {
            state.token = '';
            state.logined = false;
            window.localStorage.removeItem('login_token');
        }
    }
})

export default store;