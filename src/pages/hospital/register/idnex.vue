<template>
  <div class="register">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1697381963254"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4044"
          width="16"
          height="16"
        >
          <path
            d="M102.4 880.64c-57.344 0-102.4-45.056-102.4-102.4V409.6c0-57.344 45.056-102.4 102.4-102.4s102.4 45.056 102.4 102.4v368.64c0 57.344-45.056 102.4-102.4 102.4z m0-491.52c-10.24 0-20.48 10.24-20.48 20.48v368.64c0 10.24 10.24 20.48 20.48 20.48s20.48-10.24 20.48-20.48V409.6c0-10.24-10.24-20.48-20.48-20.48z"
            fill="#E5BD41"
            p-id="4045"
          ></path>
          <path
            d="M829.44 921.6H450.56c-90.112 0-163.84-73.728-163.84-163.84V512c0-90.112 73.728-163.84 163.84-163.84h30.72c22.528 0 40.96 18.432 40.96 40.96s-18.432 40.96-40.96 40.96H450.56c-45.056 0-81.92 36.864-81.92 81.92v245.76c0 45.056 36.864 81.92 81.92 81.92h378.88c45.056 0 81.92-36.864 81.92-81.92v-4.096L942.08 468.992c0-18.432-4.096-38.912-81.92-38.912h-153.6c-22.528 0-40.96-18.432-40.96-40.96s18.432-40.96 40.96-40.96H860.16c108.544 0 163.84 40.96 163.84 122.88v4.096l-30.72 284.672c-2.048 90.112-73.728 161.792-163.84 161.792z"
            fill="#333333"
            p-id="4046"
          ></path>
          <path
            d="M696.32 430.08c-18.432 0-34.816-12.288-38.912-30.72l-34.816-143.36v-2.048c-8.192-40.96-40.96-69.632-81.92-69.632-6.144 0-10.24 2.048-12.288 6.144-2.048 2.048-4.096 6.144-6.144 8.192l10.24 188.416c2.048 22.528-16.384 40.96-38.912 43.008-22.528 2.048-40.96-16.384-43.008-38.912l-12.288-202.752c0-10.24 2.048-20.48 10.24-28.672 4.096-6.144 10.24-18.432 20.48-28.672 20.48-18.432 45.056-28.672 71.68-28.672 79.872 0 147.456 57.344 161.792 135.168l34.816 141.312c6.144 22.528-8.192 45.056-30.72 49.152-4.096 2.048-6.144 2.048-10.24 2.048zM479.232 145.408h8.192-10.24 2.048z"
            fill="#333333"
            p-id="4047"
          ></path>
        </svg>
        {{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img
          :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
          alt=""
        />
      </div>
      <div class="right">
        <div>挂号规则</div>
        <div class="time">
          预约周期：{{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天
          放号时间：{{
            hospitalStore.hospitalInfo.bookingRule?.releaseTime
          }}
          停挂时间：{{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
        </div>
        <div class="address">
          具体位置：
          {{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          规划路线: {{ hospitalStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="releasetime">
          退号时间：就诊前一工作日{{
            hospitalStore.hospitalInfo.bookingRule?.quitTime
          }}前取消
        </div>
        <div class="rule">医院预约规则</div>
        <div
          class="ruleInfo"
          v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule"
          :key="index"
        >
          {{ item }}}
        </div>
      </div>
    </div>
    <!-- 科室数据 -->
    <div class="deparment">
      <div class="leftNav">
        <ul>
          <li
            @click="changeIndex(index)"
            v-for="(deparment, index) in hospitalStore.deparmentArr"
            :key="deparment.depcode"
            :class="{ active: index == currentIndex }"
          >
            {{ deparment.depname }}
          </li>
        </ul>
      </div>
      <div class="deparmentInfo">
        <!-- 大科室和小科室 -->

        <div
          class="showDeparment"
          v-for="deparment in hospitalStore.deparmentArr"
          :key="deparment.depcode"
          
        >
          <h1 class="cur">{{ deparment.depname }}</h1>
          <!-- 每个大科室下的小科室 -->
          <ul>
            <li v-for="item in deparment.children" :key="item.depcode" @click="showLogin(item)">
              {{ item.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useRouter, useRoute} from 'vue-router'
// 引入医院详情数据
import useDetailStore from "@/store/modules/hospitalDetail";
// 获取user仓库数据，visible控制组件的显示隐藏
// import useUserStore from "@/store/modules/user";
// let UserStore = useUserStore();

let hospitalStore = useDetailStore();
//
let currentIndex = ref<number>(0);

let $route = useRoute();
let $router = useRouter()
const changeIndex = (index: number) => {
  currentIndex.value = index;
  // 点击导航获得右侧科室
  let allH1 = document.querySelectorAll(".cur");
  console.log(allH1);
  // 滚动到指定位置
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth", //过度动画效果
    block: "start",
  });
};
//  
const showLogin = (item:any) => {
  // UserStore.visible = true;
  // 点击某科室按钮进入挂号详情页面
  $router.push({path:'/hospital/register_step1', query:{hoscode:$route.query.hoscode, depcode:item.depcode}})
};
</script>

<style scoped lang="scss">
.register {
  .top {
    display: flex;
    .title {
      font-size: 30px;
      font-weight: 900;
    }
    .level {
      color: #7f7f7f;
      margin-left: 10px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      span {
        margin-left: 5px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 20px;
    .left {
      width: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      font-size: 15px;
      margin-left: 20px;
      .time,
      .address,
      .route,
      .releasetime,
      .ruleInfo {
        margin-top: 10px;
        color: #7f7f7f;
      }
      .rule {
        margin: 10px 0;
      }
    }
  }
  .deparment {
    width: 100%;
    height: 500px;
    display: flex;
    margin-top: 20px;
    .leftNav {
      width: 80px;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        background: rgb(248, 248, 248);
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          text-align: center;
          color: #7f7f7f;
          font-size: 14px;
          line-height: 30px;
          &.active {
            border-left: 1px solid red;
            color: red;
            background: white;
          }
        }
      }
    }
    .deparmentInfo {
      flex: 1;
      margin-left: 20px;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .showDeparment {
      h1 {
        background: rgb(248, 248, 248);
        color: #7f7f7f;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          color: #7f7f7f;
          width: 33%;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
