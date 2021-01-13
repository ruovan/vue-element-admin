<template>
  <div class="dropzone-container">
    <el-card class="dropzone-card">
      <div class="editor-container">
        <dropzone
          id="myVueDropzone"
          url="https://httpbin.org/post"
          @dropzone-removedFile="dropzoneR"
          @dropzone-success="dropzoneS"
        />
      </div>
    </el-card>
    <!--  -->
    <el-card class="dropzone-card">
      <el-button type="primary" @click="imageUpload" style="margin-bottom:15px;"
        >上传</el-button
      >
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        ref="imageUploadRef"
        :auto-upload="false"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-progress="handleProgress"
        :limit="1"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-card>
    <el-card class="dropzone-card">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone'

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: '上传成功', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: '删除成功', type: 'success' })
    },
    // --------------
    handleProgress(event, file, fileList) {
      console.log(fileList)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    imageUpload() {
      this.$refs.imageUploadRef.submit()
    }
  }
}
</script>
<style lang="scss" scoped>
.dropzone-card {
  margin-bottom: 50px;
}
</style>
