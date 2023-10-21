<template>
    <div>
        <span>获取验证码（{{ time }}）</span>
    </div>
</template>

<script setup lang="ts">
import { ref,watch } from 'vue';
let time = ref<number>(5);

watch(
    ()=> props.flag,
    ()=>{
            //开启定时器
            let timer = setInterval(()=>{
                time.value--
                console.log(time.value)
                if(time.value == 0){
                    // 通知父组件倒计时结束
                    $emit('getFlag', false)
                    clearInterval(timer)
                }
            }, 1000)
    },
    {
        immediate:true
    }
);
let props = defineProps(['flag'])
let $emit = defineEmits(['getFlag']);
</script>

<style scoped>

</style>