<template>
  <div class="dialog-container-query modal-float">
    <div class="modal-content">
      <div class="modal-header">
        <h4>修改用户信息</h4>
      </div>
      <div v-bind:class="['form-group' , helpText_id?'has-error':'']">
        <label for="idBox">用户ID</label>
        <input
          v-bind:disabled="update"
          type="ID"
          class="form-control"
          id="idBox"
          placeholder="用户ID"
          v-model="box_id"
        />
        <span v-if="helpText_id" class="help-block">{{ helpText_id }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_userName?'has-error':'']">
        <label for="usernameBox">用户名</label>
        <input type="text" class="form-control" id="usernameBox" placeholder="用户名" v-model="box_userName" />
        <span v-if="helpText_userName" class="help-block">{{ helpText_userName }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_password?'has-error':'']">
        <label for="passwordBox">密码</label>
        <input type="text" class="form-control" id="passwordBox" placeholder="密码" v-model="box_password" />
        <span v-if="helpText_password" class="help-block">{{ helpText_password }}</span>
      </div>
      <div v-bind:class="['form-group' , helpText_humanName?'has-error':'']">
        <label for="hnameBox">操作者</label>
        <input type="text" class="form-control" id="hnameBox" placeholder="操作者" v-model="box_humanName" />
        <span v-if="helpText_humanName" class="help-block">{{ helpText_humanName }}</span>
      </div>
    </div>
    <div class="modal-footer">
      <input
        class="btn btn-success"
        type="button"
        value="确定"
        v-bind:disabled="(helpText_id || helpText_userName || helpText_password || helpText_humanName)?true:false"
        @click="okHandle"
      />
      <input class="btn btn-danger" type="button" value="取消" @click="cancelHandle" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpText_id: "",
      helpText_userName: "",
      helpText_password: "",
      helpText_humanName: "",
      box_userName: "",
      box_id: "",
      box_password: "",
      box_humanName: ""
    };
  },
  props: {
    update: Boolean,
    id: Number,
    userName: String,
    password: String,
    humanName: String
  },
  methods: {
    okHandle() {
      this.$emit(
        "ok",
        this.box_id,
        this.box_userName,
        this.box_password,
        this.box_humanName
      );
    },
    cancelHandle() {
      this.$emit("cancel");
    }
  },
  watch: {
    update: {
      immediate: true,
      handler(val, oldVal) {
        this.box_id = this.id;
        this.box_userName = this.userName;
        this.box_password = this.password;
        this.box_humanName = this.humanName;
      }
    },
    box_id() {
      this.box_id = this.box_id.replace(/[^\d]/g, "");
      if (!this.box_id) this.helpText_id = "ID不能为空";
      else if (this.box_id.length > 4) this.helpText_id = "ID不能超过4位";
      else this.helpText_id = "";
    },
    box_userName() {
      if (!this.box_userName) this.helpText_userName = "用户名不能为空";
      else if (this.box_userName.length > 20)
        this.helpText_userName = "用户名长度不能超过20个字符";
      else this.helpText_userName = "";
    },
    box_password() {
      if (!this.box_password) this.helpText_password = "密码不能为空";
      else if (this.box_password.length < 6)
        this.helpText_password = "密码长度不能少于6个字符";
      else if (this.box_password.length > 20)
        this.helpText_password = "密码长度不能超过20个字符";
      else this.helpText_password = "";
    },
    box_humanName() {
      if (!this.box_humanName) this.helpText_humanName = "操作者不能为空";
      else if (this.box_humanName.length > 20)
        this.helpText_humanName = "操作者长度不能超过20个字符";
      else this.helpText_humanName = "";
    }
  }
};
</script>

<style scoped>
p,
h4 {
  margin: 0;
}
.modal-float {
  float: left;
  position: absolute;
  width: 100%;
}
.modal-header {
  color: #fff;
  background: #337ab7;
  border-radius: 6px 6px 0 0;
  padding: 15px;
  border-bottom: 1px solid #5e9fa1;
}
.modal-content div {
  padding: 15px 10px;
}
.modal-footer {
  padding: 15px;
  text-align: right;
  border-top: 1px solid #e5e5e5;
}
</style>