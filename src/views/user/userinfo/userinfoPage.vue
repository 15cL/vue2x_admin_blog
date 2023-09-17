<template>
  <div class="tag_page">
    <el-card class="card">
      <el-container>
        <avatarUpload :picUrl="userform.user_pic" v-if="userform.user_pic"></avatarUpload>
        <el-form
          label-width="3.4rem"
          :model="userform"
          style="margin: 3.5rem 0 0 2.5rem"
        >
          <el-form-item label="用户名" prop="username">
            <el-input disabled v-model="userform.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input disabled v-model="userform.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input disabled v-model="userform.email"></el-input>
          </el-form-item>
          <el-form-item
            style="
              display: flex;
              justify-content: center;
              margin: 3rem 0 0 2.5rem;
            "
          >
            <el-button type="primary" @click="show = true"
              >修改个人信息</el-button
            >
          </el-form-item>
        </el-form>
      </el-container>
    </el-card>
    <el-dialog title="编辑信息" :visible.sync="show" class="dialog_sty">
      <el-form :model="oooform" :rules="rule" label-width="3.2rem">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="oooform.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="oooform.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import avatarUpload from '@/components/listDialog/avatarUpload.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    avatarUpload
  },
  data () {
    const validateEmail = (rule, email, callback) => {
      if (email) {
        const req = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        const flag = email.match(req)
        return !flag ? callback(new Error('用户名不能为空')) : callback()
      }
    }
    return {
      userform: {
        username: '',
        nickname: '',
        email: '',
        user_pic: ''
      },
      oooform: {
        username: '',
        nickname: '',
        email: '',
        user_pic: ''
      },
      rule: {
        nickname: [
          {
            required: true,
            trigger: 'blur',
            message: '邮箱格式错误'
          }
        ],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur',
            message: '邮箱格式错误'
          }
        ]
      },
      show: false
    }
  },
  created () {
    this.getUserinfo()
  },
  methods: {
    ...mapActions(['user/updateInfo']),
    async getUserinfo () {
      const res = await this.$store.dispatch('user/getUserinfo')
      const userpic = await this.$store.dispatch('user/getAvatar', { user_pic: res.data.user_pic })
      const { username, nickname, email } = res.data
      this.userform = { username, nickname, email, user_pic: 'data:image/png;base64,' + userpic.data.baseUrl }
      this.oooform = JSON.parse(JSON.stringify(res.data))
    },
    cancel () {
      this.show = false
    },
    async updateInfo () {
      const { nickname, email } = this.oooform
      const res = await this['user/updateInfo']({ nickname, email })
      if (res.data.status === 0) {
        this.show = false
        location.reload()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 16rem !important;
  height: 2.8rem;
}
.el-form-item {
  display: flex;
}

.tag_page {
  padding: 1rem;
  .card {
    height: 44rem;
    padding: 4rem 0 0 8rem;

    .dialog-footer {
    }
  }
  .dialog_sty {
    width: 60rem;
    height: 40rem;
  }
}
</style>
