import Vue from "vue";

import config from "./config";

import App from "./App";

let myconfig = {
    el: '#app',
    components: { App },
    template: '<App/>',
    created() {
        var token = window.localStorage.getItem('login_token');
        if (token == null || token == '')
            return;

        this.$axios.get('/login', {
            headers: {
                "Authorization": token
            }
        }).then(resp => {
            if (resp.data.result) {
                this.$store.commit("login", {
                    token: resp.data.token,
                    name: resp.data.name,
                    power: resp.data.power
                });
                this.$router.push('/');
            }
        })
    }
};

config(Vue, myconfig);

new Vue(myconfig).mou;