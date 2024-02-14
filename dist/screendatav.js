(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.screenDatav = factory(global.vue));
})(this, (function (vue) { 'use strict';

  const _hoisted_1$1 = { class: "SvgLoadingWrapper" };
  const _hoisted_2$1 = ["width", "height"];
  const _hoisted_3$1 = ["stroke"];
  const _hoisted_4$1 = ["dur"];
  const _hoisted_5$1 = ["values", "dur"];
  const _hoisted_6$1 = ["stroke"];
  const _hoisted_7$1 = ["dur"];
  const _hoisted_8$1 = ["values", "dur"];
   
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
            }, null, 8 /* PROPS */, _hoisted_4$1),
            vue.createCommentVNode("              注意你的属性stroke不能写错"),
            vue.createElementVNode("animate", {
              attributeName: "stroke",
              values: OutSideColorAnimation.value,
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_5$1)
          ], 8 /* PROPS */, _hoisted_3$1),
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
            }, null, 8 /* PROPS */, _hoisted_7$1),
            vue.createElementVNode("animate", {
              attributeName: "stroke",
              values: inSideColorAnimation.value,
              dur: props.duration+'s',
              repeatCount: "indefinite"
            }, null, 8 /* PROPS */, _hoisted_8$1)
          ], 8 /* PROPS */, _hoisted_6$1)
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

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  let getRandomValues;
  const rnds8 = new Uint8Array(16);
  function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
      // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
      getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

      if (!getRandomValues) {
        throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
      }
    }

    return getRandomValues(rnds8);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */

  const byteToHex = [];

  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
  }

  function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native = {
    randomUUID
  };

  function v4(options, buf, offset) {
    if (native.randomUUID && !buf && !options) {
      return native.randomUUID();
    }

    options = options || {};
    const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }

      return buf;
    }

    return unsafeStringify(rnds);
  }

  const _hoisted_1 = ["width", "height"];
  const _hoisted_2 = /*#__PURE__*/vue.createElementVNode("radialGradient", {
    id: "radialPath",
    cx: "50%",
    cy: "50%",
    fx: "100%",
    fy: "50%",
    r: "50%"
  }, [
    /*#__PURE__*/vue.createCommentVNode("这里是渐变效果的逐渐渐变"),
    /*#__PURE__*/vue.createElementVNode("stop", {
      offset: "0%",
      "stop-color": "#4fd2dd",
      "stop-opacity": "1"
    }),
    /*#__PURE__*/vue.createElementVNode("stop", {
      offset: "100%",
      "stop-color": "#4fd2dd",
      "stop-opacity": "0"
    })
  ], -1 /* HOISTED */);
  const _hoisted_3 = ["fill"];
  const _hoisted_4 = ["path"];
  const _hoisted_5 = ["d"];
  const _hoisted_6 = ["href"];
  const _hoisted_7 = ["href", "mask"];
  const _hoisted_8 = { class: "SlotBox" };

  const __default__ = {
    name: 'FlyBox'  // 添加name属性
  };


  var script = /*#__PURE__*/Object.assign(__default__, {
    props: {
    // 添加你的自定义属性
  },
    setup(__props) {

  const width = vue.ref(0);
  const height = vue.ref(0);
  const uuid = v4();
  // 使用uuid对我们的类名进行唯一定制
  const flyBoxPathID = `flyBoxPathID${uuid}`;
  const FlyBoxWrapperId = `FlyBoxWrapper${uuid}`;
  const flyboxMaskIdD = `flyboxMask${uuid}`;
  const pathValue = vue.computed(() => {
    return `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`
  });
  vue.onMounted(() => {
    const Wrapper = document.getElementById(FlyBoxWrapperId);
    width.value = Wrapper.clientWidth;
    height.value = Wrapper.clientHeight;
  });


  return (_ctx, _cache) => {
    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createCommentVNode(" 实现Flybox效果 "),
      vue.createElementVNode("div", {
        class: "FlyBoxWrapper",
        id: FlyBoxWrapperId
      }, [
        (vue.openBlock(), vue.createElementBlock("svg", {
          width: width.value,
          height: height.value
        }, [
          vue.createElementVNode("defs", null, [
            vue.createCommentVNode("填充效果(内聚渐变)"),
            _hoisted_2,
            vue.createCommentVNode("蒙版"),
            vue.createElementVNode("mask", { id: flyboxMaskIdD }, [
              vue.createCommentVNode("填充渐变效果"),
              vue.createElementVNode("circle", {
                r: "60",
                cx: "0",
                cy: "0",
                fill: `url(#radialPath)`
              }, [
                vue.createElementVNode("animateMotion", {
                  dur: "5s",
                  path: pathValue.value,
                  rotate: "auto",
                  repeatCount: "indefinite"
                }, null, 8 /* PROPS */, _hoisted_4)
              ], 8 /* PROPS */, _hoisted_3)
            ]),
            vue.createCommentVNode("线条"),
            vue.createElementVNode("path", {
              id: flyBoxPathID,
              d: pathValue.value,
              fill: "none"
            }, null, 8 /* PROPS */, _hoisted_5)
          ]),
          vue.createElementVNode("use", {
            href: `#${flyBoxPathID}`,
            "stroke-width": "1",
            stroke: "#235fa7"
          }, null, 8 /* PROPS */, _hoisted_6),
          vue.createElementVNode("use", {
            href: `#${flyBoxPathID}`,
            "stroke-width": "3",
            stroke: "#4fd2dd",
            mask: `url(#${flyboxMaskIdD})`
          }, null, 8 /* PROPS */, _hoisted_7)
        ], 8 /* PROPS */, _hoisted_1)),
        vue.createElementVNode("div", _hoisted_8, [
          vue.renderSlot(_ctx.$slots, "default")
        ])
      ])
    ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
  }
  }

  });

  var css_248z = ".FlyBoxWrapper {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  margin: 0 auto;\n  color: #fff;\n}\n.FlyBoxWrapper svg {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.SlotBox {\n  padding: 10px;\n  width: 100%;\n  height: 100%;\n}";
  styleInject(css_248z);

  script.__file = "src/component/FlyBox/index.vue";

  function FlyBox (vue) {
    vue.component(script.name, script);
  }

  function index (vue) {
    vue.use(SvgLoading);
    vue.use(FlyBox);
  }

  return index;

}));
