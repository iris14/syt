<template>
    <div class="region">
        <div class="content">
            <div class="left">地区:</div>
            <ul>
                <li :class="{active:activeFlag== ''}" @click="changeRegion('')">全部</li>
                <li v-for="(region, index) in RegionArr" :key="region.id" @click="changeRegion(region.value)"  :class="{active:activeFlag== region.value}">{{ region.name }}</li>
                
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reqHospitalLevelAndRegion} from '@/api/home'
import {onMounted, ref} from 'vue'
import type { HospitalLevelAndRegionResponseData, HospitalLevelAndRegionArr } from '../../../api/home/type';
// 地区组件挂在完毕获取地区数据
let RegionArr = ref<HospitalLevelAndRegionArr>([])
let activeFlag = ref<string>('')

    onMounted(() =>{
    getRegion()
})

const getRegion = async () =>{
    let result:HospitalLevelAndRegionResponseData = await reqHospitalLevelAndRegion("Beijin")
    if(result.code == 200){
        RegionArr.value = result.data
    }
    console.log("getRegion",result)
}

const changeRegion = (region:string) =>{
    activeFlag.value = region
    $emit('getRegion', region)
    // console.log(activeFlag)
}

let $emit = defineEmits(['getRegion'])
</script>

<script lang="ts">
export default{
    name:'region'
}
</script>

<style scoped lang="scss">
.region{
    color: #7f7f7f;
    margin-top: 10px;
    .content{
        display: flex;
        .left{
            margin-right: 10px;
            width: 46px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                margin-right: 10px;
                margin-bottom: 10px;
                &.active{
                    color:#55a6fe;
                }
            }
            li:hover{
                color:#55a6fe;
                cursor: pointer;
            }
        }
    }
}
</style>