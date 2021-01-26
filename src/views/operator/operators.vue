<template>
  <div style="margin-top:1vh">
    <div>
      <!-- <div style="margin-top: 15px;width:30%;margin-left:calc(30px + 20%)">
     <el-input placeholder="搜索小组" v-model="seachinput" class="input-with-select">
   
      <el-button slot="append" icon="el-icon-search" @click="getAllYUserList"></el-button>
     </el-input>
    </div> -->
      <el-row style="margin-top:15px">

        <el-button type="primary"
                   class="f_l"
                   style="margin-left:30px">添加部门</el-button>
        <el-button type="success"
                   class="f_l"
                   @click="getAllYUserList">添加人员</el-button>

      </el-row>
    </div>
    <div style="margin:30px;width:70%">
      <el-table :data="tableData"
                :stripe="true"
                height="500"
                border
                style="width: 100%">
        <el-table-column prop="group_name"
                         label="姓名"
                         width="120">
        </el-table-column>
        <el-table-column prop="id"
                         width="120"
                         label="职位">
        </el-table-column>
        <el-table-column width="100"
                         label="证件照">
          <template slot-scope="scope">
            <!-- <div v-if="scope.row.user_img==0">未绑定</div> -->
            <div v-if="scope.row.user_img">
              <img :src="scope.row.user_img"
                   alt=""
                   style="width:50px;height:50px;border-radius:50%;margin-left:calc(50% - 25px)">

            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user_phone"
                         label="联系方式"
                         width="140">
        </el-table-column>
        <el-table-column prop="desc"
                         label="简介"
                         width="140">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="loaduserlist(scope.row)">删除</el-button>
            <el-button type="text"
                       size="small"
                       @click="showEditInfo(scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="openGroup_ms(scope.row)">负责商家</el-button> -->
          </template>
        </el-table-column>

      </el-table>

    </div>
    <el-drawer title="编辑小组信息"
               :visible.sync="showedit"
               :direction="direction"
               :before-close="handleClose">
      <div style="margin-top: 15px;">
        <el-input placeholder="组名"
                  v-model="group_json.name">
          <template slot="prepend">小组组名</template>
        </el-input>
        <el-input placeholder="请输入内容"
                  v-model="group_json.company">
          <template slot="prepend">归属公司</template>
        </el-input>

        <el-button type="primary"
                   class="f_l"
                   style="margin-left:30px"
                   @click="up_group_info">保存修改</el-button>
      </div>
    </el-drawer>
    <el-drawer title="更换运维人员"
               :visible.sync="drawer"
               :direction="direction"
               :before-close="handleClose">
      <div style="margin-top: 15px;">
        <el-input placeholder="搜索微信昵称"
                  v-model="nickname"
                  class="input-with-select">

          <el-button slot="append"
                     icon="el-icon-search"
                     @click="loaduser"></el-button>
        </el-input>
        <div style="width:100%;height:50px;line-height:50px;border-bottom:1px solid #999999;padding:5px 5%"
             v-for="(item ,index)  in userlist"
             :key="index">
          <div><img :src="item.avatar"
                 alt=""
                 style="height:40px;width:40px;float:left;border-radius:50%;border:1px solid #eaeaea;"></div>
          <div style="float:left;margin-left:10px;width:130px;text-align:left;overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;">{{item.username}}</div>
          <div style="width:70px;height:100%;float:right">
            <el-button size="small"
                       type="primary"
                       @click="bind_group_user(item)">绑定</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
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
<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.f_l {
  float: left;
  margin: 5px 10px;
}
.mju {
  width: 350px;
  height: 200px;
  background: green;
}
.alt_1001 {
  position: fixed;
  z-index: 1001;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
}
.alt_model {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
}
.alt_1002 {
  background: #fff;
  position: absolute;
  width: 690px;
  height: 500px;
  z-index: 1002;
  top: calc(50% - 250px);
  left: calc(50% - 345px);
  border-radius: 4px;
}

.h_40 {
  height: 40px;
  padding: 5px 0px;
}
.t_x_l {
  text-align: left;
}
.t_x_c {
  text-align: center;
}
.t_t {
  font-size: 22px;
  border-bottom: 1px solid #444;
}
</style>

<script>

import { get_allGroup, find_merchant, get_allUser, update_group } from "@api";
import "../../util/index.js";
export default {
  components: {},
  data () {
    return {
      drawer: false,
      showedit: false,
      group_json: {},
      direction: 'rtl',
      userlist: [],
      updateJson: {},
      nickname: "",
      isloading: false,
      loadingtxt: "刷新",
      pageinfo: {
        page_count: '',
        total: 1,
        page_size: 20,
        current_page: 1,

      },
      showAddApp: false,//显示add app 窗口
      seachinput: '',

      tableData: [
        { group_name: "刘青", user_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599728246350&di=0f05312d37af20db5bdd7e4b01a69f13&imgtype=0&src=http%3A%2F%2Fy3.ifengimg.com%2Fcmpp%2F2015%2F09%2F18%2F11%2F32159add-06ea-4c4b-9b72-1cc23f1de312_size70_w350_h500.jpg", id: "主治医师", user_phone: "13890780098", desc: "骨科专家" },
        { group_name: "吴微微", user_img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1600059210,1064685534&fm=26&gp=0.jpg", id: "主治医师", user_phone: "17766546756", desc: "骨科专家" },

      ]
    }
  },
  mounted () {
    //  this.getAllYUserList()

  },
  methods: {
    sizechange (n) {
      console.log(n)
      this.pageinfo.page_size = n
      this.getAllYUserList()
    },
    currentchange (n) {
      console.log(n)
      this.pageinfo.current_page = n
      this.getAllYUserList()
    },
    openGroup_ms (data) {
      this.$router.push({ name: 'group_ms', query: { group_id: data.group_id, group_name: data.group_name } })
    },
    bind_group_user (userinfo) {
      let _this = this;
      let data = this.updateJson
      data = {
        "group_company": data.group_company,
        "group_name": data.group_name,
        "address": data.address,
        "group_id": data.group_id,
        "user_id": userinfo.id
      }
      this.update_group(data)
    },
    up_group_info () {
      let _this = this;
      let editdata = this.group_json
      let mydata = {
        "group_company": editdata.company,
        "group_name": editdata.name,
        "address": editdata.address,
        "group_id": editdata.group_id,
        "user_id": editdata.user_id
      }
      console.log(mydata)
      this.update_group(mydata)
    },
    update_group (data) {
      console.log(data)
      let _this = this;
      update_group(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            this.getAllYUserList()
          } else {
            // alert()
            this.$message("info", res.error);
          }
        })
        .catch(err => {

        })
    },
    loaduser () {
      let _this = this;
      let data = {
        page: 1,
        per: 50,
        keyword: this.nickname
      }
      get_allUser(data)
        .then(res => {

          _this.userlist = res.data.data
          console.log(_this.userlist)
        })
        .catch(err => {

        })
    },
    loaduserlist (data) {

      this.visible()
      this.updateJson = data;
      console.log(this.updateJson)
      this.loaduser()


    },
    showEditInfo (data) {//显示抽屉页
      this.showedit = true;
      console.log(data)
      this.group_json = data
      this.group_json = {
        "company": data.group_company,
        "name": data.group_name,
        "address": data.address,
        "group_id": data.group_id,
        "user_id": data.user_id
      }
      console.log(this.group_json)
    },
    visible () {//显示抽屉页
      this.drawer = true;

    },
    show_alt () {
      this.showAddApp = true;
    },
    close_alt () {

      this.showAddApp = false;

    },


    getAllYUserList () {
      this.loadingtxt = "加载中";
      this.loading = true;
      let _this = this;
      let mydata = {
        page: this.pageinfo.current_page,
        per: this.pageinfo.page_size
      }
      get_allGroup(mydata)
        .then(res => {
          _this.loadingtxt = "刷新";
          _this.loading = false;
          let data = res.data;
          _this.tableData = data.data;
          _this.pageinfo.total = data.count

        })
        .catch(err => {
          console.log(err)
        })
    }

  }
}
</script>
