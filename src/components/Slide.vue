<template>
  <div class="col-sm-3 col-md-2 sidebar">
    <ul v-for="item in items" :key="item.id" class="nav nav-sidebar">
      <li class="active">
        <a v-bind:href="'#'+item.id" class="collapsed" data-toggle="collapse">
          <i v-bind:class="'glyphicon glyphicon-'+item.icon"></i>
          {{ item.name }}
          <span class="sr-only">(current)</span>
          <span class="pull-right glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul v-once v-bind:id="item.id" class="nav collapse">
          <li v-for="it in item.items" :key="it.to">
            <router-link v-bind:to="it.to">{{ it.name }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <ul class="nav nav-sidebar">
      <li class="active">
        <a href="#user" class="collapsed" data-toggle="collapse">
          <i class="glyphicon glyphicon-user"></i>用户管理
          <span class="sr-only">(current)</span>
          <span class="pull-right glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul id="user" class="nav collapse">
          <li>
            <router-link to="/add">添加用户</router-link>
          </li>
          <li>
            <router-link to="/Content">查询用户信息</router-link>
          </li>
          <li>
            <a href>编辑用户信息</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav nav-sidebar">
      <li>
        <a href="#menu" class="collapsed" data-toggle="collapse">
          <i class="glyphicon glyphicon-th-list"></i>菜单管理
          <span class="pull-right glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul id="menu" class="nav collapse">
          <li>
            <a href>在线统计</a>
          </li>
          <li>
            <a href>权限管理</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav nav-sidebar">
      <li>
        <a href="#actor" class="collapsed" data-toggle="collapse">
          <i class="glyphicon glyphicon-asterisk"></i>角色管理
          <span class="pull-right glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul id="actor" class="nav collapse">
          <li>
            <a href>部门管理</a>
          </li>
          <li>
            <a href>职称管理</a>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="nav nav-sidebar">
      <li>
        <a href="#sys" class="collapsed" data-toggle="collapse">
          <i class="glyphicon glyphicon-cog"></i>系统管理
          <span class="pull-right glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul id="sys" class="nav collapse">
          <li>
            <a href="#">
              <i class="glyphicon glyphicon-edit"></i>修改密码
            </a>
          </li>
          <li>
            <a href="#">
              <i class="glyphicon glyphicon-eye-open"></i>日志查看
            </a>
          </li>
        </ul>
      </li>
    </ul>-->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    let data = {
      items: [
        {
          id: "user",
          name: "信息管理",
          icon: "user",
          items: []
        }
      ]
    };

    let user = this.$store.state.user;

    switch (user.power) {
      case 1:

      case 2: {
        data.items[0].items.push({
          to: "/manage/user",
          name: "用户管理"
        });
        break;
      }
    }

    return data;
  }
};
</script>

<style scoped>
.glyphicon {
  margin-right: 2px;
}
</style>

