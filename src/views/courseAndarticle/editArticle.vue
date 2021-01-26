<template>
  <div style="margin-top:3vh;overflow:scroll">
    <el-row :gutter="20"
            style="margin-left:15px">
      <el-col :span="12">
        <el-input placeholder="请输入文章标题"
                  v-model="from_data.articleTitle">
          <template slot="prepend">
            <div style="width:80px">文章标题:</div>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-left:15px;margin-top:20px">
      <el-col :span="12">
        <el-input placeholder="请输入文章副标题"
                  v-model="from_data.articleNextTitle">
          <template slot="prepend">
            <div style="width:80px">副标题:</div>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top:20px;margin-left:15px">
      <el-col :span="2">
        <div style="height:40px;width:80px;line-height:40px">文章分类</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="from_data.articleClass"
                   placeholder="请选择分类"
                   style="width:130px">
          <el-option v-for="item in articleOpt"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请填写作者"
                  v-model="from_data.articleAuthor">
          <template slot="prepend">
            <div style="width:40px">作者:</div>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-left:15px;margin-top:20px">
      <el-col :span="5">
        <el-input placeholder="排序（降序）"
                  v-model="from_data.sort">
          <template slot="prepend">
            <div style="width:40px">排序:</div>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <div>
      <el-row :gutter="20"
              style="margin-top:20px">
        <el-col :span="3">封面图： </el-col>
        <el-col :span="8">
          <el-upload class="avatar-uploader"
                     :action="apiUrl"
                     accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess">
            <img v-if="from_data.articleCover"
                 :src="from_data.articleCover"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <div style="height:650px;width:80%;margin-left:15px">
      <!-- 图片上传组件辅助-->
      <el-upload class="avatar-uploader"
                 :action="apiUrl"
                 accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG,.mp4"
                 :show-file-list="false"
                 :on-success="uploadSuccess"
                 :on-error="uploadError"
                 :before-upload="beforeUpload"
                 id="quill-upload">
      </el-upload>
      <!-- 视频上传组件辅助-->
      <el-upload class="avatar-uploader"
                 :action="apiUrl"
                 accept=".mp4"
                 :show-file-list="false"
                 :on-success="uploadVideoSuccess"
                 :on-error="uploadVideoError"
                 :before-upload="beforeVideoUpload"
                 id="quill-video-upload">
      </el-upload>
      <quill-editor class="editor"
                    ref="myQuillEditor"
                    v-model="from_data.articleCntm"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)"
                    style="height:400px">
      </quill-editor>
      <el-button type="danger"
                 style="margin-top:100px"
                 @click="post_article"
                 v-if="type=='add'">保存制作</el-button>
      <el-button type="danger"
                 style="margin-top:100px"
                 @click="updateArticle"
                 v-if="type=='edit'">保存修改</el-button>
    </div>

  </div>
</template>
<style >
.el-select .el-input {
  width: 100% !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 208px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}
.avatar {
  width: 208px;
  height: 138px;
  display: block;
}
</style>

<script>

import { post_article, get_articleDetail, update_article } from "@api";
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }], // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  [{ 'direction': 'rtl' }], // text direction

  [{ 'size': ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '32px', '48px'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['image'],
  ['clean'] // remove formatting button
]
export default {
  data () {
    return {
      quillUpdateImg: false,
      type: 'edit',
      editorOption: {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false);
                }
              },
              'video': function (value) {
                if (value) {
                  document.querySelector('#quill-video-upload input').click()
                } else {
                  this.quill.format('video', false);
                }
              }
            }
          }
        }
      }, // 富文本编辑器配置
      from_data: {
        articleCover: '',
        articleClass: '',
        articleCntm: '',
        articleNextTitle: '',
        articleTitle: '',
        articleAuthor: '',
        sort: 99,
      },

      articleOpt: [
        { label: '科普知识', value: 0 },
        { label: '经典病例', value: 1 },
        { label: '日常防护', value: 2 },
        { label: '术后恢复', value: 3 },
      ],
      apiUrl: 'https://star.zao7lai.top/uploads',
      // apiUrl: 'http://127.0.0.1:3003/uploads'

    }
  },
  mounted () {
    let today = this.$moment().locale('zh-cn').format('YYYY-MM-DD');
    let yestoday = this.$moment(new Date()).add(-1, 'days').format("YYYY-MM-DD");
    this.type = this.$route.query.type
    if (this.type == 'edit') {
      this.get_detail()
    }

  },

  methods: {
    handleAvatarSuccess (t) {
      console.log(t)
      this.from_data.articleCover = t
    },
    updateArticle () {
      let _this = this;
      update_article(this.from_data)
        .then(res => {
          console.log('更新article:', res)
          if (res.code) {
            _this.$message("success", res.msg)
          }
        })
    },
    get_detail () {
      let _this = this
      let data = {
        id: this.$route.query.id
      }
      get_articleDetail(data)
        .then(res => {
          console.log(res)
          _this.from_data = res.result.row[0]
        })
    },
    post_article () {
      let _this = this
      let data = this.from_data
      console.log(data)
      if (this.from_data.articleTitle == '') {
        this.$message("error", '请填写文章标题')
        return
      }
      if (this.from_data.articleNextTitle == '') {
        this.$message("error", '请填写文章副标题')
        return
      }
      if (this.from_data.articleAuthor == '') {
        this.$message("error", '请填写文章作者')
        return
      }
      if (this.from_data.articleClass == '') {
        this.$message("error", '选择文章分类')
        return
      }
      if (this.from_data.articleCover == '') {
        this.$message("error", '请上传封面图')
        return
      }
      post_article(data)
        .then(res => {
          console.log(res)
          _this.$message("success", '新增文章成功');
          this.from_data = {
            articleCover: '',
            articleClass: '',
            articleNextTitle: '',
            articleTitle: '',
            articleAuthor: '',
            sort: 99,
          }
        })
    },
    // 失去焦点
    onEditorBlur (editor) { },
    // 获得焦点
    onEditorFocus (editor) { },
    // 开始
    onEditorReady (editor) { },
    // 值发生变化
    onEditorChange (editor) {
      this.from_data.articleCntm = editor.html;
      console.log(editor);
    },
    // 上传图片前
    beforeUpload (res, file) {
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      console.log(res)
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片 res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        _this.$message("error", '插入图片失败');
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传视频前
    beforeUpload (res, file) {
      this.quillUpdateImg = true
    },
    // 上传视频成功
    uploadVideoSuccess (res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      console.log(res)
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片 res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'video', res)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        _this.$message("error", '插入视频失败');
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传视频失败
    uploadVideoError (res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message("error", '视频插入失败')
    },
    // 上传图片失败
    uploadError (res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message("error", '图片插入失败')
    },
  }
}
</script>
