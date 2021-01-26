<template>
<div>
  <el-row class="row_m">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">所属病症</el-col>
        <el-col :span="5"  style="height:50px;">
          <div style="width:180px;height:40px">
           <el-select v-model="group_sel" placeholder="请选择"  @change="sel_group" >
            <el-option
            v-for="item in group_list"
            :key="item"
            :label="item"
           
            :value="item">
            </el-option>
           </el-select>
          </div>
        </el-col>
     
  </el-row>
  
 <el-row class="row_m">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">商家名称</el-col>
        <el-col :span="10"  style="height:50px;padding-left:4px">
          <div style="width:180px;height:40px">
           <el-input placeholder="请输入内容" v-model="merchant_name" class="input-with-select" >
            <!-- <el-button slot="append" icon="el-icon-search" @click="seachName"></el-button> -->
            </el-input>
          </div>
        </el-col>
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:left"> <span style="color:blue">{{seacherrmessage}}</span></el-col>
  </el-row>
   <el-row class="row_m">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">患者姓名</el-col>
        <el-col :span="5"  style="height:50px;padding-left:4px">
          <div style="width:180px;height:40px">
           <el-input placeholder="请输入内容" v-model="user_name" class="input-with-select" >
           
            </el-input>
          </div>
        </el-col>
         <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">患者电话</el-col>
        <el-col :span="5"  style="height:50px;padding-left:4px">
          <div style="width:180px;height:40px">
           <el-input placeholder="输入内容" v-model="phone" class="input-with-select" >
           
            </el-input>
          </div>
        </el-col>
  </el-row>

<el-row class="row_m">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">患者住址</el-col>
        <el-col :span="5"  style="height:50px;padding-left:4px">
          <div style="width:180px;height:40px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="患者住址"
            v-model="address">
            </el-input>
          </div>
        </el-col>
         <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">过敏史</el-col>
        <el-col :span="5"  style="height:50px;padding-left:4px">
          <div style="width:180px;height:40px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="过敏史"
            v-model="address">
            </el-input>
          </div>
        </el-col>
     
  </el-row>
 <el-row class="row_m">
       
       <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">患者年龄</el-col>
        <el-col :span="7"  style="height:50px;padding-left:4px;margin-left:7px">
          <div style="width:180px;height:40px">
           <el-input-number v-model="clear_interval" @change="handleChange" :min="40" type="number" :max="9999" label="输入值（n）* 1%" style="width:180px;margin-left:-16px"></el-input-number>
          </div>
        </el-col>
  </el-row>
    <el-row class="row_m">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">患者照片</el-col>
        <el-col :span="10"  style="height:50px;padding-left:4px;">
          <div >
         <el-upload
  class="upload-demo"
  action="https://dongman.zhongduyun.com/upload/images"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-success="imgupsuccess"
  :on-exceed="exceedNum"
  :on-change="changeImg"
  accept="*image"
  name="img"
  :limit="1"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
      
          </div>
        </el-col>
  </el-row>
  <el-button type="success" plain style="width:120px;margin-top:150px" @click="postprt">提交</el-button>
</div>

</template>
<style >
  .el-upload{width:80px;height: 80px;}
</style>
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
  .row_m{width:90%;margin-left:5%;font-size:17px;margin-top:10px}
</style>
<style scoped>

.sel_c{width: 250px;height: 40px;}

</style>
<script>
import { post_merchant, get_allGroup,get_onePrt} from "../../../api/api.js";
import { isEnter } from "../../../util/index.js";
  export default {
      name: 'addProduct',
    data() {
      
      return {
        fileList: [],
           pageinfo:{//分页组件的参数
                page_count:'',
                total:100,
                page_size:200,
                current_page:1,
                },
          merchant_name:'',//商家名称
          user_name:"",
         
            address:"",//地址
        clear_interval:"",//清理周期
        group_list:["髋关节置换"],
        group_sel:"",
        group_id:"",//组id
        user_id:[],//用户id
        merchant_image:"",//门头图片
       
        phone:""//联系人电话
      }
    },
    mounted(){
       this.get_allGroup()
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
      
        sel_group(e){//选择组
      
         this.group_sel=""
          this.then_sel_yuser(e)
        },
        then_sel_yuser(str){
            let _this=this;
            let datas=this.group_list;
         for(let i=0;i<datas.length;i++){
               if(datas[i].group_id==str){
                   this.group_sel=datas[i].group_name
                   this.group_sel=datas[i].group_id
               }
            }
        },
          get_allGroup(){//获取组列表
        let _this=this;
        let data={
          per:_this.page_size,
          page:_this.current,
        }
            get_allGroup(data)
            .then(res =>{
                let datas=res.data.data;
                _this.group_list=datas
               console.log(datas)
        
            })
            .catch(err=>{
              console.log(err)
            })
      },
//新增
  postprt(){
    let _this=this;
         
           if(isEnter(this.group_sel)){
                  let data={
                      "group_id":this.group_sel,
                      "merchant_name":this.merchant_name,
                      "user_name":this.user_name,
                      "phone":this.phone,
                      "address":this.address,
                      "clear_interval":this.clear_interval,
                      "merchant_image":this.merchant_image
                    }
            post_merchant(data)
            .then(res=>{
                console.log(res)
                if(res.code==1){
                    this.$message("success", "添加成功！");
                   _this.toParent()
                }
            })
            .catch(err=>{
                console.log(err)
                })
             
           }else{
            this.$message("error", "请确认填写完毕！");
             return;
           }
         
        },
      imgupsuccess(response, file, fileList){
          console.log(response)
           this.merchant_image=""
          if(response.code==1){
             this.merchant_image=response.data.url
          }
          
           console.log(file)
            console.log(fileList)
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