<template>
    <div class="BaseScoreListWrapper" :id="id">
        <!-- 搭建头部组件 -->
        <!-- 需要实现外部组件自定义样式与内容和本组件动态计算宽度-->
        <div class="baseScorelistHeader">
            <div class="headerWrapper" :style="{
                backgroundColor: props.config.headerBGC,
                height: `${props.config.headerheight}px`,
                fontSize: `${props.config.headerFontsize}px`,
                color: `${props.config.headerColor}`
            }">
                <div class="headertext" v-for="(item, index ) in HEADERDATA" v-html="item" :key="item + index"
                    :style="{ width: `${COLUMWIDTH[index]}px`, ...HEADERSTYLE[index] }" :align="ALINGS[index]"></div>
            </div>
        </div>
        <div class="baseScorelist" v-for="(item, index) in ROWSDATA " :key="index + item">
            <div class="itemWrapper headertext"
                :style="{ height: `${ROWSHEIGHT[index]}px`, lineHeight: `${ROWSHEIGHT[index]}px`, backgroundColor: item.Rowindex % 2 === 0 ? 'red' : 'blue', color: `${props.config.rowColor}` }">
                <div class="item headertext " v-for="(iten, index) in item.data" v-html="iten" :key="index + iten"
                    :align="ALINGS[index]"
                    :style="{ width: `${COLUMWIDTH[index]}px`, ...ROWSTYLE[index], fontSize: `${props.config.rowFontsize}px`, }">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup >
import { onMounted, ref, defineProps } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import init from '../../hooks/useScreen'
import cloneDeep from 'loadsh/cloneDeep'
const props = defineProps({
    config: {
        type: Object,
        default: {
            /**
             * 表头数据
             * @description headerdata
             * @type {Array<String>}
             * @default header = []
             * @example header = ['column1', 'column2', 'column3']
             */
            headerdata: [],
            /**
            * 表头样式
            * @description headerStyle
            * @type {Array<String>}
            * @default header = []
            * @example header = [{color:"red"}, {color:"blue"}, {color:"yellow"}]
            */
            headerStyle: [],
            // 表头背景样式
            headerBGC: 'rgb(90,90,90)',
            // 表头高度
            headerheight: 50,
            // 表示是否展示序号列
            /**
             * 其实就是在当前header数组中再添加一个数据进去
             * @description Show index
             * @type {Boolean}
             * @default index = false
             */
            index: false,
            headerIndex: {
                type: Boolean,
                default: false
            },
            // 需要在表头插入的内容
            /**
             * @description headerindexContent
             * @type {String}
             * @default headerindexContent = '#'
             */
            headerindexContent: {
                type: String,
                default: "#"
            },
            // 表头的样式
            /**
             * @description headerIndexStyle
             * @type {String}
             * @default color = '#bfa'
             */
            headerIndexStyle: {
                type: Object,
                default: {
                    color: '#bfa'
                }
            },
            // 表格数据
            RowsData: {
                type: Array,
            },
            // 你想展示的行数
            RowNumber: 10,
            // 内容样式
            Rowstyle: [],
            // 内容序号列样式
            RowIndexStyle: {
                type: Object,
                default: {
                    color: '#bfa'
                }
            },
            // 行背景色
            RowBg: [],
            // 行居中方式
            alings: [],
            // 头部文字大小
            headerFontsize: 0,
            // 内容列样式
            rowFontsize: 0,
            // 头部文字颜色
            headerColor: "red",
            // 内容文字颜色
            rowColor: "#fff",
            // 需要移动的位置
            MoveNumber: 1,
            // 动画间隔之间
            duration: 5000
        }
    }
})
const HEADERDATA = ref([])//处理后的header数据
const HEADERSTYLE = ref([])//处理后的header样式数据
const COLUMWIDTH = ref([])//动态计算的宽度
const ROWSDATA = ref([])//处理后的Rowsdata
const ROWSHEIGHT = ref([])//动态计算的高度
const ROWSNUMBER = ref(0)//你需要展示的行数
const ROWSTYLE = ref([])//内容列样式
const ROWBG = ref([])//行背景样式
const ALINGS = ref([])//是否居中显示
const CURRENTINDEX = ref(0)//当前需要展示动画的位置
const AVERAGEHEIGHT = ref(0)//当前平均高度
const id = `BaseScoreListWrapper+${uuidv4()}`
const { width, height } = init(id)
// 处理头部数据的函数
const handelHeaderData = () => {
    // 1.处理header数据
    const headerData = cloneDeep(props.config.headerdata)//拷贝数据
    const headerstyle = cloneDeep(props.config.headerStyle)//拷贝样式
    const Rowsdata = cloneDeep(props.config.RowsData)//拷贝数据
    const RowStyle = cloneDeep(props.config.Rowstyle)//拷贝样式
    const Alings = cloneDeep(props.config.alings)//是否居中显示



    if (props.config.headerdata.length == 0) {
        return
    }
    if (props.config.headerIndex) {
        headerData.unshift(props.config.headerindexContent)
        headerstyle.unshift(props.config.headerIndexStyle)
        RowStyle.unshift(props.config.RowIndexStyle)
        // 默认index就是居中
        Alings.unshift('center')
        Rowsdata.forEach((rows, index) => {
            rows.unshift(index + 1)
        })
        HEADERDATA.value = headerData
        HEADERSTYLE.value = headerstyle
        ROWSDATA.value = Rowsdata.map((item, index) => {
            return {
                data: item,
                Rowindex: index
            }
        })
        ROWSTYLE.value = RowStyle
        ALINGS.value = Alings
        console.log(ROWSDATA.value)
    } else {
        // 不需要表头
        HEADERDATA.value = headerData
        HEADERSTYLE.value = headerstyle
        // ROWSDATA.value = Rowsdata.map((item, index) => {
        //     return {
        //         data: item,
        //         Rowindex: index
        //     }
        // })
        ROWSTYLE.value = RowStyle
        ALINGS.value = Alings
    }
    // 2.动态计算宽度
    // 2.1判断用户是否自定义宽高
    let NeedAverAgeNumber = headerData.length
    headerstyle.forEach((style, index) => {
        // 如果自定义了 你需要重新计算宽
        if (style.width) {
            console.log("含有数据")
            NeedAverAgeNumber--
        }
    });
    const averageWidth = width.value * 1 / NeedAverAgeNumber
    const columwidth = new Array(headerData.length).fill(averageWidth)
    headerstyle.forEach((style, index) => {
        // 如果自定义了 你需要重新计算宽
        if (style.width) {
            const headerwidth = style.width.replace('px', '') * 1
            columwidth[index] = headerwidth
        }
    });
    COLUMWIDTH.value = columwidth
}
// 处理局部数据
const handelRowsData = () => {
    if (!props.config.headerIndex) {
        // 如果我们不需要index我们在这里处理数据
        // 如果用户需要index 在112行处理数据
        const Rowsdata = cloneDeep(props.config.RowsData)//拷贝数据
        ROWSDATA.value = Rowsdata.map((item, index) => {
            return {
                data: item,
                Rowindex: index
            }
        })
    }
    // 动态计算rows的高度
    // 当前表头高度
    const headerheight = props.config.headerheight
    // 当前未使用的高度
    const unUsedHeight = height.value - headerheight
    // 初始化需要展示的数据
    ROWSNUMBER.value = props.config.RowNumber
    console.log(ROWSNUMBER)
    // 边界判断
    if (ROWSNUMBER.value > props.config.RowsData.length) {
        ROWSNUMBER.value = props.config.RowsData.length
    } else {
        ROWSNUMBER.value = props.config.RowNumber
    }
    let AverAgeHeight = unUsedHeight / ROWSNUMBER.value
    AVERAGEHEIGHT.value = AverAgeHeight
    ROWSHEIGHT.value = new Array(ROWSNUMBER.value).fill(AverAgeHeight)

    // 行背景色处理
    if (props.config.RowBg) {
        ROWBG.value = props.config.RowBg
    }

}
// 开启滚动动画
const StartAnimation = async () => {
    const TotalCount = props.config.RowsData.length//当前数据总长度
    const RowNumber = props.config.RowNumber//一次滚动的行数
    const index = CURRENTINDEX.value//当前的第一个元素
    const Rowdata = cloneDeep(ROWSDATA.value)
    const rows = Rowdata.slice(index)
    const MoveNumber = props.config.MoveNumber
    // if (props.config.headerIndex) {
    //     Rowdata.forEach((rows, index) => {
    //         rows.unshift(index + 1)
    //     })
    // }

    if (Rowdata.length < RowNumber) {
        return
    }
    rows.push(...Rowdata.slice(0, index))
    ROWSDATA.value = rows.map((item, index) => {
        return {
            data: item,
            Rowindex: index
        }
    })
    // currentindx变更之前我们把高度置为0
    ROWSHEIGHT.value = new Array(TotalCount).fill(AVERAGEHEIGHT.value)
    await new Promise(resolve => setTimeout(resolve, 400))
    // 将首位元素设置为0
    ROWSHEIGHT.value.splice(0, MoveNumber, ...new Array(MoveNumber).fill(0))
    CURRENTINDEX.value += MoveNumber
    const ISLAST = CURRENTINDEX.value - TotalCount

    // 如果你一次移动两个元素可能是1
    if (ISLAST >= 0) {
        CURRENTINDEX.value = ISLAST
    }
}
setInterval(() => {
    StartAnimation()
}, props.config.duration - 400);

onMounted(() => {
    handelHeaderData()
    handelRowsData()
    StartAnimation()
    // console.log(ROWSDATA.value)
})
</script>
<script>
export default {
    name: 'BaseScoreList'  // 添加name属性
}
</script>

<style scoped lang="scss">
.BaseScoreListWrapper {
    width: 100%;
    height: 100%;
    font-size: 50px;

    .baseScorelistHeader {
        width: 100%;


        .headerWrapper {
            display: flex;
            align-items: center;

            .headertext {
                padding: 0px 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .baseScorelist {

        .itemWrapper {
            display: flex;
            align-items: center;
            transition: all 0.2s linear;

            .item {
                overflow: hidden;
                padding: 0 10px;

            }
        }

    }
}
</style>
