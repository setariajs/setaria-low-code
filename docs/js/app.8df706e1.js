(function(e){function t(t){for(var o,s,r=t[0],l=t[1],c=t[2],u=0,p=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&p.push(i[s][0]),i[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(o=!1)}o&&(a.splice(t--,1),e=r(r.s=n[0]))}return e}var o={},i={app:0},a=[];function s(e){return r.p+"js/"+({}[e]||e)+"."+{"chunk-2d0d7fc5":"05993c72"}[e]+".js"}function r(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n=i[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=i[e]=[t,o]}));t.push(n[2]=o);var a,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=s(e);var c=new Error;a=function(t){l.onerror=l.onload=null,clearTimeout(u);var n=i[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,n[1](c)}i[e]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:l})}),12e4);l.onerror=l.onload=a,document.head.appendChild(l)}return Promise.all(t)},r.m=e,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/setaria-low-code/",r.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var d=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"09b7":function(e,t,n){},"0c70":function(e,t,n){"use strict";n("6262")},2269:function(e,t,n){},"2ee1":function(e,t,n){},"503a":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=n("6fee"),a=n.n(i),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],l=n("2877"),c={},u=Object(l["a"])(c,s,r,!1,null,null,null),d=u.exports,p=n("8c4f"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rootContainer"},[n("left-side",{on:{add:e.addComponent}}),n("main-content",{ref:"mainCotent",attrs:{drawingList:e.drawingList,formProps:e.formProps},on:{setActiveComponent:e.setActiveComponent,empty:e.empty}}),n("right-side",{attrs:{formProps:e.formProps,activeComponent:e.activeComponent}})],1)},f=[],h=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"leftSideContainer"},[n("div",{staticClass:"topArea"},[e._v("\n    Setaria Low Code\n  ")]),n("el-scrollbar",{staticClass:"scrollBar"},[n("component-group",{attrs:{title:"输入型组件",components:e.inputComponents},on:{add:e.addComponent}}),n("component-group",{attrs:{title:"选择型组件",components:e.selectComponents},on:{add:e.addComponent}})],1)],1)},v=[],b=void 0,g=[{const:!1,title:"否"},{const:!0,title:"是"}],y={"ui:widget":"select","ui:options":{clearable:!0}},w={properties:{required:{type:"boolean",title:"是否必填",oneOf:g},key:{type:"string",title:"字段名"},title:{type:"string",title:"标题"},type:{type:"string",title:"类型",oneOf:[{const:"string",title:"字符"},{const:"number",title:"数值"},{const:"boolean",title:"布尔"},{const:"object",title:"对象"},{const:"array",title:"数组"}]},description:{type:"string",title:"扩展标题"},"ui:placeholder":{type:"string",title:"默认显示内容"},"ui:colspan":{type:"number",title:"跨越的列数"},"ui:rows":{type:"number",title:"输入框行数"},minLength:{type:"number",title:"最小长度"},maxLength:{type:"number",title:"最大长度"},"ui:autosize":{type:"boolean",title:"是否自适应高度",oneOf:g},"show-word-limit":{type:"boolean",title:"是否显示字数统计",oneOf:g},multiple:{type:"string",title:"是否可多选",oneOf:g},clearable:{type:"boolean",title:"是否可清空",oneOf:g},filterable:{type:"boolean",title:"是否可搜索",oneOf:g},"ui:disabled":{type:"boolean",title:"是否禁用",oneOf:g},readonly:{type:"boolean",title:"是否只读",oneOf:g},"ui:hidden":{type:"boolean",title:"是否隐藏",oneOf:g},"show-password":{type:"boolean",title:"是否显示切换密码",oneOf:g},"datePicker.uiSchema.ui:options.type":{type:"string",title:"选取类型",oneOf:[{const:"year",title:"年"},{const:"month",title:"月"},{const:"date",title:"日期"},{const:"dates",title:"多个日期"},{const:"week",title:"周"}]}},uiSchema:{required:y,key:{},title:{},description:{},"ui:placeholder":{},"ui:colspan":{},"ui:rows":{},minLength:{},maxLength:{},"ui:autosize":y,"show-word-limit":y,multiple:y,filterable:y,clearable:y,"ui:disabled":y,readonly:y,"ui:hidden":y,"show-password":y,type:[],"datePicker.uiSchema.ui:options.type":y}},C=[{componentName:"input",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"单行文本",minLength:void 0,maxLength:void 0},uiSchema:{"ui:placeholder":void 0,"ui:rules":[],"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0,clearable:void 0,"show-word-limit":void 0}}},{componentName:"input",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"密码",minLength:void 0,maxLength:void 0},uiSchema:{"ui:widget":"password","ui:rules":[],"ui:placeholder":void 0,"ui:disabled":void 0,"ui:colspan":void 0,"ui:hidden":void 0,"ui:options":{readonly:void 0,clearable:void 0,"show-password":void 0}}},{componentName:"input",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"文本域",minLength:void 0,maxLength:void 0},uiSchema:{"ui:widget":"textarea","ui:rules":[],"ui:placeholder":void 0,"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{"ui:autosize":void 0,"ui:rows":2,readonly:void 0,clearable:void 0,"show-word-limit":void 0}}}],S=[{componentName:"select",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"下拉选择",oneOf:[{const:"1",title:"选项1"},{const:"2",title:"选项2"}]},uiSchema:{"ui:widget":"select","ui:placeholder":void 0,"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0,clearable:void 0,multiple:void 0,filterable:void 0}}},{componentName:"radio",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"单选框组",oneOf:[{const:"1",title:"选项1"},{const:"2",title:"选项2"}]},uiSchema:{"ui:widget":"radio","ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0}}},{componentName:"checkbox",required:!1,key:void 0,schema:{description:void 0,type:"array",title:"多选框组",anyOf:[{const:"1",title:"选项1"},{const:"2",title:"选项2"}]},uiSchema:{"ui:widget":"checkbox","ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0}}},{componentName:"datePicker",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"日期选择",format:"date"},uiSchema:{"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0,clearable:void 0,"datePicker.uiSchema.ui:options.type":void 0}}},{componentName:"dateTimePicker",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"日期时间选择",format:"date-time"},uiSchema:{"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0,clearable:void 0}}},{componentName:"timePicker",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"时间选择",format:"time"},uiSchema:{"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{readonly:void 0,clearable:void 0}}},{componentName:"searchHelp",required:!1,key:void 0,schema:{description:void 0,type:"string",title:"搜索帮助"},uiSchema:{"ui:disabled":void 0,"ui:hidden":void 0,"ui:colspan":void 0,"ui:options":{"suffix-icon":"el-icon-search",readonly:!0,clearable:void 0},"ui:nativeOn":{click:function(){b.$message.info("searchHelp click")}}}}],k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"groupContainer"},[n("p",{staticClass:"title"},[e._v(e._s(e.title))]),n("draggable",{staticClass:"componentsDraggable",attrs:{list:e.components,group:{name:"componentsGroup",pull:"clone",put:!1},clone:e.cloneComponent,draggable:".componentsItem",sort:!1},on:{end:e.onEnd}},e._l(e.components,(function(t,o){return n("div",{key:o,staticClass:"componentsItem",on:{click:function(n){return e.addComponent(t)}}},[n("div",{staticClass:"componentsBody"},[e._v("\n        "+e._s(t.schema.title)+"\n      ")])])})),0)],1)},O=[],x=n("b76a"),_=n.n(x),j=n("0644"),L=n.n(j),A=n("b047c"),P=n.n(A),$="idGlobal";function N(){var e=localStorage.getItem($);return e?parseInt(e,10):100}function E(e){localStorage.setItem($,"".concat(e))}var q=N(),I={components:{draggable:_.a},props:{title:{type:String,default:""},components:{type:Array,default:function(){return[]}}},data:function(){return{idGlobal:q,saveIdGlobalDebounce:P()(E,400),draggerComponent:null,tempCloneComponent:null}},watch:{idGlobal:{handler:function(e){this.saveIdGlobalDebounce(e)},immediate:!0}},methods:{addComponent:function(e){var t=this.getNewComponent(e);this.$emit("add",t)},getNewComponent:function(e){var t=L()(e);return this.idGlobal=N()+1,t.key="field".concat(this.idGlobal),t},cloneComponent:function(e){var t=this.getNewComponent(e);return this.tempCloneComponent=t,t},onEnd:function(e){e.from!==e.to&&this.$emit("add",this.tempCloneComponent)}}},M=I,B=(n("c05b"),Object(l["a"])(M,k,O,!1,null,"7968b6a0",null)),D=B.exports,T={components:{ComponentGroup:D},data:function(){return{inputComponents:C,selectComponents:S}},methods:{addComponent:function(e){this.$emit("add",e)}}},U=T,z=(n("964d"),Object(l["a"])(U,h,v,!1,null,"cfa6bb4a",null)),G=z.exports,K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rightSideContainer"},[n("el-tabs",{attrs:{stretch:!0},model:{value:e.tabeActive,callback:function(t){e.tabeActive=t},expression:"tabeActive"}},[n("el-tab-pane",{attrs:{label:"组件属性",name:"components"}}),n("el-tab-pane",{attrs:{label:"表单属性",name:"form"}})],1),n("el-scrollbar",[n("component-props",{directives:[{name:"show",rawName:"v-show",value:"components"===e.tabeActive,expression:"tabeActive ==='components'"}],model:{value:e.activeComponent,callback:function(t){e.activeComponent=t},expression:"activeComponent"}}),n("form-props",{directives:[{name:"show",rawName:"v-show",value:"form"===e.tabeActive,expression:"tabeActive ==='form'"}],model:{value:e.formProps,callback:function(t){e.formProps=t},expression:"formProps"}})],1)],1)},F=[],V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"formPropsContainer"},[n("el-json-form",{ref:"form",attrs:{size:"mini","label-position":"right","label-width":"130px","label-suffix":":",model:e.value,schema:e.schema,"ui-schema":e.uiSchema,"validate-on-rule-change":!1,columns:1}})],1)},R=[],J=[{const:!1,title:"否"},{const:!0,title:"是"}],H={components:{},props:{activeComponent:{type:Object,default:function(){}},value:{type:Object,default:function(){return{inline:!1,disabled:!1,"label-position":"","label-width":"100px","label-suffix":":",size:"",columns:"","validate-on-rule-change":!0,"column-max-label-length":void 0,"show-message":!0}}}},data:function(){return{schema:{properties:{"label-position":{type:"string",title:"标签位置",oneOf:[{const:"right",title:"右边"},{const:"left",title:"左边"},{const:"top",title:"上边"}]},"label-width":{type:"string",title:"标签宽度"},"label-suffix":{type:"string",title:"标签后缀"},"column-max-label-length":{type:"string",title:"标签省略数量"},columns:{type:"string",title:"列数"},size:{type:"string",title:"尺寸",oneOf:[{const:"medium",title:"medium"},{const:"small",title:"small"},{const:"mini",title:"mini"}]},inline:{type:"boolean",title:"行内模式",oneOf:J},disabled:{type:"boolean",title:"表单禁用",oneOf:J},"validate-on-rule-change":{type:"boolean",title:"rules变更校验",oneOf:J},"show-message":{type:"boolean",title:"显示校验错误信息",oneOf:J}}},uiSchema:{inline:{"ui:widget":"select","ui:options":{clearable:!0}},disabled:{"ui:widget":"select","ui:options":{clearable:!0}},size:{"ui:widget":"select","ui:options":{clearable:!0}},"label-position":{"ui:widget":"select","ui:options":{clearable:!0}},"validate-on-rule-change":{"ui:widget":"select","ui:options":{clearable:!0}},"show-message":{"ui:widget":"select","ui:options":{clearable:!0}}}}}},Q=H,W=(n("8aaa"),Object(l["a"])(Q,V,R,!1,null,"12c271b6",null)),X=W.exports,Y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"componentPropsContainer"},[n("el-json-form",{ref:"form",attrs:{size:"mini","label-position":"right","label-width":"130px","label-suffix":":",model:e.innerValue,schema:e.schema,"ui-schema":e.uiSchema,"validate-on-rule-change":!1,columns:1},on:{change:e.handlerChange}}),e.value.schema&&e.value.schema.oneOf?n("option-props",{model:{value:e.value.schema.oneOf,callback:function(t){e.$set(e.value.schema,"oneOf",t)},expression:"value.schema.oneOf"}}):e._e(),e.value.schema&&e.value.schema.anyOf?n("option-props",{model:{value:e.value.schema.anyOf,callback:function(t){e.$set(e.value.schema,"anyOf",t)},expression:"value.schema.anyOf"}}):e._e(),e.value.uiSchema&&e.value.uiSchema["ui:rules"]?n("regular-props",{model:{value:e.value.uiSchema["ui:rules"],callback:function(t){e.$set(e.value.uiSchema,"ui:rules",t)},expression:"value.uiSchema['ui:rules']"}}):e._e()],1)},Z=[],ee=n("53ca"),te=(n("28a5"),n("6762"),n("2fdb"),n("456d"),n("ac6a"),n("9b02")),ne=n.n(te),oe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"optionPropsContainer"},[n("el-divider",[e._v("选项")]),n("draggable",{attrs:{list:e.value,animation:340,group:"optionItem",handle:".optionDrag"}},e._l(e.value,(function(t,o){return n("div",{key:o,staticClass:"optionItem"},[n("div",{staticClass:"optionIcon optionDrag"},[n("i",{staticClass:"el-icon-s-operation"})]),n("el-input",{attrs:{placeholder:"选项名",size:"small"},model:{value:t.title,callback:function(n){e.$set(t,"title",n)},expression:"item.title"}}),n("el-input",{attrs:{placeholder:"选项值",size:"small",value:t.const},on:{input:function(n){return e.setOptionValue(t,n)}}}),n("div",{staticClass:"closeBtn optionIcon",on:{click:function(t){return e.value.splice(o,1)}}},[n("i",{staticClass:"el-icon-remove-outline"})])],1)})),0),n("div",{staticStyle:{"margin-left":"20px"}},[n("el-button",{staticStyle:{"padding-bottom":"0"},attrs:{icon:"el-icon-circle-plus-outline",type:"text"},on:{click:e.addOption}},[e._v("\n      添加选项\n    ")])],1)],1)},ie=[],ae=n("501e"),se=n.n(ae),re={components:{draggable:_.a},props:{value:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{},watch:{},methods:{setOptionValue:function(e,t){e.const=se()(t)?+t:t},addOption:function(){this.value.push({title:"",const:""})}}},le=re,ce=(n("ddb0"),Object(l["a"])(le,oe,ie,!1,null,"e0a6f292",null)),ue=ce.exports,de=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"regularPropsContainer"},[n("el-divider",[e._v("正则校验")]),n("el-form",{attrs:{size:"mini"}},e._l(e.value,(function(t,o){return n("div",{key:o,staticClass:"regularItem"},[n("el-form-item",{attrs:{label:"表达式"}},[n("el-input",{attrs:{placeholder:"请输入正则"},model:{value:t.pattern,callback:function(n){e.$set(t,"pattern",n)},expression:"item.pattern"}})],1),n("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{label:"错误提示"}},[n("el-input",{attrs:{placeholder:"请输入错误提示"},model:{value:t.message,callback:function(n){e.$set(t,"message",n)},expression:"item.message"}})],1),n("span",{staticClass:"closeBtn",on:{click:function(t){return e.value.splice(o,1)}}},[n("i",{staticClass:"el-icon-close"})])],1)})),0),n("div",{staticStyle:{"margin-left":"20px"}},[n("el-button",{attrs:{icon:"el-icon-circle-plus-outline",type:"text"},on:{click:e.addRegular}},[e._v("\n      添加规则\n    ")])],1)],1)},pe=[],me={components:{},props:{value:{type:Array,default:function(){return[]}}},data:function(){return{}},computed:{},watch:{},methods:{addRegular:function(){this.value.push({pattern:"",message:""})}}},fe=me,he=(n("7004"),Object(l["a"])(fe,de,pe,!1,null,"5e467b11",null)),ve=he.exports,be={components:{OptionProps:ue,RegularProps:ve},props:{value:{type:Object,default:function(){}}},data:function(){return{schema:{},uiSchema:{},innerValue:{},subComponentType:"",componentName:"",list:[]}},computed:{},watch:{value:{deep:!0,handler:function(){this.initComponent()}}},methods:{initComponent:function(){this.componentName=this.value.componentName,this.subComponentType=ne()(this.value,"uiSchema.ui:widget","input");var e=Object.assign({},this.value,this.value.schema,this.value.uiSchema,this.processUiSchemaKey(this.value.uiSchema["ui:options"]));delete e.schema,delete e.uiSchema,delete e["ui:options"];var t={},n={};Object.keys(e).forEach((function(e){w.properties[e]&&(t[e]=w.properties[e]),w.uiSchema[e]&&(n[e]=w.uiSchema[e])})),this.innerValue=e,this.schema={properties:t},this.uiSchema=n},processUiSchemaKey:function(e){return Object.keys(e).forEach((function(t){if(t.includes("uiSchema.ui:options.")){var n=t.split(".").pop();delete e[n]}})),e},handlerChange:function(e,t){var n=this.loopFindKey(this.value,e);n.pop();var o=ne()(this.value,n.join("."),this.value);o[e]=t},loopFindKey:function(e,t){var n=[];for(var o in e){if("object"===Object(ee["a"])(e[o])){var i=this.loopFindKey(e[o],t);if(0!==i.length){n.push(o),n=n.concat(i);break}}if(o===t){n.push(o);break}}return n}}},ge=be,ye=(n("932c"),Object(l["a"])(ge,Y,Z,!1,null,"045f22c8",null)),we=ye.exports,Ce={components:{FormProps:X,ComponentProps:we},props:{activeComponent:{type:Object,default:function(){}},formProps:{type:Object,default:function(){}}},data:function(){return{tabeActive:"components"}}},Se=Ce,ke=(n("0c70"),Object(l["a"])(Se,K,F,!1,null,"6e81c7dc",null)),Oe=ke.exports,xe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mainContentContainer"},[n("div",{staticClass:"topArea"},[n("el-button",{attrs:{type:"text",icon:"el-icon-setting"},on:{click:e.showSortDeleteDialog}},[e._v("排序&删除")]),n("el-button",{attrs:{type:"text",icon:"el-icon-download"},on:{click:e.downloadCode}},[e._v("下载Vue文件")]),n("el-dropdown",{on:{command:e.copyCommand}},[n("el-button",{staticClass:"copyBtn",attrs:{type:"text",icon:"el-icon-document-copy"}},[e._v("复制")]),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"all"}},[e._v("复制完整代码")]),n("el-dropdown-item",{attrs:{command:"json"}},[e._v("复制Json代码")])],1)],1),n("el-button",{staticClass:"dangerText",attrs:{type:"text",icon:"el-icon-delete"},on:{click:e.empty}},[e._v("清空")])],1),n("el-scrollbar",{staticClass:"scrollBar",attrs:{vertical:!0}},[n("draggable",{staticClass:"drawingBoard",attrs:{draggable:".el-col",list:e.drawingList,animation:340,group:"componentsGroup"}},[n("el-json-form",e._b({ref:"form",attrs:{model:e.formModel,schema:e.formSchema,"ui-schema":e.formUiSchema,rules:e.rules}},"el-json-form",e.formProps,!1))],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.drawingList.length,expression:"!drawingList.length"}],staticClass:"emptyInfo"},[e._v("\n      从左侧拖入或点选组件进行表单设计\n    ")])],1),n("input",{attrs:{id:"copyNode",type:"hidden"}}),n("sort-delete-dialog",{attrs:{visible:e.visible},on:{"update:visible":function(t){e.visible=t}},model:{value:e.drawingList,callback:function(t){e.drawingList=t},expression:"drawingList"}})],1)},_e=[],je=(n("20d6"),n("7514"),n("5df3"),n("1c4c"),n("b311")),Le=n.n(je),Ae=n("21a6"),Pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{staticClass:"sortDeleteDialog",attrs:{width:"30%",title:"排序&删除",visible:e.innerVisible},on:{"update:visible":function(t){e.innerVisible=t}}},[n("draggable",{attrs:{list:e.value,animation:340,group:"componentsGroup"}},e._l(e.value,(function(t,o){return n("div",{key:o,staticClass:"item"},[n("span",[e._v(e._s(t.schema.title)+" —— "+e._s(t.key))]),n("i",{staticClass:"el-icon-delete deleteItem",on:{click:function(t){return e.value.splice(o,1)}}})])})),0),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.value.length,expression:"!value.length"}],staticClass:"emptyInfo"},[e._v("\n     暂无组件\n    ")]),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("el-button-group",{staticClass:"dialog-bt-group"},[n("el-button",{attrs:{type:"info"},on:{click:function(t){e.innerVisible=!1}}},[e._v("关闭")])],1)],1)],1)},$e=[],Ne={components:{draggable:_.a},props:{visible:{type:Boolean,default:!1},value:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{innerVisible:{get:function(){return this.visible},set:function(e){this.$emit("update:visible",e)}}},mounted:function(){},methods:{}},Ee=Ne,qe=(n("5bb5"),Object(l["a"])(Ee,Pe,$e,!1,null,"2d232ee2",null)),Ie=qe.exports,Me=n("e552"),Be=n.n(Me);function De(){return'\n<style scoped lang="scss">\n</style>'}var Te=function(e,t,n){return Be.a.js("\n  {\n    formSchema:".concat(JSON.stringify(e),",\n    formUiSchema:").concat(JSON.stringify(t),",\n    formModel:").concat(JSON.stringify(n),",\n    formRules:{}\n}\n"))};function Ue(e,t,n){return"\n<script>\nexport default {\n    components: {},\n    props: [],\n    data () {\n        return ".concat(Te(e,t,n),"\n    },\n    computed: {},\n    watch: {},\n    mounted () {},\n    methods: {\n    \n    }\n}\n<\/script>\n")}function ze(e){var t=[];return Object.keys(e).forEach((function(n){e[n]&&("string"===typeof e[n]?t.push(":".concat(n,"=\"'").concat(e[n],"'\"")):t.push(":".concat(n,'="').concat(e[n],'"')))})),'\n<template>\n    <div>\n        <el-json-form ref="form"\n            :model="formModel"\n            :schema="formSchema"\n            :ui-schema="formUiSchema"\n            :rules="formRules"\n            '.concat(t.join("\n            "),"\n            \n            />\n    </div>\n</template>\n    ")}var Ge=function(e,t,n,o){var i=ze(e)+Be.a.html(Ue(t,n,o))+De();return i};function Ke(e,t){return Array.from(e.classList).includes(t)}var Fe={components:{draggable:_.a,SortDeleteDialog:Ie},props:{drawingList:{type:Array,default:function(){return[]}},formProps:{type:Object,default:function(){}}},data:function(){return{formModel:{},formSchema:{},formUiSchema:{},rules:{},visible:!1,copyType:""}},mounted:function(){var e=this;document.querySelector(".drawingBoard").addEventListener("click",(function(t){e.bindFindComponent(t)}));var t=new Le.a("#copyNode",{text:function(){var t=e.generateCode(e.copyType);return e.$notify({title:"成功",message:"代码已复制到剪切板，可粘贴。",type:"success"}),t}});t.on("error",(function(){e.$message.error("代码复制失败")}))},watch:{drawingList:{deep:!0,handler:function(){this.initFormModel()}}},computed:{draggableComponentData:function(){return{props:{model:this.formModel,schema:this.formSchema,"ui-schema":this.formUiSchema,rules:this.rules}}}},methods:{initFormModel:function(){var e=this;console.log("drawingList change");var t=[],n={},o={},i={};this.drawingList.forEach((function(a){var s=a.key;a.isDeleted?(n[s]={},o[s]={}):(a.required&&t.push(s),n[s]=e.formSchema[s]||a.schema,o[s]=e.formUiSchema[s]||a.uiSchema,e.processUiSchemaKey(o[s]["ui:options"]),"array"===n[s].type?i[s]=e.formModel[s]||[]:i[s]=e.formModel[s]||"")})),this.formModel=i,this.formSchema={required:t,properties:n},this.formUiSchema=o,this.$nextTick((function(){e.appendKeyInfo()}))},processUiSchemaKey:function(e){Object.keys(e).forEach((function(t){if(t.includes("uiSchema.ui:options.")){var n=t.split(".").pop();e[n]=e[t]}}))},appendKeyInfo:function(){var e=this;Array.from(document.querySelectorAll(".drawingBoard .el-col")).forEach((function(t,n){t.querySelector("label").setAttribute("data-key",e.drawingList[n].key)}))},bindFindComponent:function(e){var t="",n=e.path.find((function(e){return!!e.className&&e.className.includes("el-form-item__label")}));if(n?t=n.getAttribute("data-key"):(Ke(e.target,"el-col")||Ke(e.target,"el-form-item"))&&(t=e.target.querySelector("label").getAttribute("data-key")),t){var o=this.drawingList.find((function(e){return e.key===t}));o&&(this.setActiveComponent(o),this.setActiveComponentClass(o))}},bindRomoveComponent:function(e){if(Ke(e.target,"deleteOper")){var t=e.target.parentElement.querySelector("label").getAttribute("data-key");this.removeComponentByKey(t)}},setActiveComponentClass:function(e){var t=Array.from(document.querySelectorAll(".drawingBoard .el-col")),n=t.find((function(t){return t.querySelector('label[data-key="'.concat(e.key,'"]'))})),o=document.querySelector(".drawingBoard .el-col.selected");o&&o.classList.remove("selected"),n?n.classList.add("selected"):t[t.length-1].classList.add("selected")},setActiveComponent:function(e){this.$emit("setActiveComponent",e)},removeComponentByKey:function(e){console.log(e);var t=this.drawingList.findIndex((function(t){return t.key===e}));-1!==t&&(this.drawingList[t].isDeleted=!0,this.initFormModel())},showSortDeleteDialog:function(){this.visible=!0},empty:function(){var e=this;this.$confirm("确定要清空所有组件吗？","提示",{type:"warning"}).then((function(){e.$emit("empty")}))},generateCode:function(e){return"json"===e?Te(this.formSchema,this.formUiSchema,this.formModel):Ge(this.formProps,this.formSchema,this.formUiSchema,this.formModel)},copyCommand:function(e){this.copyType=e,document.getElementById("copyNode").click()},downloadCode:function(){var e=this.generateCode(),t=new Blob([e],{type:"text/plain;charset=utf-8"});Object(Ae["saveAs"])(t,"LowCodeForm.vue")}}},Ve=Fe,Re=(n("ec84"),Object(l["a"])(Ve,xe,_e,!1,null,"72eaf0d6",null)),Je=Re.exports,He={components:{LeftSide:G,RightSide:Oe,MainContent:Je},data:function(){return{drawingList:[],activeComponent:{},formProps:{inline:!1,disabled:!1,"label-position":"","label-width":"100px","label-suffix":":",size:"",columns:void 0,"validate-on-rule-change":void 0,"column-max-label-length":void 0,"show-message":!0}}},mounted:function(){},methods:{addComponent:function(e){var t=this,n=this.$loading({lock:!0,text:"渲染中...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.drawingList.push(e),this.setActiveComponent(e),setTimeout((function(){t.$refs.mainCotent.setActiveComponentClass(e),n.close()}),200)},setActiveComponent:function(e){this.activeComponent=e},empty:function(){E(100),this.drawingList=[]}}},Qe=He,We=(n("c66b"),Object(l["a"])(Qe,m,f,!1,null,"c7873f98",null)),Xe=We.exports;o["default"].use(p["a"]);var Ye=new p["a"]({routes:[{path:"/",name:"home",component:Xe},{path:"/test",name:"test",component:function(){return n.e("chunk-2d0d7fc5").then(n.bind(null,"78c1"))}}]}),Ze=n("2f62");o["default"].use(Ze["a"]);var et=new Ze["a"].Store({state:{},mutations:{},actions:{}});n("d4f5"),n("f5df"),n("5aea");o["default"].config.productionTip=!1,o["default"].use(a.a),new o["default"]({router:Ye,store:et,render:function(e){return e(d)}}).$mount("#app")},"5aea":function(e,t,n){},"5b4c":function(e,t,n){},"5bb5":function(e,t,n){"use strict";n("b72c")},6262:function(e,t,n){},7004:function(e,t,n){"use strict";n("a5ac")},"8aaa":function(e,t,n){"use strict";n("c1d8")},"932c":function(e,t,n){"use strict";n("de58")},"964d":function(e,t,n){"use strict";n("09b7")},a5ac:function(e,t,n){},b72c:function(e,t,n){},c05b:function(e,t,n){"use strict";n("503a")},c1d8:function(e,t,n){},c66b:function(e,t,n){"use strict";n("5b4c")},ddb0:function(e,t,n){"use strict";n("2269")},de58:function(e,t,n){},ec84:function(e,t,n){"use strict";n("2ee1")}});
//# sourceMappingURL=app.8df706e1.js.map