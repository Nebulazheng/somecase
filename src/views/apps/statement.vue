<template>
<div style="margin-top:10vh">
  <div>
    <div style="margin-top: 15px;width:30%;margin-left:calc(30px + 20%)">
  <el-input placeholder="搜索运营方" v-model="seachinput" class="input-with-select">
   
    <el-button slot="append" icon="el-icon-search" @click="getalllist"></el-button>
  </el-input>
</div>
  </div>
  <div style="margin:30px;width:90%">
  <el-table
    :data="tableData"
    :stripe="true"
    height="500"
    border
    style="width: 100%">
      <el-table-column
      prop="y_name"
      label="运营方"
       align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="y_appname"
      width="120"
       align="center"
      label="app名称">
    </el-table-column>

     <el-table-column
      prop="p_name"
      width="140"
       align="center"
      label="产品名称">
    </el-table-column>
     <el-table-column
      prop="total"
      width="100"
       align="center"
      label="放款金额">
    </el-table-column>
    <el-table-column
      prop="need_pay"
      width="100"
      align="center"
      label="结算金额">
    </el-table-column>
  
   
      <el-table-column
      prop="cps"
      width="50"
      label="cps">
    </el-table-column>
  
  <el-table-column
      prop="today"
      label="日期"
       align="center"
      width="200">
    </el-table-column>

  <el-table-column
    min-width="200"
      label="操作"
      >
      <template slot-scope="scope">
        <el-button  type="text" size="small">入账</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
   
  
  </el-table>
</div>
<el-pagination
  background
  layout="prev, pager, next"
  :page-size="pageinfo.page_size"
  :total="pageinfo.total">
</el-pagination>
</div>
</template>
<style scoped>
  .el-select .el-input {
    width: 50px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<script>
import { get_all_total } from "@api";
  export default {
    data() {
      return {
      pageinfo:{
       page_count:'',
       total:100,
       page_size:20,
       current_page:1
      },
     
      seachinput: '',
      
        tableData: []
      }
    },
    mounted(){
    //  this.getalllist()
     
    },
    methods:{
      getalllist(){
        let _this=this;
        let data={
          page_size:_this.page_size,
          current_page:_this.current,
          wd:_this.seachinput

        }
            get_all_total(data)
            .then(res =>{
            
              let data=res.result;
            _this.tableData=data.row;
            // _this.pageinfo=data.pageinfo
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
