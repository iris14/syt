<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />
    <!-- 展示路由组件的区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <!-- 登录组件 -->
    <Login v-if="UserStore.visible"/>
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/requests'
import { onMounted } from 'vue';
import useUserStore from "@/store/modules/user";
let UserStore = useUserStore();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 80px;
    width: 1200px;
    min-height: 1300px;
    // background: red;
  }
  .bottom{
    width: 100%;
    height: 50px;
    // background: cyan;
  }
}
</style>
