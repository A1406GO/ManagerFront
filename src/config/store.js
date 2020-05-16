import vue from "vue";
import vuex from 'vuex'
import { satisfies } from "semver";

vue.use(vuex);


const store = new vuex.Store({
    state: {
        user: {
            logined: false,
            token: '',
            humanname: '',
            power: 0
        },
        closeHint: ''
    },
    mutations: {
        login(state, info) {
            state.user.token = info.token;
            state.user.humanname = info.name;
            state.user.power = info.power;

            state.user.logined = true;
            window.localStorage.setItem('login_token', info.token);
        },
        logout(state) {
            state.user.token = '';
            state.user.logined = false;
            state.user.humanname = '';
            window.localStorage.removeItem('login_token');
        },
        addCloseHint(state, hint) {
            state.closeHint = hint;
        },
        removeCloseHint(state) {
            state.closeHint = '';
        }
    }
})

window.addEventListener('beforeunload', (e) => {
    let hint = store.state.closeHint;
    if (hint) {
        (window.event || e).returnValue = hint;
        return hint;
    }
})

export default store;