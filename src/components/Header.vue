<template>
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/" class="navbar-brand">客户管理系统</router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <template v-if="user.logined">
              <li>
                <a>你好,{{ user.humanname }}</a>
              </li>
              <li>
                <a v-on:click="logout" href="/">登出</a>
              </li>
            </template>
            <template v-if="!user.logined">
              <li>
                <router-link to="/logIn">登录</router-link>
              </li>
              <li>
                <router-link to="/register">注册</router-link>
              </li>
            </template>
            <li>
              <router-link to="/about">关于项目</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import vuex, { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(["logout"])
  }
};
</script>

<style scoped>
</style>
