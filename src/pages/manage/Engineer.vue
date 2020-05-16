<!--  -->
<template>
  <div style=" position:relative; ">
    <EngineerEditBox
      v-if="editMode"
      v-bind:update="updateMode"
      v-on:ok="updateUser"
      v-on:cancel=" editMode=false; "
      v-on:validID="validID"
      v-bind="boxUser"
    />
    <div class="page-header">
      <h2>工程师信息管理</h2>
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
            <th>姓名</th>
            <th>性别</th>
            <th>生日</th>
            <th>籍贯</th>
            <th>学历</th>
            <th>地址</th>
            <th>电话</th>
            <th>工龄</th>
            <th>基本薪水</th>
            <a class="btn btn-primary" v-on:click="showUserEditBox()">添加</a>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filterusers" :key="user.id">
            <td>{{ ('000' + user.id).slice(-4)}}</td>
            <td>{{user.name}}</td>
            <td>{{user.sex}}</td>
            <td>{{user.birthday.toLocaleDateString()}}</td>
            <td>{{user.education}}</td>
            <td>{{user.hometown}}</td>
            <td>{{user.address}}</td>
            <td>{{user.phoneNumber}}</td>
            <td>{{user.seniority}}</td>
            <td>{{user.wage}}</td>
            <!-- <router-link v-bind:to="'./edit/'+user.id" class="btn btn-default leftbtn">编辑</router-link> -->
            <button class="btn btn-warning" v-on:click="showUserEditBox(user.id)">编辑</button>
            <button class="btn btn-danger" v-on:click="deleteUsers(user.id)">删除</button>
          </tr>
        </tbody>
      </table>
    </div>
    <template v-if="modified">
      <button id="rightbtn" type="button" class="btn" @click="cancelSave">取消</button>
      <button id="rightbtn" type="button" class="btn btn-primary" @click="uploadSave">保存</button>
    </template>
  </div>
</template>

<script>
import EngineerEditBox from "../../components/EngineerEditBox";
import mapdiff from "../../utils/mapdiff";

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
      boxUser: {}
    };
  },
  methods: {
    fetchUsers() {
      this.$axios.get("engineer/get/").then(response => {
        var ru = this.rawusers;
        var tu = this.tmpusers;
        response.data.forEach(u => {
          u.birthday = new Date(u.birthday);
          ru.set(u.id, u);
          tu.set(u.id, { ...u });
        });
        this.modified = false;
        this.filterUsers();
      });
    },
    deleteUsers(id) {
      this.tmpusers.delete(id);
      this.modified = true;
      this.filterUsers();
    },
    filterUsers() {
      this.filterusers = [];
      this.tmpusers.forEach((v, k, map) => {
        if (
          this.filterInput == "" ||
          ("" + v.id).indexOf(this.filterInput) != -1 ||
          v.name.indexOf(this.filterInput) != -1
        ) {
          this.filterusers.push(v);
        }
      });
    },
    showUserEditBox(id) {
      if (id) {
        this.updateMode = true;
        this.boxId = id;
        this.boxUser = { ...this.tmpusers.get(id) };
      } else {
        this.updateMode = false;
      }
      this.editMode = true;
    },
    validID(arg) {
      if (this.tmpusers.has(parseInt(arg.id))) {
        arg.err = "编号不能重复";
      }
    },
    updateUser(user) {
      if (this.updateMode) {
        var u = this.tmpusers.get(user.id);
        for (let prop of Object.keys(u)) {
          u[prop] = user[prop];
        }
      } else {
        this.tmpusers.set(user.id, { ...user });
      }
      this.editMode = false;
      this.modified = true;
      this.filterUsers();
    },
    cancelSave() {
      var ru = this.rawusers;
      var tu = this.tmpusers;
      tu.clear();
      ru.forEach((v, k, map) => {
        tu.set(k, { ...v });
      });
      this.modified = false;
      this.filterUsers();
    },
    uploadSave() {
      var up = mapdiff(this.rawusers, this.tmpusers);
      this.$axios
        .post("engineer/datachange/", up)
        .then(resp => {
          if (resp.data.success) {
            alert("保存成功");
            this.fetchUsers();
          } else {
            alert("保存失败");
          }
        })
        .catch(err => {
          alert("保存请求失败");
          console.log(err);
        });
    }
  },
  watch: {
    filterInput() {
      this.filterUsers();
    },
    modified() {
      if (this.modified)
        this.$store.commit("addCloseHint", "用户修改尚未保存，确定要退出吗？");
      else this.$store.commit("removeCloseHint");
    }
  },
  created() {
    this.fetchUsers();
  },
  components: {
    EngineerEditBox
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