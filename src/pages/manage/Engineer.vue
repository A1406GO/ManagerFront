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
      <a class="btn btn-default" @click="downloadEngineers">导出工程师信息</a>
    </form>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="cursor:pointer;" @click="order = 'id'">
              编号
              <i v-if="order=='id'" class="fa fa-chevron-up" aria-hidden="true" />
            </th>
            <th style="cursor:pointer;" @click="order = 'name'">
              姓名
              <i v-if="order=='name'" class="fa fa-chevron-up" aria-hidden="true" />
            </th>
            <th>性别</th>
            <th>生日</th>
            <th>籍贯</th>
            <th>学历</th>
            <th>地址</th>
            <th>电话</th>
            <th style="cursor:pointer;" @click="order = 'seniority'">
              工龄
              <i v-if="order=='seniority'" class="fa fa-chevron-down" aria-hidden="true" />
            </th>
            <th>基本薪水</th>
            <a class="btn btn-primary" v-on:click="showUserEditBox">添加</a>
            <a class="btn btn-danger" v-on:click="deleteAllUsers">删除所有</a>
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
            <button class="btn btn-info" v-on:click="calSalary(user.wage)">薪水</button>
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
import vue from "vue";
import EngineerEditBox from "../../components/EngineerEditBox";
import mapdiff from "../../utils/mapdiff";
import { downloadEngineer } from "../../utils/download";
import calSalaryBox from "../../components/CalSalaryBox";

let calSalaryBoxClass = vue.extend(calSalaryBox);

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
      order: "id",
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
      if (!confirm("确定要删除此用户信息吗？")) return;
      this.tmpusers.delete(id);
      this.modified = true;
      this.filterUsers();
    },
    deleteAllUsers() {
      if (!confirm("确定要删除所有用户信息吗？")) return;
      this.tmpusers.clear();
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

      var sortfunc;
      switch (this.order) {
        case "id":
          sortfunc = (a, b) => {
            if (parseInt(a.id) < parseInt(b.id)) return -1;
            return 1;
          };
          break;
        case "name":
          sortfunc = (a, b) => {
            if (a.name == b.name) return a.id < b.id ? -1 : 1;
            else if (a.name < b.name) return -1;
            return 1;
          };
          break;
        case "seniority":
          sortfunc = (a, b) => {
            if (parseInt(a.seniority) == parseInt(b.seniority))
              return a.id < b.id ? -1 : 1;
            else if (parseInt(a.seniority) > parseInt(b.seniority)) return -1;
            return 1;
          };
          break;
      }
      this.filterusers.sort(sortfunc);
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
    },
    calSalary(wage) {
      var box = new calSalaryBoxClass();
      box.wage = wage;
      $("body").append(`<div id="calSalaryBox"></div>`);
      //挂载
      box.$mount("#calSalaryBox");
    },
    downloadEngineers() {
      downloadEngineer(this.filterusers);
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
    },
    order() {
      this.filterUsers();
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
.btn {
  margin: 2px;
}

#rightbtn {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}
</style>