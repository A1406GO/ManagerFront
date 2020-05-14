import Vue from "vue";

import config from "./config";

import App from "./App";

let myconfig = {
    el: '#app',
    components: { App },
    template: '<App/>'
};

config(Vue, myconfig);

new Vue(myconfig);