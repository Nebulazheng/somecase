<template>
  <div style="padding-top:60px">
    <el-row>
      <el-col :span="12"
              :offset="2">
        <el-button @click="creatCourse"
                   style="float:left"
                   type="danger">立即保存</el-button>
      </el-col>
    </el-row>

    <el-form :model="course"
             ref="course"
             label-width="100px"
             style="margin-top:10px">
      <el-form-item label="课程名称"
                    :rules="{
      required: true, message: '课程名称不能为空', trigger: 'blur'
    }">
        <el-input v-model="course.courseName"
                  style="width:30%;float:left"></el-input>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input v-model="course.courseIntroduction"
                  style="width:30%;float:left"></el-input>
      </el-form-item>
      <el-form-item label="课程分类">
        <el-select v-model="course.courseClass"
                   placeholder="请选择"
                   style="float:left">
          <el-option v-for="item in courseClass"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图">
        <img :src="course.courseCover"
             class="coverImg"
             v-if="course.courseCover"
             @click="imgUpload">
        <el-button style="float:left"
                   @click="imgUpload"
                   v-else>上传</el-button>
      </el-form-item>
      <div class="caseBox">
        <el-form-item v-for="(item, index) in course.courseVideos"
                      :label="'选集名称'"
                      :key="index"
                      :rules="{
      required: true, message: '选集名称不能为空', trigger: 'blur'
    }">
          <el-input v-model="item.title"
                    style="width:40%;float:left"></el-input>
          <el-upload :action="apiUrl"
                     id="videoUpload"
                     accept=".mp4"
                     :show-file-list="false"
                     :on-success="(value)=>handleVideoSuccess(value,{'index':index,'data':item})"
                     style="float: left;"
                     v-if="!item.src">
            <el-button style="float:left">选取视频</el-button>
          </el-upload>

          <el-button v-else
                     icon="el-icon-video-play"
                     style="float:left;font-size: 28px;padding: 5px 10px;"
                     @click="openVideo(item.src)"></el-button>

          <el-button @click.prevent="removeDomain(domain)"
                     style="float:left">删除</el-button>
        </el-form-item>
        <el-button @click="addDomain">新增选集</el-button>
      </div>

    </el-form>
    <el-upload class="avatar-uploader"
               :action="apiUrl"
               id="imgUpload"
               accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
               :show-file-list="false"
               :on-success="handleAvatarSuccess">
    </el-upload>

  </div>
</template>
<style scoped>
.videoLink{width: 100px;height: 30px;color: royalblue;text-decoration: underline;overflow: hidden;}
.coverImg{width: 180px;height: 100px;background-size: 100%;float: left;}
  .caseBox{
    width: 600px;min-height: 300px;border: 1px solid #999;margin-left: 100px;padding: 20px;
  }
</style>
<script>
import { post_course, get_course } from "@api";
export default {
  data () {
    return {
      apiUrl: 'https://star.zao7lai.top/uploads',
      courseClass: [{ label: '默认', value: 1 }],
      course: {
        courseCover: '',
        courseName: '',
        courseIntroduction: '',
        courseClass: '',
        courseNotes: '1',
        sort: 99,
        courseDay: '1',
        courseVideos: [{ src: 'https://star.zao7lai.top/assets/uploads/7923094120765599.mp4', title: '', }]
      }
    };
  },
  methods: {
    creatCourse () {
      let _this = this;
      let data = {
        courseName: this.course.courseName,
        courseIntroduction: this.course.courseIntroduction,
        courseCover: this.course.courseCover,
        courseClass: this.course.courseClass,
        courseNotes: this.course.courseNotes,
        sort: this.course.sort || 99,
        courseDay: this.course.courseDay,
        courseVideos: this.course.courseVideos
      }
      post_course(data)
        .then(res => {
          console.log(res)
          _this.$message("success", '新增成功');

        })
    },
    openVideo (url) {
      window.open(url)
    },
    handleVideoSuccess (obj, res, file) {
      console.log(obj, res, file)
      this.course.courseVideos[res.index].src = obj
    },
    handleAvatarSuccess (t) {
      this.course.courseCover = t
    },

    imgUpload () {
      document.querySelector('#imgUpload input').click()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain (item) {
      var index = this.course.courseVideos.indexOf(item)
      if (index !== -1) {
        this.course.courseVideos.splice(index, 1)
      }
    },
    addDomain () {
      this.course.courseVideos.push({
        src: '', title: ''
      });
    }
  }
}
</script>