<template>
  <div class="hospital">
    <!-- 左侧 -->
    <div class="menu">
        <div class="top">
            <el-icon><HomeFilled /></el-icon>
            <span>/ 医院详情</span>
        </div>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/hospital/register"
          @click="changeActive('/hospital/register')"
        >
          <el-icon><icon-menu /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
          <el-icon><setting /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
          <el-icon><InfoFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧 -->
    <div class="content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// 左侧图标
import {  Document,  Menu as IconMenu,  Location,  Setting, InfoFilled, Search, HomeFilled} from "@element-plus/icons-vue";
import {useRoute, useRouter} from 'vue-router'
import {onMounted} from 'vue';
import useDetailStore from '@/store/modules/hospitalDetail'
let $route = useRoute();
let $router = useRouter();
let detailStore = useDetailStore();
// 组件挂在完毕，通知仓库发请求获取医院详情数据，存储仓库中
onMounted(()=>{
  // 获取医院详情
  detailStore.getHospital($route.query.hoscode as string);
  // 医院科室
  detailStore.getDeparment($route.query.hoscode as string)
})

//左侧菜单点击事件的回调
const changeActive = (path: string) => {
  //跳转到对应二级路由
  $router.push({ path, query: { hoscode: $route.query.hoscode } });
};
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  // justify-content: space-between;
  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top{
        color: #7f7f7f;
    }
  }
  .content {
    flex: 8;
  }
}
</style>
