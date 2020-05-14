<template>
  <div>
    <top-header class="topBar"></top-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";


module.exports = {
  components: {
    "top-header": Header
  }
};
</script>

<style>
.topBar {
  margin-bottom: 80px;
}
</style>
