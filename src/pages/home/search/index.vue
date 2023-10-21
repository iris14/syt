<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院名称:"
      class="form"
      v-model="hosname"
      :fetch-suggestions="fetchData"
      trigger-on-focus="false"
      @select="goDetail"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
  </div>
</template>

<script setup lang="ts">
// 引入element-plus的icon
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { reqHospitalInfo } from "../../../api/home";
import type { HospitalInfo, Content } from "../../../api/home/type";
// 创建路由器对象
let $router = useRouter();
// shouji搜索的关键字
let hosname = ref<string>("");
// 深度选择器: >>> /deep/   ::v-deep

const fetchData = async (keyword: string, cb: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  console.log("fetchData", result);
  // 整理数据成所需要格式
  if (result.code == 200) {
    let showData = result.data.map((item) => {
      return {
        value: item.hosname,
        hoscode: item.hoscode,
      };
    });
    cb(showData);
  }
};

// 点击某一个推荐项
const goDetail = (item)=>{
  // 进入到详情页，需携带query参数
  $router.push({path:'/hospital/register', query:{hoscode:item.hoscode}})
}
</script>

<script lang="ts">
export default {
  name: "Search",
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  // background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  ::v-deep(.el-input__wrapper) {
    width: 600px;
    margin-right: 10px;
  }
}
</style>
