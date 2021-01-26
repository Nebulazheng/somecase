<template>
<div>
  <el-row style="width:80%;margin-left:10%;font-size:17px;margin-top:15px">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">运营方</el-col>
        <el-col :span="10"  style="height:50px;">
          <div style="width:100%;height:40px">
           <el-select v-model="cyuser" placeholder="请选择" style="width:220px">
            <el-option
            v-for="item in y_user"
            :key="item.y_uuid"
            :label="item.y_name"
            :value="item.y_uuid">
            </el-option>
           </el-select>
          </div>
        </el-col>
  </el-row>
 <el-row style="width:80%;margin-left:10%;font-size:15px;margin-top:15px">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">APP名称</el-col>
        <el-col :span="10"  style="height:50px;padding-left:4px">
          <div style="width:220px;height:40px">
           <el-input placeholder="请输入内容" v-model="appName" class="input-with-select" >
            <!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
            </el-input>
          </div>
        </el-col>
  </el-row>

  <el-button type="success" @click="addApp" style="margin-top:80px" plain>立即添加</el-button>
</div>

</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>

.sel_c{width: 250px;height: 40px;}

</style>
<script>
import {  find_allYuser,post_yapp} from "../../../api/api.js";
import { isEnter } from "../../../util/index.js";
  export default {
      name: 'alertbox',
    data() {
      return {
          cyuser:'',
          y_user:[],
         appName:"",
       
      }
    },
    mounted(){
      this.getYuser()
    },
    methods:{
        //向父组件传值
      toParent:function() {
            this.$emit('change-alt', false)
        },
      //超出文件个数钩子函数
      exceedNum(files, fileList){
        let _this=this;
       _this.$message("error",'只允许上传单张图片!');
      },
        //获取运营方
       getYuser(){
         let _this=this;
          find_allYuser()
            .then(res =>{
                let datas=res.result.row;
           _this.y_user=datas;
            })
            .catch(err=>{
              console.log(err)
            })
       },
       addApp(){
         let _this=this;
         if(isEnter(this.appName)&&isEnter(this.cyuser)){
           let data={
              yAppName:this.appName,
              yUuid:this.cyuser,
              creatTime: new Date().Format("yyyy-MM-dd HH:mm:ss") 
            }
            post_yapp(data)
            .then(res=>{
              console.log(res)
            if(res.success){
              _this.toParent()
            }
            })
            .catch(err=>{

            })
         }else{
           _this.$message("error",'请完整填写信息!');
           return;
         }
        
       },
        submitUpload() {
        this.$refs.upload.submit();
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