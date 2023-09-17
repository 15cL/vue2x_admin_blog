<template>
  <div class="avatar_upload">
    <el-upload
      class="avatar-uploader"
      :headers="myheader"
      action="#"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-change="getfile"
      :auto-upload="false"
    >
      <img v-if="imageUrl||picUrl" :src="imageUrl||picUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['picUrl'],
  data () {
    return {
      imageUrl: '',
      raw: ''
    }
  },
  computed: {
    myheader () {
      return { Authorization: window.localStorage.getItem('token') }
    }
  },
  created () {
    this.imageUrl = this.picUrl
  },
  methods: {
    ...mapActions(['user/reAvatar']),
    handleAvatarSuccess (res, file) {},
    beforeAvatarUpload (file) {
      const fileType = file.raw.type
      const isJPG =
        fileType === 'image/jpg' ||
        fileType === 'image/jpeg' ||
        fileType === 'image/png'
      const isLt2M = file.raw.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG和PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    getfile (file, fileList) {
      // 格式校验
      const isFileType = this.beforeAvatarUpload(file)
      if (!isFileType) {
        fileList = []
        return
      }
      // this.imageUrl = file.raw // 这个就是咱们上传图片的二进制对象
      if (this.$route.path === '/home/article/list') {
        this.getBase64(file.raw).then((res) => {
          this.$emit('getAva', { name: file.name, url: res })
          this.imageUrl = res
        })
      } else {
        this.getBase64(file.raw).then((res) => {
          this.$store.dispatch('user/reAvatar', {
            avatar: { name: file.name, url: res }
          })
        })
      }

      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 图片转base64
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
