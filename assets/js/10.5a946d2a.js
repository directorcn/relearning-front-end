(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{342:function(e,t,i){},413:function(e,t,i){"use strict";i(342)},426:function(e,t,i){"use strict";i.r(t);var a={name:"ifc",data:function(){return{vertical:"baseline",boxesVertical:"baseline",text:" World!",visiblity:"hidden",isShow:"hidden",visibleList:["hidden","visible"],baselineList:["baseline","top","middle","bottom"],baseList:[{key:"baseline",value:"baseline"},{key:"top",value:"top"},{key:"middle",value:"middle"},{key:"bottom",value:"bottom"},{key:"无文本",value:"noText"}]}},props:{type:{type:String,default:"1"}},mounted:function(){var e=this,t=document.getElementsByClassName("radio-group")[0],i=document.getElementsByClassName("radioes")[0],a=document.getElementsByClassName("vertical-radioes")[0],s=document.getElementsByClassName("radioes")[1],l=document.getElementsByClassName("vertical-radioes")[1];t.addEventListener("click",(function(t){var i=t.target;"input"===i.tagName.toLowerCase()&&"1"===e.type&&("noText"===i.value?(e.vertical="baseline",e.text=""):(e.vertical=i.value,e.text=" World!"))})),this.handlerChange(i,"visiblity","2"),this.handlerChange(a,"vertical","2"),this.handlerChange(s,"isShow","2"),this.handlerChange(l,"boxesVertical","2")},methods:{handlerChange:function(e,t,i){var a=this;e.addEventListener("click",(function(e){var s=e.target;"input"===s.tagName.toLowerCase()&&a.type===i&&(a[t]=s.value)}))}}},s=(i(413),i(45)),l=Object(s.a)(a,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticStyle:{"font-size":"44px","line-height":"100px","background-color":"lightgreen",margin:"20px 0"}},[i("div",{staticClass:"base",style:{verticalAlign:e.vertical}},[i("div",{staticStyle:{width:"740px",height:"2px","background-color":"orange"}})]),e._v(" "),"2"===e.type&&"visible"===e.isShow?i("div",{staticClass:"base",style:{verticalAlign:e.boxesVertical}},[i("div",{staticStyle:{width:"740px",height:"2px","background-color":"orangered"}})]):e._e(),e._v("\n    Hello "),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"===e.type,expression:"type === '1'"}],staticClass:"text",style:{verticalAlign:e.vertical},domProps:{textContent:e._s(e.text)}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"2"===e.type&&"visible"===e.visiblity,expression:"type === '2' && visiblity === 'visible'"}],staticClass:"box",style:{verticalAlign:e.vertical}}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"2"===e.type&&"visible"===e.isShow,expression:"type === '2' && isShow === 'visible'"}],staticClass:"boxes",style:{verticalAlign:e.boxesVertical}})]),e._v(" "),"1"===e.type?i("div",{staticClass:"radio-group marg"},[e._v("改变 World 的 vertical-align属性 \n    "),e._l(e.baseList,(function(t,a){return i("label",{key:t.key},[i("input",{attrs:{name:"vertical",type:"radio"},domProps:{value:t.value,checked:0===a||""}}),e._v(" "+e._s(t.key)+"\n    ")])}))],2):e._e(),e._v(" "),"2"===e.type?i("div",{staticClass:"radioes marg"},[e._v("显示 height 为 300px 的行盒 "),i("span",{staticClass:"orange"}),e._v(" "),e._l(e.visibleList,(function(t,a){return i("label",{key:a},[i("input",{attrs:{name:"visiblity",type:"radio"},domProps:{value:t,checked:0===a||""}}),e._v(" "+e._s(t)+"\n    ")])}))],2):e._e(),e._v(" "),"2"===e.type?i("div",{staticClass:"vertical-radioes marg"},[e._v("改变 "),i("span",{staticClass:"orange"}),e._v(" baseline \n    "),e._l(e.baselineList,(function(t,a){return i("label",{key:a},[i("input",{attrs:{name:"vertical-1",type:"radio"},domProps:{value:t,checked:0===a||""}}),e._v(" "+e._s(t)+"\n    ")])}))],2):e._e(),e._v(" "),"2"===e.type?i("div",{staticClass:"radioes marg"},[e._v("显示 height 为 200px 的行盒 "),i("span",{staticClass:"orangered"}),e._v(" "),e._l(e.visibleList,(function(t,a){return i("label",{key:a},[i("input",{attrs:{name:"visiblity-2",type:"radio"},domProps:{value:t,checked:0===a||""}}),e._v(" "+e._s(t)+"\n    ")])}))],2):e._e(),e._v(" "),"2"===e.type?i("div",{staticClass:"vertical-radioes marg"},[e._v("改变 "),i("span",{staticClass:"orangered"}),e._v(" baseline \n    "),e._l(e.baselineList,(function(t,a){return i("label",{key:a},[i("input",{attrs:{name:"vertical-2",type:"radio"},domProps:{value:t,checked:0===a||""}}),e._v(" "+e._s(t)+"\n    ")])}))],2):e._e()])}),[],!1,null,"4a0aacda",null);t.default=l.exports}}]);