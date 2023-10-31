<template>
  <el-dialog :title="dlgTitle" width="width:600px" :visible.sync="dialogVisible" @before-close="resetForm">
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px">
      <el-form-item v-if="falg !== 0" label="ID">
        <el-input v-if="form.bookId !== 0" v-model="form.bookId" :disabled="form.bookId > 0" />
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" />
      </el-form-item>
      <el-form-item label="isbn">
        <el-input v-model="form.isbn" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="发布时间">
        <!--        <el-input v-model="form.publicationDate" />-->
        <el-date-picker v-model="form.publicationDate" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="类别">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input v-model="form.stockQuantity" />
      </el-form-item>
      <el-form-item label="上传图片">
        <!--        <el-input v-model="form.imageUrl" />-->
        <el-upload
          style="width: 100%"
          class="avatar-uploader"
          action="http://localhost:8087/upLoad/uploadImage"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img
            v-if="form.imageUrl"
            :src="'http://localhost:8087/upLoad/read/'+form.imageUrl"
            class="avatar"
            alt="Avatar"
            style="width: 100px; height: 100px;"
          >
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEditSave">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getbyid, savebook } from '@/api/book'

export default {
  components: {},
  data() {
    return {
      falg: null,
      dlgTitle: '',
      dialogVisible: false,
      form: {
        bookId: 0,
        author: '',
        name: '',
        isbn: '',
        price: '',
        publicationDate: '',
        description: '',
        category: '',
        stockQuantity: '',
        imageUrl: ''
      }
    }
  },
  computed: {},
  methods: {
    resetForm() {
      this.form = {
        bookId: '',
        author: '',
        name: '',
        isbn: '',
        price: '',
        publicationDate: '',
        description: '',
        category: '',
        stockQuantity: '',
        imageUrl: ''
      }
    },
    onOpen(data) {
      this.form.bookId = data
      this.falg = data
      if (data === 0) {
        this.dlgTitle = '上架图书'
        this.resetForm()
      } else {
        const id = { id: data }
        getbyid(id).then((rsp) => {
          if (rsp.data.code === 200) {
            this.form = rsp.data.data
          } else {
            this.$message.error(rsp.msg)
          }
        })
        this.dlgTitle = '修改图书'
      }
      this.dialogVisible = true
    },
    onEditSave() {
      if (this.form.author === '' || this.form.name === '' || this.form.price === '' || this.form.publicationDate === '') {
        this.$message.error('请将数据填写完整')
        return
      }
      const data = this.form
      savebook(data).then((rsp) => {
        if (rsp.data.code === 200) {
          this.resetForm()
          this.$message.success('保存成功!')
          this.dialogVisible = false
          this.$emit('onRefresh')
        } else {
          this.$message.error(rsp.msg)
        }
      })
    },
    handleSuccess(response, file, fileList) {
      console.log(response.data)
      this.form.imageUrl = response.data
      console.log(this.form.imageUrl)
    },
    beforeUpload(file) {
      if (this.form.imageUrl) {
        this.form.imageUrl = null
      }
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message.error('只能上传图片文件')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    }
  }
}
</script>

