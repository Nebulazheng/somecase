(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-e465f348"],{"45cd":function(t,e,n){},e9a7:function(t,e,n){"use strict";n.r(e);var i=n("4260"),o={props:{value:{type:String,default:""},height:{type:String,default:"200px"},width:{type:String}},data:function(){return{id:"editor-"+Object(i.a)(),content:this.value}},mounted:function(){var t=this;tinymce.init({selector:"#"+t.id,language_url:"http://tools.xiaoyaoji.cn/form/lib/tinymce/zh_CN.js",language:"zh_CN",height:this.height,menubar:!1,init_instance_callback:function(e){e.on("input change undo redo",(function(){t.$emit("input",e.getContent())}))},setup:function(e){e.on("input change undo redo",(function(){t.$emit("input",e.getContent())}))},plugins:["advlist autolink lists link image charmap print preview anchor textcolor colorpicker","searchreplace visualblocks code fullscreen","insertdatetime table media  contextmenu paste code help wordcount"],toolbar:"insert table | undo redo |  formatselect | bold italic strikethrough forecolor backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | code "})},methods:{setHtml:function(t){this.content=t,tinymce.activeEditor.setContent(t),this.$emit("input",t)}},beforeDestroy:function(){tinymce.get(this.id).destroy()},watch:{value:function(t){this.content=t}}},c=(n("f9c5"),n("2877")),a=Object(c.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"fm-editor-container",style:{width:this.width}},[e("textarea",{attrs:{id:this.id},domProps:{value:this.content}})])}),[],!1,null,null,null);e.default=a.exports},f9c5:function(t,e,n){"use strict";var i=n("45cd");n.n(i).a}}]);