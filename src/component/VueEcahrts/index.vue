<template>
    <div class="VueEcahrtsWrapper" id="VueEcahrtsWrapper">
    </div>
</template>

<script setup >
import { watch, onMounted, defineProps } from 'vue'
import echarts from 'echarts'
const props = defineProps({
    data: {
        type: Object
    }
})
let Dom = null;
let cahrts = null
watch(() => props.data.opstion, () => {
    cahrts.setOption(props.data.opstion)
    console.log("改变了")
})

onMounted(() => {
    Dom = document.getElementById("VueEcahrtsWrapper")
    cahrts = echarts.init(Dom, props.data.ThemeColor ? "null" : "null")
    cahrts.setOption(props.data.opstion)
    console.log(props.value)
})

</script>
<script>
export default {
    name: 'VueEcharts'  // 添加name属性
}
</script>
<style  lang="scss">
.VueEcahrtsWrapper {
    width: 100%;
    height: 100%;
}
</style>
