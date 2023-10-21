<template>
    <div>
        微信重定向
    </div>
</template>

<script setup lang="ts">
import { SET_TOKEN } from '@/utils/user';

import {useRoute} from 'vue-router'

let $route = useRoute();
SET_TOKEN(JSON.stringify($route.query))
// 此路有组件代码执行：授权成功
let html:any = document.querySelector('html')
html.style.display = 'none'
console.log($route.query)
</script>

<style scoped>

</style>