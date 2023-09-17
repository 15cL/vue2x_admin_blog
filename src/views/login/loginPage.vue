<template>
  <div class="login_page">
    <el-form :model="loginForm" :rules="rules" size="small">
      <el-row>
        <el-col>
          <h1>LOGIN</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="password">
            <el-input
              :type="eye ? 'text' : 'password'"
              v-model="loginForm.password"
              placeholder="请输入密码"
            >
              <i
                slot="suffix"
                :class="[
                  'icon_color',
                  'iconfont',
                  eye ? 'icon-yanjing_yincang_o' : 'icon-yanjing_xianshi_o',
                ]"
                @click="switchEye"
              ></i>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        @click="login(loginForm.username, loginForm.password)"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    const validateUsername = (rule, username, callback) => {
      if (!username) {
        return callback(new Error('用户名不能为空'))
      }
      if (username.length < 6 || username.length > 16) {
        return callback(new Error('用户名长度在6~16之间'))
      }
      const reg = /[\u4e00-\u9fa5]+/g
      return username.match(reg)
        ? callback(new Error('不能含有汉字'))
        : callback()
    }
    const validatePassword = (rule, password, callback) => {
      if (!password) {
        return callback(new Error('密码不能为空'))
      }
      if (password.length < 6 || password.length > 16) {
        return callback(new Error('密码长度在6~16之间'))
      }
    }
    return {
      eye: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['user/login']),
    switchEye () {
      this.eye = !this.eye
    },
    async  login (username, password) {
      await this['user/login']({ username, password })
      if (this.$store.getters.token) {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  height: 2.5rem;
  border: none;
  border-bottom: 0.0625rem solid white;
  background-color: rgba($color: #ced137, $alpha: 0);
  color: white;
  cursor: pointer;
  &::placeholder {
    color: #fff;
  }
  /* 谷歌 */
  &::-webkit-input-placeholder {
    color: #fff;
  }
  /* 火狐 */
  &:-moz-placeholder {
    color: #fff;
  }
  /*ie*/
  &:-ms-input-placeholder {
    color: #fff;
  }
}
.icon_color {
  font-size: 1.3rem;
  color: white;
  cursor: pointer;
}
.login_page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  .el-form {
    width: 22rem;
    padding: 3rem;
    border-radius: 1.5rem;
    background-color: rgba($color: #ced137, $alpha: 0.25);
    text-align: center;
    .el-row:first-child {
      margin-bottom: 1.5rem;
    }
    .el-button {
      width: 45%;
      margin-top: 1.3rem;
      border: none;
      background-color: rgba($color: #ced137, $alpha: 0.2);
      &:active {
        box-shadow: 0 0 1px 1px #ced137;
      }
    }
  }
}

.login_page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: transparent url("../../assets/pic/loginbg.jpg") center center
    no-repeat;
  filter: blur(5px);
  filter: brightness(0.9);
  z-index: -1;
  background-size: cover;
}
</style>
