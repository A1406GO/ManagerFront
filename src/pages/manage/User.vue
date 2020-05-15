<!--  -->
<template>
  <div style=" position:relative; ">
    <UserEditBox
      v-if="editMode"
      v-bind:update="updateMode"
      v-on:ok="updateUser"
      v-on:cancel=" editMode=false; "
      v-bind="boxUser"
    />
    <div class="page-header">
      <h2>用户信息管理</h2>
    </div>
    <form class="form-inline">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="筛选条件" v-model="filterInput" />
      </div>
    </form>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>编号</th>
            <th>用户名</th>
            <th>密码</th>
            <th>操作者</th>
            <a class="btn btn-primary" v-on:click="showUserEditBox()">添加</a>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filterusers" :key="user.id">
            <td>{{ ('000' + user.id).slice(-4)}}</td>
            <td>{{user.userName}}</td>
            <td>{{user.password}}</td>
            <td>{{user.humanName}}</td>
            <!-- <router-link v-bind:to="'./edit/'+user.id" class="btn btn-default leftbtn">编辑</router-link> -->
            <button class="btn btn-warning" v-on:click="showUserEditBox(user.id)">编辑</button>
            <button class="btn btn-danger" v-on:click="deleteUsers(user.id)">删除</button>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="modified">
      <button id="rightbtn" type="button" class="btn" @click="cancelSave">取消</button>
      <button id="rightbtn" type="button" class="btn btn-primary">保存</button>
    </template>
  </div>
</template>

<script>
import UserEditBox from "../../components/UserEditBox";

export default {
  data() {
    return {
      rawusers: new Map(),
      tmpusers: new Map(),
      filterusers: [],
      filterInput: "",
      editMode: false,
      updateMode: true,
      modified: false,
      boxId: 0,
      boxUser: {
        id: 0,
        userName: "",
        password: "",
        humanName: ""
      }
    };
  },
  methods: {
    fetchUsers() {
      this.$axios.get("user/get/").then(response => {
        var ru = this.rawusers;
        var tu = this.tmpusers;
        response.data.forEach(u => {
          ru.set(u.id, u);
          tu.set(u.id, { ...u });
        });
        this.filterUsers();
      });
    },
    deleteUsers(id) {
      this.tmpusers.delete(id);
    },
    filterUsers() {
      this.filterusers = [];
      this.tmpusers.forEach((v, k, map) => {
        if (
          this.filterInput == "" ||
          v.id == this.filterInput ||
          v.userName == this.filterInput
        ) {
          this.filterusers.push(v);
        }
      });
      return this.filterusers;
    },
    showUserEditBox(id) {
      if (id) {
        this.updateMode = true;
        this.boxId = id;
        this.boxUser = { ...this.rawusers.get(id) };
      } else {
        this.updateMode = false;
      }
      this.editMode = true;
    },
    updateUser(id, userName, password, humanName) {
      if (this.updateMode) {
        var u = this.tmpusers.get(id);
        u.userName = userName;
        u.password = password;
        u.humanName = humanName;
      } else {
        this.tmpusers.set(id, {
          id,
          userName,
          password,
          humanName
        });
      }
      this.editMode = false;
      this.filterUsers();
    },
    cancelSave() {
      var ru = this.rawusers;
      var tu = this.tmpusers;
      tu.clear();
      ru.forEach((v, k, map) => {
        tu.set(k, { ...v });
      });
      this.filterUsers();
    }
  },
  watch: {
    filterInput() {
      this.filterUsers();
    },
    tmpusers() {
      modified = true;
    }
  },
  created() {
    this.fetchUsers();
  },
  components: {
    UserEditBox
  }
};
</script>
<style  scoped>
#rightbtn {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>