(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8cb574ae"],{a943:function(a,e,t){},b5bc:function(a,e,t){"use strict";var n=t("a943"),o=t.n(n);o.a},f73e:function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("Row",[t("i-col",[t("Card",[t("Row",[t("i-col",{attrs:{span:"8"}},[t("Button",{attrs:{type:"primary"},on:{click:a.showModal}},[a._v("显示可拖动弹窗")]),t("br"),t("Button",{directives:[{name:"draggable",rawName:"v-draggable",value:a.buttonOptions,expression:"buttonOptions"}],staticClass:"draggable-btn"},[a._v("这个按钮也是可以拖动的")])],1),t("i-col",{attrs:{span:"16"}},[t("div",{staticClass:"intro-con"},[a._v('\n              <Modal v-draggable="options" v-model="visible">标题</Modal>\n              '),t("pre",{staticClass:"code-con"},[a._v("  options = {\n    trigger: '.ivu-modal-body',\n    body: '.ivu-modal'\n  }\n              ")])])])],1)],1)],1),t("Modal",{directives:[{name:"draggable",rawName:"v-draggable",value:a.options,expression:"options"}],model:{value:a.modalVisible,callback:function(e){a.modalVisible=e},expression:"modalVisible"}},[a._v("\n      拖动这里即可拖动整个弹窗\n    ")])],1),t("Row",{staticStyle:{"margin-top":"10px"}},[t("i-col",[t("Card",[t("Row",[t("i-col",{attrs:{span:"8"}},[t("Input",{staticStyle:{width:"60%"},model:{value:a.inputValue,callback:function(e){a.inputValue=e},expression:"inputValue"}},[t("Button",{directives:[{name:"clipboard",rawName:"v-clipboard",value:a.clipOptions,expression:"clipOptions"}],attrs:{slot:"append"},slot:"append"},[a._v("copy")])],1)],1),t("i-col",{attrs:{span:"16"}},[t("div",{staticClass:"intro-con"},[a._v('\n              <Input style="width: 60%" v-model="inputValue">\n                '),t("br"),a._v('\n                   <Button slot="append" v-clipboard="clipOptions">copy</Button>\n                '),t("br"),a._v("\n              </Input>\n              "),t("pre",{staticClass:"code-con"},[a._v("  clipOptions: {\n    value: this.inputValue,\n    success: (e) => {\n      this.$Message.success('复制成功')\n    },\n    error: () => {\n      this.$Message.error('复制失败')\n    }\n  }\n              ")])])])],1)],1)],1),t("Modal",{directives:[{name:"draggable",rawName:"v-draggable",value:a.options,expression:"options"}],model:{value:a.modalVisible,callback:function(e){a.modalVisible=e},expression:"modalVisible"}},[a._v("\n      拖动这里即可拖动整个弹窗\n    ")])],1)],1)},o=[],i={name:"directive_page",data:function(){return{modalVisible:!1,options:{trigger:".ivu-modal-body",body:".ivu-modal",recover:!0},buttonOptions:{trigger:".draggable-btn",body:".draggable-btn"},statu:1,inputValue:"这是输入的内容"}},computed:{clipOptions:function(){var a=this;return{value:this.inputValue,success:function(e){a.$Message.success("复制成功")},error:function(){a.$Message.error("复制失败")}}}},methods:{showModal:function(){this.modalVisible=!0}}},s=i,l=(t("b5bc"),t("17cc")),r=Object(l["a"])(s,n,o,!1,null,null,null);e["default"]=r.exports}}]);