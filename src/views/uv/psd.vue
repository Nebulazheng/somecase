<template>
<div style="margin-top:10vh">
  <div>
 <el-input v-model="psd" placeholder="请输入密码" style="width:140px"></el-input>
  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10000" label="有效期"></el-input-number>
  <el-button type="primary" @click="post_psd" size="small">添加密码</el-button>
  </div>
<el-row>

 </el-row>
  <div style="margin:10px;width:90%">

  <el-table
    :data="tableData"
    :stripe="true"
    height="500"
    border
    style="width: 100%">
      <el-table-column
     
      label="密码"
      width="140">
       <template slot-scope="scope">
        {{scope.row[0]}}
      </template>
    </el-table-column>
     <el-table-column
     
      label="过期时间"
      width="170">
       <template slot-scope="scope">
        {{scope.row[1]}}
      </template>
    </el-table-column>
  <el-table-column
     
      label="操作"
      width="170">
       <template slot-scope="scope">
       <el-button  type="text" size="small" @click="del_psd(scope.row[0])">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   
</div>


</div>
</template>
<style scoped>
.f_l{float: left;}
  .formrow{width: 90%;margin-left: 5%;height: 30px;line-height: 30px;font-size: 15px;}
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
  .alt_1002{background: #fff;position: absolute;width: 690px;height: 500px;z-index: 1002;
  top:calc(50% - 250px);left: calc(50% - 345px);border-radius: 4px;}


  .h_40{height: 40px;padding: 5px 0px;}
.t_x_l{text-align: left;}
.t_x_c{text-align: center;}
.t_t{font-size: 22px;border-bottom: 1px solid #444;}
</style>

<script>


import { get_psdlist,post_psd,del_psd } from "@api";
  export default {
      components:{},
    data() {
      return {
     isloading:false,//刷新按钮
     loadingtxt:"",//刷新按钮label
     psd:"",
     tableData:[],
     num:30
      }
    },
    
    mounted(){
    this.getalllist()
  
    },
    methods:{
      del_psd(psd){
        let _this=this;
        let data={
          psd:psd
        }
         del_psd(data)
          .then(res =>{
              console.log(res)
              if(res.code==1){
                _this.getalllist()
              }
            })
            .catch(err=>{
              console.log(err)
            })
      },
  post_psd(){
    let _this=this;
    let data={
      password:this.psd,
      expire:this.$moment().locale('zh-cn').add(+this.num, 'days').format('YYYY-MM-DD HH:mm:ss')
    }
    post_psd(data)
         .then(res =>{
              console.log(res)
              if(res.code==1){
                _this.getalllist()
              }
            })
            .catch(err=>{
              console.log(err)
            })
  },
      getalllist(){//获取列表
        let _this=this;
        this.isloading=true;
        
            get_psdlist()
            .then(res =>{
              console.log(res)
              _this.isloading=false;
              _this.loadingtxt="刷新"
              let data=res.data;
 
          
            _this.tableData=data;
           
            })
            .catch(err=>{
              console.log(err)
            })
      }
      
    }
  }
</script>
