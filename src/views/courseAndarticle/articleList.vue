<template>
  <div style="margin-top:1vh;">
    <div>
      <div style="margin-top: 15px;width:70%;margin-left:30px">
        <el-row style="float:left">

          <div class="f_l"
               style="width:80%;height:40px;float:left">
            <div class="block">
              <el-button type="primary"
                         @click="toAdd">添加文章</el-button>
            </div>
          </div>
        </el-row>
        <el-input placeholder="搜索文章关键词"
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
        <el-table-column label="文章标题"
                         width="140">
          <template slot-scope="scope">
            <div>{{scope.row.articleTitle}}</div>
          </template>
        </el-table-column>
        <el-table-column label="文章简介"
                         width="140">
          <template slot-scope="scope">
            <div style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{scope.row.articleNextTitle}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sort"
                         label="排序"
                         width="60">
        </el-table-column>

        <el-table-column label="封面图"
                         width="150">
          <template slot-scope="scope">
            <el-image fit="contain"
                      style="width: 130px;height:60px"
                      :src="scope.row.articleCover"
                      :preview-src-list="scope.row.articleCover">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="文章类型"
                         width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.articleClass==0">科普知识</span>
            <span v-if="scope.row.articleClass==1">经典病例</span>
            <span v-if="scope.row.articleClass==2">日常防护</span>
            <span v-if="scope.row.articleClass==3">术后恢复</span>
          </template>
        </el-table-column>
        <el-table-column label="数据统计"
                         width="140">
          <template slot-scope="scope">
            <div>
              <div style="width:50%;float:left"> <i class="el-icon-star-on"></i> {{scope.row.likeNum}}</div>
              <div style="width:50%;float:left"> <i class="el-icon-share"></i> {{scope.row.shareNum}}</div>
              <div style="width:50%;float:left"> <i class="el-icon-thumb"></i> {{scope.row.isGood}}</div>
              <div style="width:50%;float:left"> <i class="el-icon-user-solid"></i> {{scope.row.readNum}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="articleCreatTime"
                         label="创建时间"
                         width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text"
                         @click="toDetail(scope.row)">查看</el-button>
              <el-button type="text"
                         @click="delThis(scope.row)">删除</el-button>
            </div>
            <div>
              <el-button type="text"
                         @click="toDetail(scope.row)">编辑</el-button>
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

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>

<script>
import { get_articleList, del_article } from "@api";
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
    // 删除
    delThis (item) {
      let _this = this
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log("true")
        _this.delArticle(item)

      }).catch(() => {
        _this.$message("info", '已取消');
      });
    },
    delArticle (item) {
      let _this = this;
      let data = {
        id: item.id
      }
      del_article(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            _this.$message("success", res.msg);
            this.getList()
          } else {
            _this.$message("error", res.msg);
          }
        })
        .catch({

        })
    },
    toDetail (item, type) {
      console.log(item)
      this.$router.push({ path: '/editArticle', query: { type: 'edit', id: item.id } })
    },
    toAdd () {
      this.$router.push({ path: '/editArticle', query: { type: 'add', } })
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
      get_articleList(data)
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
