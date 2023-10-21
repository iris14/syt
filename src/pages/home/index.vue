<template>
  <div>
    <Carousel />
    <!-- 搜索医院的表单区 -->
    <Search />
    <el-row gutter="20">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!-- 显示地区的组件 -->
        <Region @getRegion="getRegion" />
        <!-- 显示医院的组件 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card
            class="item"
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
          />
          <!-- 分页器 -->
        </div>
        <el-empty description="暂无数据" v-else />
        <div>
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :background="true"
            layout=" prev, pager, next, jumper, sizes, total "
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { onMounted, ref } from "vue";
import { reqHospital } from "@/api/home";
// 轮播图
import Carousel from "./carousel/index.vue";
// 搜索框
import Search from "./search/index.vue";
// 等级组件
import Level from "./level/index.vue";
// 区域组件
import Region from "./region/index.vue";
// 医院组件
import Card from "./card/index.vue";
//引入右侧组件
import Tip from "./tip/index.vue";

import type { Content, HospitalResponseData } from "@/api/home/type";
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);

// 存储已有的医院数据
let hasHospitalArr = ref<Content>([]);
let total = ref<number>(0);
let hostype = ref<string>("");
let districtCode = ref<string>("");
// 组件挂载完毕发一次请求
onMounted(() => {
  getHospitalInfo();
});
// 获取医院数据
const getHospitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  if (result.code === 200) {
    hasHospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
  // console.log(result)
};
// 分页器页码发生变化
const currentChange = () => {
  getHospitalInfo();
};
const sizeChange = () => {
  getHospitalInfo();
};

const getLevel = (level) => {
  hostype.value = level;
  getHospitalInfo();
};

const getRegion = (region) => {
  districtCode.value = region;
  getHospitalInfo();
};
</script>

<style scoped lang="scss">
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0px;
  }
}
</style>
