<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <!-- 卡片  显示就诊人信息 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser"
            >添加就诊人</el-button
          >
        </div>
      </template>

      <!-- 卡片的身体部分展示就诊人信息-->
      <div class="user">
        <Visitor v-for="(user, index) in userArr" :key="user.id" class="item" :user="user" @click="changeIndex(index)" :index="index"  :currentIndex="currentIndex"/>
      </div>
    </el-card>
    <!-- 展示医生的信息 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期：</div>
          </template>
          {{docInfo.workDate}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院：</div>
          </template>
          {{docInfo.param?.hosname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室：</div>
          </template>
          {{docInfo.param?.depname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名：</div>
          </template>
          {{docInfo.docname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称：</div>
          </template>
          {{docInfo.title}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长：</div>
          </template>
          {{docInfo.skill}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务费：</div>
          </template>
          <span style="color:red">{{docInfo.amount}}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 确定按钮 -->
    <div class="btn">
        <el-button type="primary" size="default" :disabled="currentIndex==-1?true:false" @click="submitOrder">确认挂号</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { User } from "@element-plus/icons-vue";
import { reqSubmitOrder } from "@/api/user";
import type {SubmitOrder} from './type'
// 就诊人组件
import {reqGetUser, reqDoctorInfo} from '@/api/hospital'
import type {UserArr, DoctorInfoData, Doctor} from '@/api/hospital/type'
import {useRoute, useRouter} from 'vue-router'
// @ts-ignore
import {ElMessage} from 'element-plus'
// 获取路由对象
let $route = useRoute();
let $router = useRouter();
let userArr = ref<UserArr>([])
let docInfo = ref<Doctor>({})
let currentIndex = ref<number>(-1) //存储用户确定就诊人的索引值
// 组件加载完毕获取数据
onMounted(()=>{
  // 获取就诊人信息
  fetchUserData()
  // 获取医生信息
  fetchInfo()
})
// 获取就诊人信息
const fetchUserData = async () =>{
  let result:UserResponseData = await reqGetUser();
  if(result.code == 200){
    userArr.value = result.data
  }
  console.log('fetchUserData', result)
}
// 获取医生信息
const fetchInfo = async () =>{
  let result:DoctorInfoData = await reqDoctorInfo($route.query.docId as string)
  if(result.code == 200){
    docInfo.value = result.data
  }
}

// 点击就诊人子组件的回调
const changeIndex = (index:number) =>{
  // 存储用户选择的就诊人索引值
  currentIndex.value = index
}

// 提交创建订单
const submitOrder =  async () =>{
  let hoscode = docInfo.value.hoscode
  let scheduleId = docInfo.value.id
  let patientId = userArr.value[currentIndex.value].id
  let result:SubmitOrder = await reqSubmitOrder(hoscode, scheduleId, patientId)
  if(result.code == 200){
    $router.push({path:'/user/order', query:{orderId:result.data}})
  }else{
    ElMessage({
      type:'error',
      message:result.message
    })
  }
}

// 预约挂号添加就诊人按钮
const goUser = ()=>{
  $router.push({path:'/user/patient', query:{type:'add'}})
}

</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f7f;
    font-size: 20px;
  }
  .box-card {
    margin: 20px 0px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }
  .btn{
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }
}
</style>
