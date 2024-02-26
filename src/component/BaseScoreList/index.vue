<template>
    <div class="BaseScorelist" :id="ID">
        <div class="TabelHeaderWrapper">
            <div class="TabelHeader" :style="{
                backgroundColor: props.config.headerBGC,
                height: `${props.config.headerHeight}px`,
                fontSize: `${props.config.headerFontSize}px`,
                color: `${props.config.headerColor}`
            }">
                <template v-for="(item, index) in HEADERDATA">
                    <div class="HeaderItem" :style="{ ...HEADERSTYLE[index], width: `${AVERAGEWIDTH[index]}px` }"
                        :align="ALINGS[index]">
                        {{ item }}
                    </div>
                </template>
            </div>
        </div>
        <div class="TabelColumWrapper">
            <template v-for="(item, index) in CURRENTDATA" :key="item.ROWindex">
                <div class="Colum headertext"
                    :style="{ backgroundColor: item.ROWindex % 2 === 0 ? ODDROWBGC : EVENROWBGC, lineHeight: `${COLUMNHEIGHT[index]}px`, height: `${COLUMNHEIGHT[index]}px` }">
                    <template v-for="(iten, index) in item.data" :key="index+iten">
                        <div class="item headertext" :align="ALINGS[index]"
                            :style="{ width: `${AVERAGEWIDTH[index]}px`, ...COLUMSTYLE[index], fontSize: `${props.config.columnFontSize}px`, }"
                            v-html="iten">
                        </div>
                    </template>
                </div>
            </template>


        </div>
    </div>
</template>

<script setup >
import { onMounted, ref, defineProps, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import init from '../../hooks/useScreen'
import cloneDeep from 'loadsh/cloneDeep'
const ID = `BaseScorelist+${uuidv4()}`
const { width, height } = init(ID)
// 处理后的数据
const HEADERDATA = ref([])
const HEADERSTYLE = ref([])
const AVERAGEWIDTH = ref([])
const ALINGS = ref([])
const DATA = ref([])
const COLUMSTYLE = ref([])
const COLUMNHEIGHT = ref([])
const ODDROWBGC = ref('')
const EVENROWBGC = ref('')
let CURRENTINDEX = ref(0)
const CURRENTDATA = ref([])
const AVERAGEHEIGHT = ref(0)
const props = defineProps({
    config: {
        type: Object,
        default: {
            header: [],
            headerStyle: [],
            headerBGC: '#00BAFF',
            headerFontSize: 15,
            headerColor: "#000",
            headerHeight: 35,
            headerIndexStyle: {
                type: Object,
            },
            columnIndexStyle: {
                type: Object
            },
            columnstyle: {
                type: Array
            },
            data: [],
            rowNum: 5,
            columnFontSize: 14,
            columnMarginTop: 0,
            columnNumber: 10,
            columnIndexStyle: {
                type: Object,
                default: {
                    color: "#bfa",
                    width: "200px"
                }
            },
            ALINGS: [],
            columnMarginRight: 0,
            BGCOLOR1: '#003B51',
            BGCOLOR2: '#0A2732',
            waitTime: 2000,
            align: [],
            index: false,
            indexHeader: '#',
            carousel: 'single',
            autoPlay: true,
            MoveNumber: 1,
            duration: 5000

        }
    },
    data: {
        type: Object,
        default: {}
    }
})
// 处理头部数据
const HandelHeaderdata = () => {
    const Headerdata = cloneDeep(props.config.header)
    console.log(props)
    const HeaderStyle = cloneDeep(props.config.headerStyle)
    const Alings = cloneDeep(props.config.alings)
    if (props.config.header.length == 0) {
        HEADERDATA.value = []
        return
    }
    if (props.config.index) {
        Headerdata.unshift(props.config.indexHeader)
        HeaderStyle.unshift(props.config.headerIndexStyle)
    }
    ALINGS.value = Alings
    HEADERDATA.value = Headerdata
    HEADERSTYLE.value = HeaderStyle
}
// 处理平均宽度
const HandelHeaderAverageWidth = () => {
    let needAverage = HEADERDATA.value.length
    let currentWidth = 0
    HEADERSTYLE.value.forEach((style, index) => {
        if (style.width) {
            needAverage--
            currentWidth += style.width.replace('px', '') * 1
        }

    });
    const averagewidth = (width.value - currentWidth) / needAverage
    AVERAGEWIDTH.value = new Array(HEADERDATA.value.length)
    AVERAGEWIDTH.value.fill(averagewidth)
    HEADERSTYLE.value.forEach((style, index) => {
        if (style.width) {
            AVERAGEWIDTH.value[index] = style.width.replace('px', '') * 1
        }

    });
}
// 处理内容数据
const HandelRowsdata = () => {
    const data = cloneDeep(props.config.data)
    const columnIndexStyle = cloneDeep(props.config.columnIndexStyle)
    const columnstyle = cloneDeep(props.config.columnstyle)
    const bgcolor1 = cloneDeep(props.config.BGCOLOR1)
    const bgcolor2 = cloneDeep(props.config.BGCOLOR2)
    // if (props.config.index) {
    //     data.forEach((rows, index) => {
    //         rows.unshift(index + 1)
    //     })
    //     columnstyle.unshift(columnIndexStyle)
    // }
    DATA.value = data.map((item, index) => {
        return {
            data: item,
            ROWindex: index
        }
    })
    ODDROWBGC.value = bgcolor1
    EVENROWBGC.value = bgcolor2
    COLUMSTYLE.value = columnstyle
}
// 处理平均高度
const HandelAverageHeight = () => {
    const columnNumber = cloneDeep(props.config.columnNumber)
    const AverageHeight = height.value / columnNumber
    AVERAGEHEIGHT.value = AverageHeight
    const TotalCount = DATA.value.length
    COLUMNHEIGHT.value = new Array(TotalCount).fill(AverageHeight)
}
const StartAnimation = async () => {
    // 拿到真实长度
    const alldataLenght = props.config.data.length
    // 拿到一共渲染多少条数据
    const MoveNumber = props.config.MoveNumber
    // 指针
    const index = CURRENTINDEX.value
    // 拿到原先的数据
    const rowdata = cloneDeep(DATA.value)
    // 拿到时间
    const titme = props.config.duration
    // 将数据头尾链接
    const rows = rowdata.slice(index)
    if (alldataLenght < MoveNumber) return
    rows.push(...rowdata.slice(0, index))
    CURRENTDATA.value = rows

    // 变更高度
    COLUMNHEIGHT.value = new Array(alldataLenght).fill(AVERAGEHEIGHT.value)
    const awaitTime = 300
    await new Promise(resolve => setTimeout(resolve, awaitTime))
    // 将头部元素设置为0
    COLUMNHEIGHT.value.splice(0, MoveNumber, ...new Array(MoveNumber).fill(0))


    CURRENTINDEX.value += MoveNumber
    const ISLAST = CURRENTINDEX.value - alldataLenght
    if (ISLAST >= 0) {
        CURRENTINDEX.value = ISLAST
    }
    await new Promise(resolve => setTimeout(resolve, titme - awaitTime))
    await StartAnimation()
}
watch(props.config.data, (data) => {
    props.config.data = data
    HandelRowsdata()
    // StartAnimation()
})
onMounted(() => {
    HandelHeaderdata()
    HandelHeaderAverageWidth()
    HandelRowsdata()
    HandelAverageHeight()
    StartAnimation()
    console.log(props.config)
})
</script>
<script>
export default {
    name: 'BaseScoreList'  // 添加name属性
}
</script>
<style scoped lang="scss">
.headertext {
    padding: 0px 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.BaseScorelist {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .TabelHeaderWrapper {
        .TabelHeader {
            display: flex;
            align-items: center;

            .HeaderItem {
                padding: 0 10px;
            }
        }

    }

    .TabelColumWrapper {
        .Colum {
            display: flex;
            align-items: center;
            transition: height 0.4s linear;

            .item {
                padding: 0 10px;
            }
        }
    }
}
</style>