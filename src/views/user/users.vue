<template>
  <div style="margin-top:1vh">

    <div>
      <div style="margin-top: 15px;width:30%;margin-left:calc(30px + 20%)">
        <el-input placeholder="搜索患者姓名"
                  v-model="seachinput"
                  class="input-with-select">

          <el-button slot="append"
                     icon="el-icon-search"
                     @click="getAllUserList"></el-button>
        </el-input>
      </div>
    </div>
    <div>
      <el-button type="danger"
                 size="small"
                 style="float:left;margin-left:30px"
                 @click="toDetail('add')">添加档案</el-button>
    </div>
    <div style="margin:30px;width:80%">
      <el-table :data="tableData"
                :stripe="true"
                height="500"
                border
                style="width: 100%">
        <el-table-column prop="patientName"
                         width="100"
                         label="名字">
        </el-table-column>
        <el-table-column prop="patientIdnumber"
                         width="165"
                         label="身份证">
        </el-table-column>
        <el-table-column prop="patientPhone"
                         width="120"
                         label="联系方式">
        </el-table-column>
        <el-table-column prop="patientAge"
                         width="60"
                         label="年龄">
        </el-table-column>
        <el-table-column width="60"
                         label="性别">
          <template slot-scope="scope">
            <div>
              {{scope.row.patientSex}}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="病症">
          <template slot-scope="scope">
            <div>
              {{scope.row.disease}}
              <!-- <div style="width:100%;text-align:center;"
                   v-if="scope.row.user_level==0">髋关节置换</div>
              <div style="width:100%;text-align:center;color:rgb(189,183,255)"
                   v-if="scope.row.user_level==1">膝关节置换</div>
              <div style="width:100%;text-align:center;color:green"
                   v-if="scope.row.user_level==2">腰突症</div>
              <div style="width:100%;text-align:center;color:red"
                   v-if="scope.row.user_level==3">腰椎骨折</div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mark"
                         width="100"
                         label="备注信息">
        </el-table-column>
        <el-table-column prop="patientAddress"
                         width="100"
                         label="地址">
        </el-table-column>
        <el-table-column prop="inTime"
                         label="入院日期">
        </el-table-column>
        <el-table-column label="操作"
                         width="160">
          <template slot-scope="scope">
            <div>
              <el-button type="text"
                         @click="toDetail('edit',scope.row)">查看</el-button>
              <el-button type="text"
                         @click="delThis(scope.row)">删除</el-button>
            </div>
            <div>
              <el-button type="text"
                         @click="toDetail('edit',scope.row)">编辑</el-button>
              <el-button type="text">打印</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <el-pagination background
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
<style >
.el-select .el-input {
  width: 50px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import { get_allUser, del_patient } from "@api";
export default {
  data () {
    return {
      pageinfo: {
        page_count: '',
        total: 20,
        page_size: 20,
        current_page: 1,
        drawer: true,
        direction: 'rtl',
      },

      seachinput: '',

      tableData: [
        { "phone": 13780907754, "username": "何丽", "user_level": "1", "desc": "无", "created_at": "2020-05-28", "user_type": "女", "age": "56" },
        { "phone": 13557078931, "username": "王金生", "user_level": "2", "desc": "高血压", "created_at": "2020-06-01", "user_type": "男", "age": "66" },
        { "phone": 17790704627, "username": "李三海", "user_level": "2", "desc": "青霉素过敏", "created_at": "2020-06-01", "user_type": "男", "age": "53" },
      ]
    }
  },
  mounted () {
    this.getAllUserList()

  },
  methods: {
    // 删除
    delThis (item) {
      let _this = this
      this.$confirm('此操作将永久删除该患者信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log("true")
        _this.delPatient(item)

      }).catch(() => {
        _this.$message("info", '已取消');
      });

    },
    delPatient (item) {
      let _this = this;
      let data = {
        id: item.id
      }
      del_patient(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            _this.$message("success", res.msg);
            this.getAllUserList()
          } else {
            _this.$message("error", res.msg);
          }
        })
        .catch({

        })
    },
    toDetail (type, item) {
      if (type == 'add') {
        this.$router.push({ path: '/userdetail', query: { type: 'add' } })
        return
      }
      let data = {
        type: type,
        id: item.id
      }
      this.$router.push({ path: '/userdetail', query: data })
    },


    sizechange (n) {
      console.log(n)
      this.pageinfo.page_size = n
      this.getAllUserList()
    },
    currentchange (n) {
      console.log(n)
      this.pageinfo.current_page = n
      this.getAllUserList()
    },
    to_p_page (n) {
      this.pageinfo.current_page = n
      this.getAllUserList()
    },
    to_n_page (n) {
      this.pageinfo.current_page = n
      this.getAllUserList()
    },
    getAllUserList () {
      let _this = this;
      let data = {
        per: _this.pageinfo.page_size,
        page: _this.pageinfo.current_page,
        keyword: _this.seachinput,
        start_time: "2020-01-01 10:00:00",
        end_time: "2022-01-01 10:00:00",
      }
      get_allUser(data)
        .then(res => {
          console.log(res)
          let data = res.result;
          _this.tableData = data.row;
          _this.pageinfo.total = data.pageinfo.total
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
</script>
