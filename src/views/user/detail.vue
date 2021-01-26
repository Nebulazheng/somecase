<template>
  <div style="padding-top:50px;width:96%;margin-left:2%">
    <el-row :gutter="20">
      <el-col :span="3"
              offset="1">
        <div class="userAva"><img :src="from_data.patientAvatar"
               alt="暂无图片"></div>
        <el-button type="danger"
                   size="mini"
                   style="padding-top:-100px"
                   @click="uploadAvatar">上传照片</el-button>
      </el-col>
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="12">姓名：<el-input v-model="from_data.patientName"
                      placeholder="请填写"
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
          <el-col :span="12">性别：<el-input v-model="from_data.patientSex"
                      placeholder="请填写"
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">生日：<el-input v-model="from_data.patientAge"
                      placeholder="请填写"
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
          <el-col :span="12">籍贯：<el-input v-model="from_data.patientJiguang"
                      placeholder="请输入籍贯"
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">联系电话：<el-input v-model="from_data.patientPhone"
                      placeholder="请填写"
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
          <el-col :span="12">身份证号：<el-input v-model="from_data.patientIdnumber"
                      placeholder="请填写 "
                      size="mini"
                      style="width:140px;float:right"></el-input>
          </el-col>
        </el-row>

      </el-col>

      <el-col :span="4"
              style="color:red">治疗状态：<span v-if="from_data.status==0">已康复</span> <span v-if="from_data.status==1">在院治疗</span> </el-col>
      <!-- <el-col :span="2" ><el-button type="danger">编辑</el-button></el-col> -->
      <el-col :span="2">
        <!-- <el-button type="primary"
                   v-if="type=='edit'">出院</el-button> -->
        <el-button type="danger"
                   @click="submit">保存修改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="border:1px solid #444">
      <el-col :span="3"
              style="border-right:1px solid #444">
        <div style="height:280px;text-align:center">
          <div style="width:40px;height:100%;font-size:30px;margin-left:calc(50% - 20px);padding-top:40px">病症说明</div>
        </div>
      </el-col>
      <el-col :span="20"><input style="height:280px;padding:20px 5%;text-align:left;font-size:16px;width:100%"
               v-model="from_data.disease" /></el-col>
    </el-row>
    <el-row :gutter="20"
            style="border:1px solid #444">
      <el-col :span="3"
              style="border-right:1px solid #444">
        <div style="height:280px;text-align:center">
          <div style="width:40px;height:100%;font-size:30px;margin-left:calc(50% - 20px);padding-top:40px">过敏史</div>
        </div>
      </el-col>
      <el-col :span="20">
        <div style="height:280px;padding:20px 5%;text-align:left;font-size:16px">{{from_data.mark}}</div>
      </el-col>
    </el-row>
    <!-- 图片上传组件辅助-->
    <el-upload class="avatar-uploader"
               :action="apiUrl"
               :show-file-list="false"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :before-upload="beforeUpload"
               id="quill-upload">
    </el-upload>
  </div>
</template>
<script>
import { get_patientDetail, post_patient, update_patient } from "@api";
export default {
  data () {
    return {
      dddt: '右侧下肢有轻微麻木，ct显示有严重腰突症',
      patientId: null,
      type: '',
      apiUrl: 'https://star.zao7lai.top/uploads',
      from_data: {
        patientName: '',
        patientAge: '',
        patientSex: '',
        patientIdnumber: '',
        patientPhone: '',
        patientAddress: '',
        patientJiguang: '',
        patientStatus: '',
        disease: '',
        mark: '',
        patientAvatar: ''
      }
    }
  },
  mounted () {
    this.type = this.$route.query.type;
    if (this.type !== 'add') {
      this.patientId = this.$route.query.id;
      this.getDetail()
    }

  },
  methods: {
    uploadAvatar () {
      document.querySelector('#quill-upload input').click()
    },
    submit () {
      let _this = this;
      console.log(this.from_data)
      if (this.from_data.patientName == '') {
        _this.$message("error", '请填写姓名');
        return
      }
      if (this.from_data.patientSex == '') {
        _this.$message("error", '请填写性别');
        return
      }
      if (this.from_data.patientIdnumber == '') {
        _this.$message("error", '请填写身份证号');
        return
      }
      if (this.type == 'add') {
        this.creatPatient()
      } else {
        this.updatePatient()
      }


    },
    updatePatient () {
      let _this = this;
      let data = this.from_data
      update_patient(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            _this.$message("success", res.msg);
          } else {
            _this.$message("error", res.error);
          }
        })
        .catch({

        })
    },
    creatPatient () {
      let _this = this;
      let data = this.from_data
      data.id = this.patientId
      post_patient(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            _this.$message("success", res.msg);
          } else {
            _this.$message("error", res.error);
          }
        })
        .catch({

        })
    },
    getDetail () {
      let _this = this;
      let data = {
        id: this.patientId
      }
      get_patientDetail(data)
        .then(res => {
          console.log(res)
          if (res.code == 1) {
            _this.from_data = res.result
          } else {
            _this.$message("error", res.error);
          }
        })
        .catch({

        })
    },
    // 上传图片前
    beforeUpload (res, file) {
    },
    // 上传图片成功
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 如果上传成功
      console.log(res)
      this.from_data.patientAvatar = res
    },
    // 上传图片失败
    uploadError (res, file) {
      this.$message("error", '图片插入失败')
    },
  }
}
</script>
<style >
.userAva {
  width: 120px;
  height: 150px;
}
.userAva img {
  width: 120px;
  height: 150px;
  border: 1px solid #444;
}
</style>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>