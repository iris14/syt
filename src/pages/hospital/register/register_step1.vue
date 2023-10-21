<template>
  <div class="wrap">
    <!-- 顶部结构 -->
    <div class="top">
      <div class="hosname">{{ workData.baseMap?.hosname }}</div>
      <div class="line"></div>
      <div>{{ workData.baseMap?.bigname }}</div>
      <div class="dot">.</div>
      <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
    </div>
    <!-- 中间展示日期的结构 -->
    <div class="center">
      <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
      <div class="container">
        <div
          class="item"
          :class="{ active: item.status == -1 || item.availableNumber == -1, cur:item.workDate == workTime.workDate }"
          v-for="item in workData.bookingScheduleList"
          :key="item"
          @click="changeTime(item)"
        >
          <div class="top1">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
          <div class="bottom">
            <div v-if="item.status == -1">停止挂号</div>
            <div v-if="item.status == 0">
              {{
                item.availableNumber == -1
                  ? "约满了"
                  : `有号（${item.availableNumber}）`
              }}
            </div>
            <div v-if="item.status == 1">即将放号</div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        layout="prev, pager, next"
        :total="workData.total"
        @update:current-page="fetchWorkData"
      />
    </div>
    <!-- 底部展示医生的结构 -->
    <div class="bottom">
      <!-- 展示即将放号的时间 -->
      <div class="will" v-if="workTime.status == 1">
        <span class="time">2023年8月30日 08：30</span>
        <span class="willText">放号 </span>
      </div>
      <!-- 展示医生结构：上午、下午 -->
      <div class="doctor" v-else>
        <!-- 上午 -->
        <div class="morning">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg
              t="1697526777921"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5583"
              width="32"
              height="32"
            >
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#1296db"
                p-id="5584"
              ></path>
            </svg>
            <span class="text">上午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="doc_info" v-for="doctor in moringArr" :key="doctor.id">
            <!-- name -->
            <div class="left">
              <div class="info">
                <span>{{doctor.title}}</span>
                <span>|</span>
                <span>{{doctor.docname}}</span>
              </div>
              <div class="skill">
                {{doctor.skill}}
              </div>
            </div>
            <!-- price -->
            <div class="right">
                <div class="money">￥{{ doctor.amount }}</div>
                <el-button type="primary" size="default" @click="goStep2(doctor)">{{doctor.availableNumber}}</el-button>
            </div>
          </div>
        </div>
        <!-- 下午 -->
        <div class="morning">
          <!-- 顶部文字提示 -->
          <div class="tip">
            <svg t="1697528036331" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7435" width="32" height="32"><path d="M827.3 706H662.8c-27.6 0-50-22.4-50-50V497.2c0-27.6 22.4-50 50-50h164.5c53.9 0 97.8 43.9 97.8 97.8v63.1c0.1 54-43.8 97.9-97.8 97.9z m-154.5-60h154.5c20.9 0 37.8-17 37.8-37.8v-63.1c0-20.9-17-37.8-37.8-37.8H672.8V646z" fill="#1296db" p-id="7436"></path><path d="M584.7 842.7H387.3c-114.7 0-208.5-93.8-208.5-208.5V399.3c0-11 9-20 20-20h574.4c11 0 20 9 20 20v234.9c0 114.6-93.8 208.5-208.5 208.5zM485.5 313.2c-16.6 0-30-13.4-30-30V133.4c0-16.6 13.4-30 30-30s30 13.4 30 30v149.8c0 16.5-13.5 30-30 30zM325.9 313.2c-16.6 0-30-13.4-30-30v-79.8c0-16.6 13.4-30 30-30s30 13.4 30 30v79.8c0 16.5-13.4 30-30 30zM645 313.2c-16.6 0-30-13.4-30-30v-79.8c0-16.6 13.4-30 30-30s30 13.4 30 30v79.8c0 16.5-13.5 30-30 30z" fill="#1296db" p-id="7437"></path><path d="M486 526.3c-25.6-25.6-67.2-25.4-92.5 0.6-24.9 25.6-24 66.7 1.3 92l64.5 64.5c14.8 14.8 38.7 14.8 53.5 0l64.5-64.5c25.3-25.3 26.2-66.4 1.3-92-25.4-26-67-26.2-92.6-0.6z" fill="#1296db" p-id="7438"></path></svg>
            <span class="text">下午号源</span>
          </div>
          <!-- 医生信息 -->
          <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
            <!-- name -->
            <div class="left">
              <div class="info">
                <span>{{doctor.title}}</span>
                <span>|</span>
                <span>{{doctor.docname}}</span>
              </div>
              <div class="skill">
                {{doctor.skill}}
              </div>
            </div>
            <!-- price -->
            <div class="right">
                <div class="money">￥{{doctor.amount}}</div>
                <el-button type="primary" size="default" @click="goStep2(doctor)">{{doctor.availableNumber}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital";
import { useRoute, useRouter } from "vue-router";
import type {
  Doctor,
  DocArr,
  HospitalWordData,
  DoctorResponseData,
} from "@/api/hospital/type";
let $route = useRoute();
let $router = useRouter();
let pageNo = ref<number>(1);
let limit = ref<number>(6);
let workData = ref<any>({});
let workTime:any = ref<any>({});
let docArr = ref<DocArr>([]);
let moringArr = computed(()=>{
    return docArr.value.filter((doc:Doctor) =>{
        return doc.workTime == 0
    })
})
let afterArr = computed(()=>{
    return docArr.value.filter((doc:Doctor) =>{
        return doc.workTime == 1
    })
})
onMounted(() => {
  fetchWorkData();
});
// 获取挂号shuju
const fetchWorkData = async () => {
  let result: HospitalWorkData = await reqHospitalWork(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (result.code == 200) {
    // 存储医院挂号数据
    workData.value = result.data;
    // 排班日期的第一个
    workTime.value = workData.value.bookingScheduleList[0];
    // 获取医生的数组
    getDoctorWorkData()
  }
  console.log("fetchWorkData", result);
};
// 获取医生排版数据
const getDoctorWorkData = async ()=>{
    // 医院的编号
    let hoscode:string = $route.query.hoscode as string;
    // 科室的编号
    let depcode:string = $route.query.depcode as string;
    // 时间
    let workDate:string = workTime.value.workDate as string

    let result:any = await reqHospitalDoctor(hoscode,depcode,workDate)
    if(result.code == 200){
        docArr.value = result.data
    }
    // console.log('getDoctorWorkData', result)
}
// 点击顶部某一天
const changeTime = (item:any)=>{
    console.log('item', item)
    // 存储选中日期
    workTime.value = item
    getDoctorWorkData()
}

//路由跳转进入到选择就诊人页面
const goStep2 = (doctor: Doctor) => {
  //编程式导航进行路由跳转且携带医生的ID
  $router.push({ path: "/hospital/register_step2", query: { docId: doctor.id } });
};
</script>

<style scoped lang="scss">
.wrap {
  .top {
    display: flex;
    color: #7f7f7f;
    .line {
      width: 2px;
      background: #7f7f7f;
      height: 20px;
      margin: 0px 10px;
    }
    .dot {
      margin: 0 10px;
      color: skyblue;
    }
  }
  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
      font-weight: 900;
    }
    .container {
      width: 100%;
      display: flex;
      margin: 30px 0;
      .item {
        flex: 1;
        width: 100%;
        border: 1px solid skyblue;
        margin: 0px 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.5s;
        &.active {
          border: 1px solid #7f7f7f;
          .top1 {
            background: #ccc;
            color: #7f7f7f;
          }
        }
        &.cur{
            transform: scale(1.05);
        }
        .top1 {
          background: #e8f2ff;
          height: 30px;
          width: 100%;
          text-align: center;
          line-height: 30px;
        }
        .bottom {
          width: 100%;
          height: 60px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }
  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
    }
    .time {
      color: skyblue;
    }
    .willText {
      color: #7f7f7f;
    }
    .doctor {
      .morning {
        .tip {
          display: flex;
          align-items: center;
          .text {
            color: #7f7f7f;
            font-weight: 900;
          }
        }
        .doc_info {
          display: flex;
          justify-content: space-between;
          margin: 5px 10px;
          border-bottom: 1px solid #ccc;
          .left{
            .info{
                color: skyblue;
                margin: 10px 0px;
                span{
                    margin: 0px 5px;
                    font-size: 20px;
                    font-weight: 900;
                }
            }
            .skill{
                margin: 10px 0px;
                color: #7f7f7f;
                font-size: 16px;
            }
          }
          .right{
            width: 150px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money{
                color: #7f7f7f;
                font-weight: 900;
            }
          }
        }
      }
    }
  }
}
</style>
