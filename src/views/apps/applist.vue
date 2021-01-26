<template>
<div style="margin-top:1vh">
  <div>
    <!-- <div style="margin-top: 15px;width:30%;margin-left:calc(30px + 20%)">
     <el-input placeholder="搜索运营方" v-model="seachinput" class="input-with-select">
   
      <el-button slot="append" icon="el-icon-search" @click="getAllUserList"></el-button>
     </el-input>
    </div> -->
<el-row style="margin-top:15px">
  <!-- <el-button type="danger" class="f_l" style="margin-left:30px" @click="show_alt" >添加app</el-button> -->
   <el-button type="success" :loading="isloading" class="f_l" style="margin-left:30px" @click="getAllUserList">{{loadingtxt}}</el-button>
 <el-button type="danger"  class="f_l" style="margin-left:30px" @click="backpage">返回</el-button>
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
      label="商家信息"
      width="120"
      >
      <template slot-scope="scope">
       <div>{{scope.row.merchant_info.address}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="商家地址"
      width="120"
      >
      <template slot-scope="scope">
       <div>{{scope.row.merchant_info.merchant_name}}</div>
      </template>
    </el-table-column>
      <el-table-column
      prop="clear_date"
      label="清理时间"
      width="130">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="备注"
      width="120">
    </el-table-column>
     <el-table-column
      label="清理前图"
      width="150"
      >
      <template slot-scope="scope">
        <el-image 
        fit="contain"
        style="width: 130px;height:60px"
        :src="scope.row.clear_before_img[0]" 
        :preview-src-list="scope.row.clear_before_img">
      </el-image>
      </template>
    </el-table-column>
     <el-table-column
      label="清理后图"
      width="150"
      >
      <template slot-scope="scope">
        <el-image 
         fit="contain"
        style="width: 130px;height:60px"
        :src="scope.row.clear_after_img[0]" 
        :preview-src-list="scope.row.clear_after_img">
      </el-image>
      </template>
    </el-table-column>
     <el-table-column
      label="所属小组"
      width="120"
      >
      <template slot-scope="scope">
        {{scope.row.group_info.group_name}}
      </template>
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
    
      <alertbox  v-if="showAddApp" @change-alt="changealt" ></alertbox>
    </div>
  </div>
</div>
<el-pagination
  background
  layout="prev, pager, next,sizes"
  :page-size.sync="pageinfo.page_size"
  @current-change="currentchange"
   :page-sizes="[10,20,50]"
 @prev-click="to_p_page"
   @next-click="to_n_page"	
  @size-change="sizechange"
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
import alertbox from "./components/alertbox.vue"
import { get_clearlist} from "@api";
import  "../../util/index.js";
  export default {
    components:{alertbox},
    data() {
      return {
        isloading:false,
        loadingtxt:"",
      pageinfo:{
       page_count:'',
       total:1,
       page_size:20,
       current_page:1,
       
      },
     merchant_id:"",
     group_id:"",
     showAddApp:false,//显示add app 窗口
      seachinput: '',
      
        tableData: []
      }
    },
    mounted(){
    
     this.merchant_id = this.$route.query.merchant_id;
     this.group_id = this.$route.query.group_id;
     console.log(this.merchant_id+","+this.group_id)
      this.getAllUserList()
    },
    methods:{
    backpage(){
   this.$router.go(-1)
    },
        changealt(data){
         console.log(data)
         this.showAddApp=data;
         this.getAllUserList()
       },
      show_alt(){
       this.showAddApp=true;
      },
      close_alt(){
       
       this.showAddApp=false;

      },
        to_p_page(n){
      this.pageinfo.current_page=n
      this.getAllUserList()
      },
       to_n_page(n){
      this.pageinfo.current_page=n
      this.getAllUserList()
      },
        sizechange(n){
        console.log(n)
     this.pageinfo.page_size=n
     this.getAllUserList()
      },
      currentchange(n){
       console.log(n)
       this.pageinfo.current_page=n
       this.getAllUserList()
      },
      getAllUserList(){
        this.loadingtxt="加载中";
        this.loading=true;
        let _this=this;
        let data={
          "page":this.pageinfo.current_page,
          "per":this.pageinfo.page_size,
          "merchant_id":this.merchant_id,
          "group_id":this.group_id,
          "start":"2020-06-01",
	         "end":"2022-01-01"

        }
            get_clearlist(data)
            .then(res =>{
               _this.loadingtxt="刷新";
            _this.loading=false;
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
