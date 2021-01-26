<template>
<div style="margin-top:2vh">
  <div>
        <div class="block" style="float:left;width:180px;margin-left:30px">
    <el-date-picker
      v-model="creatdate"
      format="yyyy-MM-dd"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期" style="width:180px">
    </el-date-picker>
  </div>
    <div style="margin-top: 10px;width:30%;margin-left:calc(50px + 20%)">
     <el-input placeholder="搜索商家名称、地址、所属小组" v-model="seachinput" class="input-with-select">
   
      <el-button slot="append" icon="el-icon-search" @click="getAllList"></el-button>
     </el-input>
    </div>
<el-row style="margin-top:10px">
 
  <el-button type="primary" class="f_l" style="margin-left:30px" >{{group_name}}</el-button>
 <el-button type="success" :loading="isloading" class="f_l" @click="getAllList">{{loadingtxt}}</el-button>

</el-row>
  </div>
  <div style="margin:10px;width:80%">
  <el-table
    :data="tableData"
    :stripe="true"
    height="480"
    border
    style="width: 100%">
      <el-table-column
      prop="merchant_name"
      label="商家名称"
      width="140">
    </el-table-column>
    <el-table-column
      prop="phone"
      width="120"
      label="联系电话">
    </el-table-column>
     <el-table-column
      width="100"
      label="联系人"
      >
      <template slot-scope="scope">
        <div v-if="!scope.row.user">未绑定</div>
        <div v-if="scope.row.user">
           <img :src="scope.row.user.avatar" alt="" style="width:50px;height:50px;border-radius:50%;margin-left:calc(50% - 25px)">
        <div style="width:100%;height:20px;line-height:20px;text-align:center">{{scope.row.user_name}}</div>
        </div>
      </template>
    </el-table-column>
     <el-table-column
      prop="address"
      label="商家地址"
      width="140">
    </el-table-column>
      <el-table-column
     width="120"
      label="小程序码"
      >
      <template slot-scope="scope">
          <div style="width:100%;height:100%">
             <el-image 
             fit="contain"
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
                fit="contain"
              style="width:100px;height:50px;margin-left:calc(50% - 50px)"
              :src="scope.row.merchant_image" 
              :preview-src-list="[scope.row.merchant_image]"
              >
            </el-image>
              
          </div>
      </template>
    </el-table-column>
     <el-table-column
      prop="clear_interval"
      label="清理周期"
      width="80">
    </el-table-column>
       <el-table-column
      prop="clear_datetime"
      label="上次清理日期"
      width="140">
    </el-table-column>
    <el-table-column
      prop="next_clear_date_time"
      label="下次清理日期"
      width="140">
    </el-table-column>
 <el-table-column
      prop="create_time"
      label="创建时间"
      width="180">
    </el-table-column>
  </el-table>
  
</div>


<el-pagination
  background
  layout="prev, pager, next ,sizes"
   :page-sizes="[10,20,50]"
  @size-change="changesize"     
  :page-size="pageinfo.page_size"
  :current-page="pageinfo.current_page"
  @current-change="changeCurrent"
  :total="pageinfo.total">
</el-pagination>
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

import { get_store} from "@api";
import  "../../util/index.js";
  export default {
    components:{},
    data() {
      return {
      group_id:"",
      group_name:"",
        isloading:false,
        loadingtxt:"刷新",
      pageinfo:{
       page_count:'',
       total:1,
       page_size:20,
       current_page:1,
       
      },
      creatdate:"",
      seachinput: '',
        tableData: []
      }
    },
    mounted(){
       
     this.group_id = this.$route.query.group_id;
     this.group_name = this.$route.query.group_name;
    
     this.getAllList()
     
    },
    methods:{
      changesize(n){
      this.pageinfo.page_size=n
       this.getAllList()
      },
     changeCurrent(n){
       this.pageinfo.current_page=n
       this.getAllList()
     },
      getAllList(){
          this.loadingtxt="加载中";
        this.loading=true;
       let _this=this;
       let data={
         page:this.pageinfo.current_page,
         per:this.pageinfo.page_size,
         clear_time_sort:"asc",
         keyword:this.seachinput,
         group_id:this.group_id,
        create_time:_this.creatdate,
        keyword_type:"merchant",
       }
            get_store(data)
            .then(res =>{
                _this.loadingtxt="刷新";
            _this.loading=false;
              let data=res.data;
            _this.tableData=data.data;
            _this.pageinfo.total=data.count
            console.log( _this.tableData)
           
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
