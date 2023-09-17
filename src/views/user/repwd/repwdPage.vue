<template>
  <div class="pwd_page">
    <el-card>
      <el-header><h1>重置密码</h1></el-header>
    <div class="upper">
      <el-form :model="pwdform"  label-width="10rem">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="pwdform.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="pwdform.newPwd"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      style="width: 6rem; margin: 3rem 17rem"
      @click="submit"
      >提交</el-button
    >
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      pwdform: {
        newPwd: '',
        oldPwd: ''
      }
    }
  },
  methods: {
    ...mapActions(['user/updatePwd']),
    async submit () {
      const res = await this['user/updatePwd'](this.pwdform)
      if (res.data.status === 0) {
        this.$message({
          message: '重置密码成功',
          type: 'success'
        })
        this.pwdform.newPwd = ''
        this.pwdform.oldPwd = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pwd_page {
  padding: 10rem;
  .upper {
    ::v-deep .el-input__inner {
      width: 20rem !important;
    }
  }
}
</style>
