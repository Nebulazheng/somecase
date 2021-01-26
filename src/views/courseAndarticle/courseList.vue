<template>
  <div style="margin-top:1vh">
    <div>
      <div style="margin-top: 15px;width:70%;margin-left:30px">
        <el-row style="float:left">

          <div class="f_l"
               style="width:80%;height:40px;float:left">
            <div class="block">
              <el-button type="primary"
                         @click="toEditCourse('add')">添加课程</el-button>
              <!-- <el-date-picker
        v-model="sel_date"
        align="right"
        type="daterange"
        placeholder="选择日期"
        range-separator="至"
        start-placeholder="开始日期"
      end-placeholder="结束日期"
        @change="change_date"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions">
        </el-date-picker> -->

            </div>

          </div>

        </el-row>
        <!-- <div class="f_l" style="width:100px;height:40px;line-height:40px;margin-top:20px;margin-left:25px">
     <el-button type="success" :loading="isloading" class="f_l"  size="small" icon="el-icon-search" style="margin-left:10px" @click="getAllUserList">{{loadingtxt}}</el-button>
   </div> -->
        <el-input placeholder="搜索课程关键词"
                  v-model="seachinput"
                  class="input-with-select"
                  style="width:270px;float:left;height:40px">

          <el-button slot="append"
                     icon="el-icon-search"
                     @click="getList"></el-button>
        </el-input>
      </div>
    </div>
    <div style="margin:30px;width:80%">
      <el-table :data="tableData"
                :stripe="true"
                height="500"
                border
                style="width: 100%">
        <el-table-column label="课程名称"
                         width="120">
          <template slot-scope="scope">
            <div>{{scope.row.courseName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="课程简介"
                         width="120">
          <template slot-scope="scope">
            <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{scope.row.courseIntroduction}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="courseDay"
                         label="课程周期"
                         width="130">
        </el-table-column>

        <el-table-column label="封面图"
                         width="150">
          <template slot-scope="scope">
            <el-image fit="contain"
                      style="width: 130px;height:60px"
                      :src="scope.row.courseCover"
                      :preview-src-list="scope.row.courseCover">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="治疗病症"
                         width="120">
          <template slot-scope="scope">
            {{scope.row.bing}}
          </template>
        </el-table-column>
        <el-table-column prop="courseNotes"
                         label="备注"
                         width="100">
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <div>
              <el-button type="text">查看</el-button>
              <el-button type="text">删除</el-button>
            </div>
            <div>
              <el-button type="text">编辑</el-button>
              <!-- <el-button type="text" >打印</el-button> -->
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-pagination background
                   layout="prev, pager, next,sizes"
                   :page-size.sync="pageinfo.page_size"
                   @current-change="currentchange"
                   :page-sizes="options"
                   @size-change="sizechange"
                   :total="pageinfo.total">
    </el-pagination>

  </div>
</template>
<style >
.f_l {
  float: left;
}
.el-select .el-input {
  width: 50px;background: rgb(45, 99, 248);
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import { get_course } from "@api";
export default {
  data () {
    return {

      startdate: this.$moment(new Date()).add(-1, 'days').locale('zh-cn').format('YYYY-MM-DD'),

      pageinfo: {
        page_count: '',
        total: 0,
        page_size: 20,
        current_page: 1,
        options: [10, 20, 30, 50]
      },

      seachinput: '',
      loadingtxt: "查找",
      tableData: [
      ],
      showDate: false,
      sel_date: "",
      date: {
        start: "",
        edn: ""
      },
    }
  },
  mounted () {
    let today = this.$moment().locale('zh-cn').format('YYYY-MM-DD');
    let yestoday = this.$moment(new Date()).add(-1, 'days').format("YYYY-MM-DD");
    this.date = {
      start: yestoday,
      end: today
    }
    this.getList()

  },
  methods: {
    toEditCourse (item, type) {
      this.$router.push({ path: '/editCourse', query: { type: 'add', id: item.id } })
    },
    change_date (e) {
      console.log(e)
      this.date = {
        start: e[0],
        end: e[1],
      }
      this.getList()
    },
    c_date (num) {
      let _this = this;
      if (num == 0) {
        this.showDate = false
        let today = this.$moment().locale('zh-cn').format('YYYY-MM-DD');
        let now = this.$moment().locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
        this.date = {
          start: today + " 00:00:00",
          end: now
        }
        this.getList()

      } else if (num == 1) {
        this.showDate = false
        let today = this.$moment(new Date()).add(-1, 'days').format("YYYY-MM-DD");

        this.date = {
          start: "" + today,
          end: "" + today,
        }
        this.getList()

      } else if (num == 2) {
        this.showDate = true
      }
    },
    toDeail () {
      this.$router.push({ name: '/orderbyc', params: { id: "123" } })
      //  window.open(news.href,'_blank')
    },

    sizechange (n) {
      console.log(n)
      this.pageinfo.page_size = n
      this.getList()
    },
    currentchange (n) {
      console.log(n)
      this.pageinfo.current_page = n
      this.getList()
    },
    getList () {
      let _this = this;
      let data = {
        "page": this.pageinfo.current_page,
        "per": this.pageinfo.page_size,
        "start": this.date.start,
        "end": this.date.end,
        "keyword": this.seachinput
      }
      get_course(data)
        .then(res => {
          console.log(res)
          _this.tableData = res.result.row
          _this.pageinfo.total = res.result.pageinfo.page_size
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
</script>
