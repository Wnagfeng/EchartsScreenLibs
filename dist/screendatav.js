(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.screenDatav = factory(global.vue));
})(this, (function (vue) { 'use strict';

  const _hoisted_1$1 = { class: "SvgLoadingWrapper" };
  const _hoisted_2$1 = ["width", "height"];
  const _hoisted_3 = ["stroke"];
  const _hoisted_4 = ["dur"];
  const _hoisted_5 = ["values", "dur"];
  const _hoisted_6 = ["stroke"];
  const _hoisted_7 = ["dur"];
  const _hoisted_8 = ["values", "dur"];
   
  const __default__$1 = {
      name: 'SvgLoading'  // 添加name属性
  };


  var script$1 = /*#__PURE__*/Object.assign(__default__$1, {
    props: {
     width:{
       type:[Number,String],
       default:50,
     },
     height:{
       type:[Number,String],
       default:50,
     },
     outSidecolor:{
       type:String,
       default:"#3be6cb"
     },
     inSidecolor:{
       type:String,
       default:"#02bcfe"
     },
     duration:{
       type:[Number,String],
       default:2
     }

   },
    setup(__props) {

   const  props =__props;
   const  OutSideColorAnimation=vue.computed(()=>{
     return `${props.outSidecolor};${props.inSidecolor};${props.outSidecolor}`
   });
   const  inSideColorAnimation=vue.computed(()=>{
     return `${props.inSidecolor};${props.outSidecolor};${props.inSidecolor}`
   });
   
  return (_ctx, _cache) => {
    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" 实现loding加载效果 "),
      vue.createElementVNode("div", _hoisted_1$1, [
        (vue.openBlock(), vue.createElementBlock("svg", {
          width: props.width,
          height: props.height,
          viewBox: "0 0 50 50",
          preserveAspectRatio: "xMidYMid meet"
        }, [
          vue.createCommentVNode(" \r\n                dasharray=2pir/4\r\n             "),
          vue.createElementVNode("circle", {
            cx: "25",
            cy: "25",
            r: "22",
            fill: "none",
            "stroke-width": "3",
            stroke: props.outSidecolor,
            "stroke-dasharray": "34",
            "stroke-linecap": "round"
          }, [
            vue.createElementVNode("animateTransform", {
              attributeName: "transform",
              type: "rotate",
              from: "0 25 25 ",
              to: "360 25 25",
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_4),
            vue.createCommentVNode("              注意你的属性stroke不能写错"),
            vue.createElementVNode("animate", {
              attributeName: "stroke",
              values: OutSideColorAnimation.value,
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_5)
          ], 8 /* PROPS */, _hoisted_3),
          vue.createElementVNode("circle", {
            cx: "25",
            cy: "25",
            r: "12",
            fill: "none",
            "stroke-width": "3",
            stroke: props.inSidecolor,
            "stroke-dasharray": "19",
            "stroke-linecap": "round"
          }, [
            vue.createElementVNode("animateTransform", {
              attributeName: "transform",
              type: "rotate",
              from: "360 25 25 ",
              to: "0 25 25",
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_7),
            vue.createElementVNode("animate", {
              attributeName: "stroke",
              values: inSideColorAnimation.value,
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_8)
          ], 8 /* PROPS */, _hoisted_6)
        ], 8 /* PROPS */, _hoisted_2$1))
      ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  }
  }

  });

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$1 = ".SvgLoadingWrapper {\n  width: 200px;\n  height: 200px;\n  margin: auto;\n}";
  styleInject(css_248z$1);

  script$1.__file = "src/component/Loading/index.vue";

  function SvgLoading (vue) {
    vue.component(script$1.name, script$1);
  }

  const _hoisted_1 = {
    class: "ContainerWrapper",
    id: "Container"
  };
  const _hoisted_2 = {
    key: 0,
    class: "slotBox"
  };

  const __default__ = {
    name: 'Container'  // 添加name属性
  };


  var script = /*#__PURE__*/Object.assign(__default__, {
    props: {
    // 这里传递的数据是你的比值 比如当前项目需要3840/2160的比值 这就是宽高比
    opstion: {
      type: Object,
    }
  },
    setup(__props) {

  const width = vue.ref(0);
  const height = vue.ref(0);
  const orgingWidth = vue.ref(0);
  const orgingHeight = vue.ref(0);
  const realy = vue.ref(false);
  const props = __props;
  // 初始化数据
  const init = () => {
    realy.value = false;
    // 获取dom
    const container = document.getElementById("Container");
    const domwidth = container.clientWidth;
    const domheight = container.clientHeight;
    // 防止重负调用
    if (!orgingHeight.value || orgingWidth.value) {
      // 初始化视口宽高
      orgingWidth.value = window.screen.width;
      orgingHeight.value = window.screen.height;
    }
    // 判断用户是否传入宽高
    if (props.opstion && props.opstion.width && props.opstion.height) {
      // 初始化宽高
      width.value = props.opstion.width;
      height.value = props.opstion.height;
    } else {
      // 初始化宽高
      width.value = domwidth;
      height.value = domheight;
    }
    realy.value = true;

  };
  // 设置大小
  const updataSize = () => {
    const container = document.getElementById("Container");
    if (width.value && height.value) {
      container.style.width = `${width.value}px`;
      container.style.height = `${height.value}px`;
    } else {
      container.style.width = `${orgingWidth.value}px`;
      container.style.height = `${orgingHeight.value}px`;
    }
  };
  // 计算压缩比更新压缩比例
  const UpdataStyleScale = () => {
    const container = document.getElementById("Container");
    // 实际视口宽高(当前可视区域不是画布哦！)
    const currentWidth = document.body.clientWidth;
    const currentHeight = document.body.clientHeight;
    // 接下来我们用width/currentWidth获得横向比值(由于可能width会没有值我们最好做一个判断)
    const realWidth = width.value || orgingWidth.value;
    const realHeight = height.value || orgingHeight.value;
    // 宽度压缩比
    const widthScale = currentWidth / realWidth;
    // 高度压缩比
    const heightScale = currentHeight / realHeight;
    container.style.transform = `scale(${widthScale}, ${heightScale})`;
    console.log('执行了');
  };
  const Onresize = () => {
    init();
    updataSize();
    UpdataStyleScale();
  };
  vue.onMounted(() => {
    // 初始化数据
    init();
    // 设置页面
    updataSize();
    // 计算缩放比
    UpdataStyleScale();
    window.addEventListener("resize", Onresize);
  });
  vue.onUnmounted(() => {
    // 释放
    window.removeEventListener("resize", Onresize);
  });



  return (_ctx, _cache) => {
    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" 实现Container效果 "),
      vue.createElementVNode("div", _hoisted_1, [
        (realy.value)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.renderSlot(_ctx.$slots, "default")
            ]))
          : vue.createCommentVNode("v-if", true)
      ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  }
  }

  });

  var css_248z = ".ContainerWrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  z-index: 9999;\n  background-color: red;\n  transform-origin: left top;\n}";
  styleInject(css_248z);

  script.__file = "src/component/Container/index.vue";

  function Container (vue) {
    vue.component(script.name, script);
  }

  function index (vue) {
    vue.use(SvgLoading);
    vue.use(Container);
    vue.use(Container);
  }

  return index;

}));
