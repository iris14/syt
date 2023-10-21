<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
        <p>尚医通 预约挂号统一平台</p>
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!UserStore.userInfo.name">登录</p>
        <el-dropdown v-else>
          <span class="el-dropdown-link">
            {{ UserStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ArrowDown} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
// 获取user仓库数据，visible控制组件的显示隐藏
import useUserStore from "@/store/modules/user";

let UserStore = useUserStore();

let $router = useRouter();
const goHome = () => {
  $router.push({ path: "/home" });
};

// 点登录和注册按钮的时候出现对话框
const login = () => {
  UserStore.visible = true;
};

// 退出登录按钮的回调
const logout = () =>{
  // 通知仓库退出
  UserStore.logout()
  $router.push({path:'/home'})
}

// 下拉蔡澜路由跳转
const goUser = (path:string) =>{
  $router.push({path:path})
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  // background: #fff;
  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    height: 70px;
    background: white;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #55a6fe;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #ccc;
      .help {
        margin-right: 10px;
      }
    }
  }
}
</style>
