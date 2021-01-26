<template>
<div style="margin-top:10vh">
  <div>
    <!-- <div style="margin-top: 15px;width:30%;margin-left:calc(30px + 20%)">
     <el-input placeholder="搜索运营方" v-model="seachinput" class="input-with-select">
   
      <el-button slot="append" icon="el-icon-search" @click="getAllUserList"></el-button>
     </el-input>
    </div> -->
<el-row style="margin-top:15px">
 
  <!-- <el-button type="primary" class="f_l" style="margin-left:30px" @click="open">添加渠道商</el-button> -->
 <el-button type="success" style="margin-left:30px" :loading="isloading" class="f_l" @click="getAllYUserList">{{loadingtxt}}</el-button>

</el-row>
  </div>
  <div style="margin:30px;width:70%">
  <el-table
    :data="tableData"
    :stripe="true"
    height="500"
    border
    style="width: 100%">
      <el-table-column
      prop="names"
      label="评价人"
      width="100">
    </el-table-column>
    <el-table-column
      prop="num"
      width="120"
      label="评分(10分制)">
    </el-table-column>
  <el-table-column
      prop="creat_time"
      label="评价日期"
      width="200">
    </el-table-column>
      <el-table-column
    min-width="200"
      label="评语"
       prop="txt"
      >
      
    </el-table-column>

   
  
  </el-table>
  <div  class="alt_1001" v-if="showAddApp">
    <div class="alt_model" @click="close_alt">
    </div>
    <div class="alt_1002">
      <el-row>
        <el-col :span="20" :offset="1" class="h_40 t_x_l t_t">新增APP</el-col>
        <el-col :span="2" class="t_t h_40 t_x_c" ><span @click="close_alt">X</span></el-col>
      </el-row>

    </div>
  </div>
</div>
<!-- <el-pagination
  background
  layout="prev, pager, next"
  :page-size="pageinfo.page_size"
  :total="pageinfo.total">
</el-pagination> -->
</div>
</template>
<style scoped>
 
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .f_l{float: left;margin: 5px 10px;}
  .mju{width:350px;height: 200px;background: green;}
  .alt_1001{position: fixed;z-index: 1001;left: 0%;top: 0%;width: 100%;height: 100%;}
  .alt_model{background: rgba(0, 0, 0, .6);width: 100%;height:100%}
  .alt_1002{background: #fff;position: absolute;width: 690px;height: 500px;z-index: 1002;
  top:calc(50% - 250px);left: calc(50% - 345px);border-radius: 4px;}

  .h_40{height: 40px;padding: 5px 0px;}
.t_x_l{text-align: left;}
.t_x_c{text-align: center;}
.t_t{font-size: 22px;border-bottom: 1px solid #444;}

</style>

<script>

import { get_allYuser,post_yuser,find_allYuser,findYuserAndApp,del_cuser,get_cuser,creat_cuser } from "@api";
import  "../../util/index.js";
  export default {
    components:{},
    data() {
      return {
        isloading:false,
        loadingtxt:"刷新",
      pageinfo:{
       page_count:'',
       total:100,
       page_size:20,
       current_page:1,
       
      },
     showAddApp:false,//显示add app 窗口
      seachinput: '',
      
        tableData: [
          {names:"王金生",num:10,creat_time:"2020-07-22",txt:"医生和护士都很专业，指导非常耐心有效，感谢！"},
          {names:"张韦家",num:10,creat_time:"2020-07-23",txt:"感谢小徐护士的悉心指导，父亲恢复很快！"},
          {names:"郑玉",num:10,creat_time:"2020-07-25",txt:"医生和护士都很专业，指导非常耐心有效，感谢！"},
         
        ]
      }
    },
    mounted(){
    //  this.getAllYUserList()
     
    },
    methods:{
      del_cuser(data){
          console.log(data)
        let _this=this;
      this.$confirm('此操作将永久删除该渠道商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
       
        .then((res) => {
          let body={
          c_id:data.c_id
        }
         del_cuser(body)
         .then(res=>{
          if(res.code==200){
             _this.$message(
            "success",
            '删除成功!'
            );
            _this.getAllYUserList()
          }else{
             _this.$message(
            "error",
            '删除失败!'
            );
          }
         })
         .catch((err) => {})
        })
        .catch((err) => {
         console.log(err)
          this.$message(
            'info',
             '取消'
          );          
        });
      },
      show_alt(){
       this.showAddApp=true;
      },
      close_alt(){
       
       this.showAddApp=false;

      },
      openCreatApp(){
     const h = this.$createElement;
     this.$msgbox({
          title: '消息',
          message: h('div', { class:'mju' },[h('span',{style:'color:red'},'dy')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });
      },
        open() {
          let _this=this;
        _this.$prompt('请输入渠道商名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
          inputErrorMessage: '汉字、数字、字母、下划线，不能以下划线开头和结尾'
        }).then(({ value }) => {
        
          let data={
            c_name:value
          }
          //提交
          creat_cuser(data)
          .then(res=>{
            console.log(res)
            if(res.success){
                _this.$message("success", "创建成功！");   
                _this.getAllYUserList()
            }
        
          })
          .catch(err=>{
            console.log(err)
          })
          // this.$message("success", "注册成功：名称："+value);
        }).catch(() => {
         this.$message("info", "取消");    
        });
      },
      getAllYUserList(){
          this.loadingtxt="加载中";
        this.loading=true;
       let _this=this;
            get_cuser()
            .then(res =>{
                _this.loadingtxt="刷新";
            _this.loading=false;
              let data=res.result;
            _this.tableData=data;
           
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
