<template>
<div style="margin-top:2vh">
  <div>
     <div class="block" style="float:left;width:180px;margin-left:30px">
    <el-date-picker
      v-model="creatdate"
      format="yyyy-MM-dd"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="创建日期" style="width:180px">
    </el-date-picker>
  </div>
    <div style="margin-top: 15px;width:50%;margin-left:calc(50px + 20%)">

    <!-- <el-input placeholder="搜索商家名称、地址、所属小组" v-model="seachinput" class="input-with-select" style="width:240px">
    
      <el-button slot="append" icon="el-icon-search" @click="getalllist"></el-button>
    </el-input> -->
     <el-input placeholder="商家名称，地址，手机号/小组名称，运维人员，手机号" v-model="seachinput" class="input-with-select">
    <!-- <el-select v-model="word_type" slot="prepend" placeholder="请选择" style="width:120px">
      <el-option label="小组信息" value="group"></el-option>
      <el-option label="商家信息" value="merchant"></el-option>
     
    </el-select> -->
    <el-button slot="append" icon="el-icon-search" @click="getalllist"></el-button>
  </el-input>
</div>
<el-row style="margin-top:15px">
 
  
 <!-- <el-button type="danger" class="f_l" style="margin-left:30px" @click="show_alt" >添加商家</el-button> -->
 <el-button style="margin-left:30px" type="success" :loading="isloading" class="f_l" @click="getalllist">{{loadingtxt}}</el-button>
 </el-row>
  </div>

  <div style="margin:20px;width:90%">

  <el-table
    :data="tableData"
    :stripe="true"
    height="470"
    border
    style="width: 100%">
     <el-table-column
   
      label="状态"
      width="80">
        <template slot-scope="scope">
          <div style="width:100%;height:100%;text-align:center">
          <el-button type="warning danger" icon="el-icon-warning" circle  size="mini" ></el-button>
         
          </div>
         
      </template>
    </el-table-column>

     <el-table-column
      prop="merchant_name"
      width="140"
      label="商家名称">
    </el-table-column>
      <el-table-column
     
      label="联系人"
      width="120">
      <template slot-scope="scope">
          <div style="width:100%;height:100%">
            <div> {{scope.row.user_name}}</div> 
             <div> {{scope.row.phone}}</div> 
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      width="160"
      label="地址">
    </el-table-column>

     <el-table-column
      prop="clear_interval"
      width="80"
      label="清理周期">
    </el-table-column>
  
  
    <el-table-column
     width="120"
      label="小程序码"
      >
      <template slot-scope="scope">
          <div style="width:100%;height:100%">
             <el-image 
              style="width:60px;height:60px;margin-left:calc(50% - 30px)"
              :src="scope.row.mini_app_qrcode" 
              :preview-src-list="[scope.row.mini_app_qrcode]"
              >
            </el-image>
              <!-- <img :src="scope.row.mini_app_qrcode" alt="" style="width:60px;height:60px;margin-left:calc(50% - 30px)"> -->
              <!-- <el-button type="text" size="small">{{scope.row.p_url}}</el-button> -->
          </div>
      </template>
    </el-table-column>
    <el-table-column
     width="160"
      label="门店照"
      >
      <template slot-scope="scope">
          <div style="width:100%;height:100%">
             <el-image 
             style="width:120px;height:60px;margin-left:calc(50% - 60px)"
              :src="scope.row.merchant_image" 
              :preview-src-list="[scope.row.merchant_image]"
              >
            </el-image>
           
          </div>
      </template>
    </el-table-column>
   <el-table-column
    min-width="160"
      label="商家微信信息"
      >
      <template  slot-scope="scope">
        <img :src="scope.row.user.avatar" alt="" style="width:45px;height:45px;margin-left:calc(50% - 22px);border-radius:50%" v-if="scope.row.user!==null">
       <el-button  style="width:100%" type="text" size="small" v-if="scope.row.user!==null">{{scope.row.user.username}}</el-button>
       <el-button   type="primary" size="small" v-if="scope.row.user!==null" style="margin-left:40px" @click="loaduserlist(scope.row)">更换人员</el-button>
        <el-button  type="primary" size="small" v-if="scope.row.user==null" @click="loaduserlist(scope.row)" style="margin-left:44px">去绑定</el-button>
      </template>
    </el-table-column>
  <el-table-column
    min-width="160"
      label="归属小组"
     >
      <template  slot-scope="scope">
       <!-- <router-link :to="'/orderbyc/122'">
            <el-button type="primary" size="small" icon="el-icon-edit">
              测试
            </el-button>
          </router-link> -->


       <el-button type="text" size="small" v-if="scope.row.group.id" >{{scope.row.group.group_name}}</el-button>

      </template>
    </el-table-column>
       <el-table-column
      prop="clear_datetime"
      label="上次清理日期"
      width="180">
    </el-table-column>
  <el-table-column
      prop="next_clear_date_time"
      label="下次清理日期"
      width="180">
    </el-table-column>
  <el-table-column
      prop="create_time"
      label="创建时间"
      width="180">
    </el-table-column>
  <el-table-column
    min-width="200"
      label="操作"
      >
      <template  slot-scope="scope">
        <el-button  type="text" size="small" @click="del_m(scope.row)">删除</el-button>
        <el-button type="text" size="small" @click="showM(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="toDetail(scope.row)">清理记录</el-button>
      </template>
    </el-table-column>
   
  
  </el-table>
    <div  class="alt_1001" v-if="showadd">
    <div class="alt_model" @click="close_alt">
    </div>
    <div class="alt_1002">
      <el-row>
        <el-col :span="20" :offset="1" class="h_40 t_x_l t_t">添加新的商家</el-col>
        <el-col :span="2" class="t_t h_40 t_x_c" ><span @click="close_alt">X</span></el-col>
      </el-row>
    
      <addProduct @change-alt="changealt"></addProduct>
    </div>
  </div>
</div>
<el-pagination
  background
  layout="prev, pager, next,sizes"
   :page-sizes="[10,20,50,100]"
       @size-change="changesize"     
  :page-size="pageinfo.page_size"
  :current-page="pageinfo.current_page"
  @current-change="changeCurrent"
  :total="pageinfo.total">
</el-pagination>
<el-drawer
  title="商家信息"
  :visible.sync="m_visible"
  :direction="direction"
  :before-close="handleClose">
  <div>
    <el-button type="primary" @click="editMinfo" >保存修改</el-button>
    <el-input placeholder="请输入内容" v-model="show_merchant_json.merchant_name">
     <template slot="prepend">商家名称</template>
    </el-input>
    <el-input placeholder="请输入内容" v-model="show_merchant_json.user_name">
     <template slot="prepend">联 系 人</template>
    </el-input>
     <el-input placeholder="请输入内容" v-model="show_merchant_json.phone">
     <template slot="prepend">联系电话</template>
    </el-input>
    <el-input placeholder="请输入内容" v-model="show_merchant_json.address">
     <template slot="prepend">商家地址</template>
    </el-input>
     <el-input placeholder="请输入内容" v-model="show_merchant_json.clear_interval">
     <template slot="prepend">清理周期</template>
    </el-input>
     <el-select v-model="group" placeholder="请选择"  @change="changeGroup" style="width:100%">
     
      <el-option
            v-for="item in groupList"
            :key="item.group_id"
            :label="item.group_name"
            :value="item.group_id">
            </el-option>
  </el-select>
    <div style="width:300px;height:200px;float:left">
      <!-- <div style="float:left;width:90%;height:20px;font-size:16px;text-align:left;padding-left:6%">门头图：</div>  -->
      <el-upload
      class="avatar-uploader"
      action="https://dongman.zhongduyun.com/upload/images"
      :show-file-list="false"
      name="img"
      :on-success="handleAvatarSuccess"
      style="width:300px;height:200px">
      <img v-if="show_merchant_json.merchant_image" :src="show_merchant_json.merchant_image" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>
    <div style="width:100%;height:calc(100vh - 500px);margin-top:200px">
       
    </div>
  </div>
</el-drawer>
<el-drawer
  title="绑定商家微信"
  :visible.sync="drawerVisible"
  :direction="direction"
  size="30%"
  :before-close="handleClose">
<div style="margin-top: 15px;">
  <el-input placeholder="搜索微信昵称" v-model="nickname" class="input-with-select">
   
    <el-button slot="append" icon="el-icon-search" @click="loaduser"></el-button>
  </el-input>
  <div style="width:100%;height:50px;line-height:50px;border-bottom:1px solid #999999;padding:5px 5%" v-for="(item ,index)  in userlist" :key="index">
   <div ><img :src="item.avatar" alt="" style="height:40px;width:40px;float:left;border-radius:50%;border:1px solid #eaeaea;"></div>
   <div style="float:left;margin-left:10px;width:130px;text-align:left;overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;">{{item.username}}</div>
<div style="width:70px;height:100%;float:right"><el-button size="small" type="primary" @click="bindUser(item)">绑定</el-button></div>
  </div>
</div>
</el-drawer>

</div>
</template>

<style scoped>
  .formrow{width: 90%;margin-left: 5%;height: 50px;line-height: 50px;font-size: 15px;}
  .formlabel{width: 120px;height: 100%;line-height: 30px;text-align: right;float: left;}
  .formrowvalue{width: calc(100% - 130px);float: right;text-align: center;color: rgb(214, 120, 13);}
</style>
<style scoped>
  .el-select .el-input {
    width: 50px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .f_l{float:left}

   .alt_1001{position: fixed;z-index: 1001;left: 0%;top: 0%;width: 100%;height: 100%;}
  .alt_model{background: rgba(0, 0, 0, .6);width: 100%;height:100%}
  .alt_1002{background: #fff;position: absolute;width: 790px;height: 600px;z-index: 1002;
  top:calc(50% - 250px);left: calc(50% - 345px);border-radius: 4px;}


  .h_40{height: 40px;padding: 5px 0px;}
.t_x_l{text-align: left;}
.t_x_c{text-align: center;}
.t_t{font-size: 22px;border-bottom: 1px solid #444;}
</style>
<style scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px!important;
    cursor: pointer!important;
    position: relative!important;
    overflow: hidden!important;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px!important;
    color: #8c939d!important;
    width: 300px!important;
    height: 300px!important;
    line-height: 300px!important;
    text-align: center!important;
  }
  .avatar {
    width: 280px!important;
    height: auto!important;
    display: block!important;
    margin-left: -100px!important;

  }
</style>
<script>
import addProduct from "./components/addProduct.vue"

import { get_store,del_m,get_allUser ,update_store,find_merchant,get_allGroup} from "@api";
  export default {
      components:{addProduct},
    data() {
      return {
        count:20,
        m_visible:false,//商家信息抽屉
        isloading:false,//刷新按钮
        loadingtxt:"",//刷新按钮label
      drawerVisible: false,//抽屉显隐
      nickname:"",//搜索的微信昵称
      userlist:[],
      prtdetail:"",//prt详情
      pageinfo:{
       total:1,
       page_size:10,
       current_page:1,
      
      },
      imageUrl:"",
      word_type:"merchant",
      updateJson:{},//更新数据
     show_merchant_json:{},//商家抽屉页商家信息
      showadd:false,
      seachinput: '',
      seachinput2:'',
      groupList:[],
      creatdate:"",
      group:"",
        tableData: [],
        clear_time:"ongoing"//筛选类型 over 红色：代表已过清理时间，立刻清理
                      // normal 绿色：代表正常的清理时间
                      // ongoing 黄色：代表剩余一天（24小时），已到清理时间，需要去清理
      }
    },
    watch:{
      
    },
    computed:{
    
    },
    mounted(){
     this.getalllist()
    //  this.get_group()
    },
    methods:{
      changeGroup(e){
         console.log(e)
          this.group=e
          console.log(this.group)
        //  this.then_sel(e)
      },
         then_sel(str){
            let _this=this;
            let datas=this.groupList;
         for(let i=0;i<datas.length;i++){
               if(datas[i].group_id==str){
                  //  this.group_sel=datas[i].group_name
                   this.group=datas[i].group_id
               }
            }
        },
      get_group(){
        let data={
          per:1000,
          page:1
        }
        let _this=this;
       get_allGroup(data)
        .then((res) => {
         console.log(res)
         if(res.code==1){
 _this.groupList=res.data.data
 
         }
        
        })
        .catch((err) => {})
      },
      filterHandler(value,row){
       console.log(row)
       if(value=="over")
       return row.diff_hour<0
       if(value=="ongoing")
       return row.diff_hour<24&&row.diff_hour>=0
       if(value=="normal")
       return row.diff_hour>=24
      },
      toDetail(data){
         this.$router.push({ name:'applist', query: { merchant_id: data.merchant_id,group_id:data.group_id }})
      },
      load () {//无限滚动
        this.count += 2
      },
      find_merchant(e){//查看商家详情
      let _this=this;
      console.log(e)
      let data={
        id:e.merchant_id
      }
        find_merchant(data)
        .then((res) => {
         console.log(res)
         if(res.code==1)
         _this.show_merchant_json=res.data
         _this.group=res.data.group_id
        })
        .catch((err) => {})
      },
    del_m(e){
      let _this=this;
      let data={
       id:e.merchant_id
      }
        this.$confirm('此操作将永久删除该商家, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           del_m(data)
      .then(res=>{
         console.log(res)
          if(res.code==1){
            _this.$message(
            "success",
            '删除成功!'
            );
          }
       })
       .catch(err=>{

       })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      console.log(e)
      // return
     
    },
      changesize(n){
      this.pageinfo.page_size=n
       this.getalllist()
      },
     changeCurrent(n){
       this.pageinfo.current_page=n
       this.getalllist()
     },
    
      //上传成功回调
      handleAvatarSuccess(response, file, fileList){
        console.log(response)
        if(response.code==1)
          this.show_merchant_json.merchant_image=response.data.url
      },
      bindUser(userinfo){
 let data=this.updateJson
     console.log(data)
     let   mydata={
          "group_id":this.updateJson.group_id+"",
          "merchant_name":this.updateJson.merchant_name,
          "user_name":this.updateJson.user_name,
          "phone":this.updateJson.phone,
          "address":this.updateJson.address,
          "clear_interval":this.updateJson.clear_interval+"",
          "user_id":userinfo.id+"",
          "merchant_image":this.updateJson.merchant_image,
          "merchant_id":this.updateJson.merchant_id,
        }
     console.log(mydata)
      
        this.update_store(mydata)
      },
      editMinfo(){
        // alert(this.show_merchant_json.group_id)
       let data=this.show_merchant_json
        data={
          "group_id":this.group+"",
          "merchant_name":this.show_merchant_json.merchant_name,
          "user_name":this.show_merchant_json.user_name,
          "phone":this.show_merchant_json.phone,
          "address":this.show_merchant_json.address,
          "clear_interval":this.show_merchant_json.clear_interval+"",
          "user_id":this.show_merchant_json.user_id,
          "merchant_image":this.show_merchant_json.merchant_image,
          "merchant_id":this.show_merchant_json.merchant_id,
        }
        this.update_store(data)
      },
      update_store(data){
       let _this=this;
       console.log(data)
       update_store(data)
       .then(res=>{
         console.log(res)
          if(res.code==1){
             _this.$message(
            "success",
            '成功!'
            );
            _this.getalllist()
          } else{
                _this.$message(
            "error",
            res.error
            );
          }
       })
       .catch(err=>{

       })
      },
   
      loaduser(){
        let _this=this;
        let data={
          page:1,
          per:50,
          keyword:this.nickname
        }
       get_allUser(data)
       .then(res=>{
         
           _this.userlist=res.data.data
           console.log(_this.userlist)
       })
       .catch(err=>{

       })
      },
      loaduserlist(data){
        
       this.visible()
      this.updateJson=data;
      console.log(this.updateJson)
       this.loaduser()
        

      },
      footerOk() {//页脚确认绑定事件，使用默认页脚时有效
      console.log("footerok");
    },
    footerCal() {//页脚取消绑定事件，使用默认页脚时有效	
      
    },
       // 监听关闭事件
    close() {
      console.log(1)
    },
       visible() {//显示抽屉页
       this.drawerVisible = true;
       
       },
        showM(data) {//显示商家信息抽屉页
       this.m_visible = true;
       this.get_group()
      //  alert(JSON.stringify(data) )
       this.find_merchant(data)
       },
       changealt(data){
         console.log(data)
         this.showadd=data;
         this.getalllist()
       },
         show_alt(){
           console.log(this.showadd)
       this.showadd=true;
      },
      close_alt(){
       
       this.showadd=false;

      },
      
      getalllist(){//获取列表
        let _this=this;
      
        this.isloading=true;
        let data={
          per:_this.pageinfo.page_size,
          page:_this.pageinfo.current_page,
          keyword:_this.seachinput,
          // keyword_type:_this.word_type,
          clear_time_sort:"asc",
          clear_time:_this.clear_time,
          create_time:_this.creatdate,
          
        }
            get_store(data)
            .then(res =>{
              console.log(res)
              _this.isloading=false;
              _this.loadingtxt="刷新"
              let data=res.data;
            _this.tableData=data.data;
            _this.pageinfo.total=data.count
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
