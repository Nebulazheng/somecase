<template>
<div>
  <el-row style="width:80%;margin-left:10%;font-size:17px;margin-top:15px">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">运营方</el-col>
        <el-col :span="10"  style="height:50px;">
          <div style="width:100%;height:40px">
           <el-select v-model="value" placeholder="请选择" style="width:220px">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
           </el-select>
          </div>
        </el-col>
  </el-row>
 <el-row style="width:80%;margin-left:10%;font-size:15px;margin-top:15px">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">APP名称</el-col>
        <el-col :span="10"  style="height:50px;padding-left:4px">
          <div style="width:220px;height:40px">
           <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
  </el-row>
  <el-row style="width:80%;margin-left:10%;font-size:15px;margin-top:15px">
        <el-col :span="5" :offset="1" style="height:50px;line-height:40px;text-align:center">Banner图片</el-col>
        <el-col :span="10"  style="height:50px;padding-left:4px">
          <div >
        <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-col>
  </el-row>
</div>

</template>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>

.sel_c{width: 250px;height: 40px;}

</style>
<script>
  export default {
      name: 'alertbox',
    data() {
      return {
          input3:'',
          imageUrl: '',
           fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods:{
        submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      
      beforeAvatarUpload(file) {
          let _this=this;
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 6;

        if (!isJPG) {
          _this.$message("info",'上传头像图片只能是 JPG png格式!');
        }
        if (!isLt2M) {
          _this.$message("info",'上传头像图片大小不能超过 6MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>