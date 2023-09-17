<template>
  <div class="sidebar_item">
    <el-menu-item index="/home">
      <template slot="title">首页</template>
    </el-menu-item>
    <el-submenu
      v-for="(item, index) of allRoutes"
      :key="index"
      :index="item.path"
    >
      <template slot="title">{{ item.meta.title }}</template>
      <el-menu-item
        v-for="(child, index) of item.children"
        :key="index"
        :index="`/home/${item.path}/${child.path}`"
        >{{ child.meta.title }}</el-menu-item
      >
    </el-submenu>
  </div>
</template>

<script>
export default {
  props: ['allRoutes']
}
</script>

<style lang="scss" scoped>
</style>
