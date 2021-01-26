<template>
<div>
<div style="width:300px;height:200px;margin-top:100px;padding-left:30px">
  <el-switch
  style="display: block;float:left;width:100%"
  v-model="value1"
  active-text="中英切换"
  >
</el-switch>
<p>
  <el-switch
  style="display: block;float:left;width:100%;margin-top:10px"
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="允许全屏"
  >
</el-switch>
</p>
<p>
  <el-switch
  style="display: block;float:left;width:100%;margin-top:10px"
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="退清缓存"
  >
</el-switch>
</p>
</div>
<div style="width:100%;text-align:left;font-size:18px;margin-left:35px">封面背景图：</div> 
  <div class="cct">
    <div v-for="(item,index) in imgUrls" style="width:200px;height:120px;float:left;margin:5px" :key="index">
          <el-image
      style="width: 100%; height: 90px"
      :src="item"
      :fit="contain"
      ></el-image>
      <div style="width:100%;height:30px;background:red;line-height:30px;color:#fff;font-size:18px;font-weight:600" @click="delimg(index)">移除此图</div>
    </div>
  

  </div>
  <div>
  
  <el-upload
  class="upload-demo"
  action="https://dongman.zhongduyun.com/upload/images"
  list-type="picture-card"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  show-file-list="false"
  :on-success="imgupsuccess"
  :on-exceed="exceedNum"
  :on-change="changeImg"
  accept="*image"
  name="img"
  :limit="5"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
  <el-button size="medium" type="primary" @click="take" style="width:120px">保存</el-button>
 </div>
</template>
<style>
.imagerow{width:100%;height:100%;border: 1px solid #444;}
.cct{width: 87%;height:340px;padding: 20px 5%;border: 1px solid #666;margin-left: 3%;margin-top: 10px;}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<script>


import { post_setting,get_setting} from "@api";
export default {
   data() {
      return {
         imgUrls:["http://www.qzszyy.com/Content/qzszyy/images/ba02.jpg"],
         fileList:[],
          dialogImageUrl: '',
        dialogVisible: false,
        value1: true,
        value2: true
      }
   },
   mounted(){
  //  this.getSetting()
   },
   methods:{
     getSetting(){
        get_setting()
       .then(res =>{
           console.log("res::",res)
          if(res.code==1){
            this.imgUrls=res.data.value
          }
            })
            .catch(err=>{
              console.log(err)
            })
     },
     delimg(idx){
      console.log(idx)
      let arr=[]
      for(let i=0;i<this.imgUrls.length;i++){
        if(i!=idx)
        arr.push(this.imgUrls[i])
      }
      this.imgUrls=arr
     },
      testtake(){
       if(this.imgUrls.length==0){
          this.$message("info",'至少需要一张图!');
          return;
       }
       let data={
         "key":"cmpinfo",
          "value":"浙江东曼环境治理有限公司成立于2019年，注册资本1000万，我公司以城市环境综合运营为主营业务，可以专业化提城市环境从前端垃圾分类、道路清扫、扫雪铲冰、河道清理、公厕管理、化粪池清掏，疏通，中端垃圾收集、转运以及末端垃圾就地资源化处理的完整解决方案。",
          "type":"string"
       }
      post_setting(data)
       .then(res =>{
           console.log("res::",res)
          
            })
            .catch(err=>{
              console.log(err)
            })
     },
     take(){
       if(this.imgUrls.length==0){
          this.$message("info",'至少需要一张图!');
          return;
       }
       let data={
         "key":"swiper",
          "value":this.imgUrls,
          "type":"array"
       }
      post_setting(data)
       .then(res =>{
           console.log("res::",res)
          
            })
            .catch(err=>{
              console.log(err)
            })
     },
          //超出文件个数钩子函数
      exceedNum(files, fileList){
        let _this=this;
        
       _this.$message("error",'只允许上传5张图片!');
      },
        imgupsuccess(response, file, fileList){
          console.log(response)
          this.imgUrls.push(response.data.url)
         
          console.log(this.imgUrls)
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      
      beforeAvatarUpload(file) {
          let _this=this;
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 6;

        if (!isJPG) {
          _this.$message("info",'上传头像图片只能是 JPG png格式!');
        }
        if (!isLt2M) {
          _this.$message("info",'上传头像图片大小不能超过 6MB!');
        }
        return isJPG && isLt2M;
      }
   }
}
</script>