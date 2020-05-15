<template>
  <div>
    <div class="side">
      <Slide class="side__bar"></Slide>
    </div>
    <div class="col-sm-9 col-md-10 main">
      <router-view></router-view>
    </div>
    <!-- <Content  class="ide__contents"></Content> -->
  </div>
</template>

<script>
import Slide from "../components/Slide";

export default {
  components: {
    Slide
  }
};
</script>
  
<style scoped>
</style>
