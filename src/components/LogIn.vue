<!--  -->
<template>
  <div style="position:fixed; left:0px; top:48px; width:100%; height:100%;background: #222;">
    <div class="container form-regist">
      <form id="regist-form" autocomplete="off" method="get">
        <h3>登录</h3>
        <div class="input-group">
          <span class="input-group-addon">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
          <input type="text" class="form-control" placeholder="用户名" v-model="username" />
        </div>
        <div class="input-group">
          <span class="input-group-addon">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </span>
          <input type="password" class="form-control" placeholder="密码" v-model="password" />
        </div>
        <div class="form-group">
          <button type="submit" id="login_button" class="btn btn-primary" v-on:click="login">
            <i class="glyphicon glyphicon-ok"></i> 登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login(e) {
      this.$axios
        .get("/login", {
          params: {
            username: this.username,
            password: this.password
          }
        })
        .then(resp => {
          if (resp.data.result) {
            this.$store.commit("login", resp.data.token);
            const redirect = this.$route.params.redirect;
            if (redirect) this.$router.push(redirect);
            else this.$router.push("/");
          } else {
            alert("登录失败：" + resp.data.info);
          }
        })
        .catch(err => {
          alert("登录请求失败：" + err);
        });

      e.preventDefault();
    }
  }
};
</script>
<style scoped>
h3 {
  margin-top: 10%;
  color: white;
}

#regist-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-group {
  margin-top: 20px;
  margin-bottom: 20px;
}

@media (min-width: 800px) {
  #regist-form {
    width: 400px;
    float: right;
  }

  #login_button {
    float: right;
  }
}

@media (max-width: 799px) {
  #login_button {
    width: 100%;
  }
}
</style>
