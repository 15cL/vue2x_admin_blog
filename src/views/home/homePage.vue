<template>
  <div class="home_page">
    <header>
      <h1>Blog管理系统</h1>
      <h4 style="cursor: pointer" @click="logout">
        <i class="el-icon-setting"></i> 退出
      </h4>
    </header>
    <el-container>
      <el-aside>
        <SideBar></SideBar>
      </el-aside>
      <el-container style="display: flex;justify-content: center;">
        <router-view v-if="$route.path != '/home'"></router-view>
        <div class="detail_home" v-else><h1>欢迎惠顾小五的BLOG管理系统｀（*∩_∩*）′</h1></div>
      </el-container>
    </el-container>
    <footer
      style="
        position: absolute;
        bottom: 1.2rem;
        width: 100vw;
        text-align: center;
        color: rgba(172, 166, 166, 0.862);
        font-size: 0.5rem;
      "
    >
      这是属于小五的BLog管理系统 © 2022.11.21 Sio
    </footer>
  </div>
</template>

<script>
import SideBar from '@/components/NavBar/SideBar.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    SideBar
  },
  async created () {
    await this.getTags() // 获取所有标签
    await this.getCates() // 获取所有分类
  },
  methods: {
    ...mapMutations(['user/removeToken']),
    logout () {
      this['user/removeToken']()
      this.$router.push('/login')
    },
    // 获取所有标签
    async getTags () {
      const res = await this.$store.dispatch('tag/getTags')
      window.localStorage.setItem('json_tag', JSON.stringify(res.data.data))
    },
    // 获取所有分类
    async getCates () {
      const res = await this.$store.dispatch('cate/getCates')
      window.localStorage.setItem('json_cate', JSON.stringify(res.data.data))
    }
  }
}
</script>

<style lang="scss" scoped>
.home_page {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 15rem;
    color: white;
  }
  header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 6.625rem;
    background: transparent url("../../assets/pic/loginbg.jpg") center center
      no-repeat;
    filter: blur(1px);
    filter: brightness(0.3);
    z-index: -1;
    background-size: cover;
  }
  .detail_home{
    display: flex;
    padding-top: 13rem;
  }
}
</style>
