<template>
<div style="margin-top:1vh">
  <div>
    <div style="margin-top: 15px;width:70%;margin-left:calc(30px + 10%);height:40px">
     
   
  
<el-button type="primary" style="float:left" plain @click="getyestoday">昨日</el-button>
<el-button type="primary" style="float:left" plain @click="showdate">其他日期</el-button>
   <el-date-picker
      v-model="startdate"
      align="right"
      type="date"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      @change="changedate"
      :picker-options="pickerOptions" style="float:left;width:140px" v-show="showchoose">
    </el-date-picker>
  <el-input placeholder="搜索渠道id或渠道名" v-model="seachinput" class="input-with-select" style="width:260px;float:left">
  
    <el-button slot="append" icon="el-icon-search" @click="getAllUserList"></el-button>
  </el-input>
</div>
  </div>
  <div style="margin:30px;width:90%">
  <el-table
    :data="tableData"
    :stripe="true"
    height="500"
    show-summary
    :summary-method="getSummaries"
    border
    style="width: 100%;height:470px">
     <el-table-column
      :filters="[{text:'首借',value:'01'},{text:'复借',value:'02'}]"
      width="100"
      prop="isfirst"
       :filter-method="filterHandler"
      label="首复借">
      <template slot-scope="scope">
          <div v-if="scope.row.isfirst=='01'" style="color:green">首借</div>
          <div v-if="scope.row.isfirst=='02'" style="color:red">复借</div>
      </template>
    </el-table-column> 
     <el-table-column
      prop="user_phone"
      width="120"
      label="手机号">
    </el-table-column> 
      <el-table-column
      prop="user_name"
      label="姓名"
      width="80">
    </el-table-column>
   
    <el-table-column
      prop="appid"
      width="100"
      label="放款APP">
    </el-table-column>
     <el-table-column
      prop="order_amount"
      width="100"
      label="放款金额">
    </el-table-column>
     <el-table-column
      prop="c_name"
      width="80"
      label="归属渠道">
    </el-table-column>
     <el-table-column
      prop="c_id"
      width="140"
      label="渠道id">
    </el-table-column>
     <el-table-column
      prop="order_pay_time"
      width="150"
      label="放款时间">
    </el-table-column>
    <el-table-column
      prop="order_id"
    
      label="订单id">
    </el-table-column>
    
    <!-- <el-table-column
      prop="detail"
      width="140"
      label="借款情况">
    </el-table-column> -->
    <!-- <el-table-column
      prop="creat_date"
      label="注册日期"
     >
    </el-table-column> -->
  
  </el-table>
</div>
<el-pagination
  background
  layout="prev, pager, next,sizes"
  :page-size.sync="page_size"
  @current-change="currentchange"
  :page-sizes="options"
  @size-change="sizechange"
  :total="pageinfo.total" 
  >
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
  .el-table{
overflow:visible !important;
}
</style>

<script>
import { get_orderByC } from "@api";
  export default {
    data() {
      return {
        page_size:20,
        showchoose:false,
        date:this.$moment().locale('zh-cn').format('YYYY-MM-DD'),
      pageinfo:{
       page_count:'',
       
       total:0,
       page_size:20,
       current_page:1,
       options:[10,20,30,50]
      },
     startdate:this.$moment(new Date()).add(-1, 'days').locale('zh-cn').format('YYYY-MM-DD'),
     
      seachinput: '',
      
        tableData: []
      }
    },
    created(){
       this.getAllUserList()
    },
    mounted(){
        console.log(this.startdate)
    
     
    },
    methods:{
       filterHandler(value, row, column) {
           console.log(row)
           console.log(column)
        const property = column['property'];
        return row[property] === value;
      },
         getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '累计放款';
            return;
          }
           if (index === 1||index === 2) {
            sums[index] = '/';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = '/';
          }
        });

        return sums;
      },
        getyestoday(){
          this.startdate=this.$moment(new Date()).add(-1, 'days').locale('zh-cn').format('YYYY-MM-DD'),
           this.getAllUserList()
        },
        changedate(date){
            console.log(date)
            this.startdate=date
            this.getAllUserList()
        },
        showdate(){
            console.log(this.showchoose)
          if(this.showchoose){
              this.showchoose=false
            
          }else{
               this.showchoose=true
          }
        },
      sizechange(n){
        console.log(n)
     this.page_size=n
     this.getAllUserList()
      },
      currentchange(n){
       console.log(n)
       this.pageinfo.current_page=n
       this.getAllUserList()
      },
      getAllUserList(){
        let _this=this;
        let data={
        //   page_size:_this.page_size,
        //   current_page:this.pageinfo.current_page,
        //   wd:_this.seachinput,
          start:this.startdate+" 00:00",
          end:this.startdate+" 23:59",
          wd:this.seachinput
        }
            get_orderByC(data)
            .then(res =>{
              console.log(res)
            _this.tableData=res.result
           
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
