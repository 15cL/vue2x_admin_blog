<template>
  <div class="side_bar">
    <el-menu
      ref="menu"
      default-active="2"
      :default-openeds="arr"
      :unique-opened="true"
      router
      @open="handleOpen"
      @close="handleClose"
      style="min-width: 200px;height:100vh"
    >
      <SideBarItem :allRoutes="allRoutes"></SideBarItem>
    </el-menu>
  </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue'
import { uRoutes } from '@/router/index'
export default {
  components: {
    SideBarItem
  },
  data () {
    return {
      arr: []
    }
  },
  computed: {
    allRoutes () {
      return uRoutes
    }
  },
  watch: {
    '$route.path' (n, o) {
      if (n === '/home') {
        this.arr = []
      }
    }
  },
  methods: {
    handleClose (a, b) {
    },
    handleOpen (a, b) {
      if (a === 'article') {
        this.$router.push(`/home/${a}/list`)
        this.arr = ['article']
      }
      if (a === 'user') {
        this.$router.push(`/home/${a}/userinfo`)
        this.arr = ['user']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
