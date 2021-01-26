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
     <el-input placeholder="搜索关键词" v-model="seachinput" class="input-with-select">
    <!-- <el-select v-model="word_type" slot="prepend" placeholder="请选择" style="width:120px">
      <el-option label="小组信息" value="group"></el-option>
      <el-option label="商家信息" value="merchant"></el-option>
     
    </el-select> -->
    <el-button slot="append" icon="el-icon-search" @click="getalllist"></el-button>
  </el-input>
</div>
<el-row style="margin-top:15px">
 
  
 <!-- <el-button type="primary" class="f_l" style="margin-left:30px" @click="show_alt" >添加档案</el-button> -->
 <el-button type="info"  class="f_l" style="margin-left:30px" @click="getalllist">刷新</el-button>
 <el-button type="warning"  class="f_l" @click="doget('ongoing')">康复中</el-button>

  <el-button type="danger"  class="f_l" @click="doget('over')">已结束</el-button>
   <el-button type="success"  class="f_l" @click="doget('normal')">未开始</el-button>
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
          <el-button type="warning " icon="el-icon-warning" circle v-show="scope.row.status=='1'" size="mini" ></el-button>
          <el-button type="danger" icon="el-icon-warning" circle v-show="scope.row.status=='2'" size="mini"  style="margin-left: -2px;"></el-button>
          <el-button type="success" icon="el-icon-check" circle v-show="scope.row.status=='3'" size="mini" style="margin-left: -2px;"></el-button>
          </div>
         
      </template>
    </el-table-column>

     <el-table-column
      prop="names"
      width="140"
      label="姓名">
    </el-table-column>
      <el-table-column
     
      label="病症"
      width="120">
      <template slot-scope="scope">
          <div style="width:100%;height:100%">
            <div> {{scope.row.bing}}</div> 
             <!-- <div> {{scope.row.phone}}</div>  -->
          </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ke"
      width="160"
      label="学习课程">
    </el-table-column>

     <el-table-column
      prop="allke"
      width="80"
      label="总课时">
    </el-table-column>
   <el-table-column
      prop="iske"
      width="80"
      label="已学习课时">
    </el-table-column>
  

       <el-table-column
      prop="starttime"
      label="开始日期"
      width="180">
    </el-table-column>


  <el-table-column
    min-width="200"
      label="操作"
      >
      <template  slot-scope="scope">
        <el-button  type="text" size="small" @click="del_m(scope.row)">查看</el-button>
        <!-- <el-button type="text" size="small" @click="showM(scope.row)">编辑</el-button>
        <el-button type="text" size="small" @click="toDetail(scope.row)">清理记录</el-button> -->
      </template>
    </el-table-column>
   
  
  </el-table>
    <div  class="alt_1001" v-if="showadd">
    <div class="alt_model" @click="close_alt">
    </div>
    <div class="alt_1002">
      <el-row>
        <el-col :span="20" :offset="1" class="h_40 t_x_l t_t">添加新的档案</el-col>
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
        tableData: [
         {status:"1",names:"李报国",bing:"髋关节置换",ke:"髋关节置换术后康复训练课程",allke:"30",iske:"14",starttime:"2020-05-26"},
 {status:"2",names:"何丽",bing:"膝关节置换",ke:"膝关节置换术后康复训练课程",allke:"60",iske:"60",starttime:"2020-05-28"},
  {status:"3",names:"王今生",bing:"腰突症",ke:"腰突症康复训练课程",allke:"45",iske:"0",starttime:"2020-06-01"},
 
        ],
        clear_time:""//筛选类型 over 红色：代表已过清理时间，立刻清理
                      // normal 绿色：代表正常的清理时间
                      // ongoing 黄色：代表剩余一天（24小时），已到清理时间，需要去清理
      }
    },
    watch:{
      
    },
    computed:{
    
    },
    mounted(){
    //  this.getalllist()
    //  this.get_group()
    },
    methods:{
      doget(type){
      this.clear_time=type
      this.getalllist()
      },
      readDate(date){
        let mydate= date.substr(0,10)
       let nowdate=this.$moment().locale('zh-cn').format('YYYY-MM-DD');
        if(mydate==nowdate){
          return 1
        }else if(this.$moment(mydate).isBefore(nowdate)){//下次清理日期在今日之前
         return 2
        }else if(!this.$moment(mydate).isBefore(nowdate)){//下次清理日期在今日之后
          return 3
        }
       
      },
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
          create_time:_this.creatdate
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
