<template>
  <div class="cate_page">
   <el-card class="card">
      <div slot="header" class="title">
        <el-button type="primary" @click="addCateOpen">新增标签</el-button>
      </div>
      <div>
        <el-table stripe :data="list" v-loading='loading'>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="update(scope.row)" type="text">编辑</el-button>
              <el-button @click="deleteR(scope.row.id)" type="text" >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          width="30rem"
          :title="title"
          :visible.sync="dialogFormVisible"
        >
        <el-form :model="selectList" style="padding:1rem">
          <el-form-item  prop="name" label="名称" label-width="3rem">
            <el-input v-model="selectList.name"></el-input>
          </el-form-item>
          <el-row style="text-align:center;padding-top:1rem">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button v-if="selectList.id" type="primary" :plain="true" @click='updateCate(selectList.id)'>确定</el-button>
            <el-button v-else type="primary" :plain="true" @click='addCate(selectList.name)'>确定</el-button>
          </el-row>
        </el-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      list: [],
      dialogFormVisible: false,
      title: '',
      selectList: {
        name: '',
        id: ''
      }
    }
  },
  created () {
    if (this.getCates()) {
      this.loading = false
    }
  },
  methods: {
    ...mapActions(['cate/updateCate', 'cate/delCate', 'cate/addCate']),
    async   getCates () {
      const res = await this.$store.dispatch('cate/getCates')
      this.list = res.data.data
      window.localStorage.setItem('json_cate', JSON.stringify(res.data.data))
      return true
    },

    // 更新标签 打开dialog
    update (row) {
      this.dialogFormVisible = true

      // 解决浅拷贝导致引用对象的改变
      this.selectList = JSON.parse(JSON.stringify(row))
    },
    // 更新标签
    async  updateCate (id) {
      const res = await this['cate/updateCate']({ cateName: this.selectList.name, id })
      if (res.data.status === 0) {
        this.$message({
          message: '更新标签成功',
          type: 'success'
        })
        location.reload()
      }
      this.dialogFormVisible = false
    },

    // 删除标签
    async deleteR (id) {
      const res = await this['cate/delCate'](id)
      if (!res.data.status) {
        this.$message({
          message: '删除标签成功',
          type: 'success'
        })
        location.reload()
      }
    },

    // 新增标签 打开dialog
    addCateOpen () {
      this.selectList.name = ''
      this.selectList.id = ''
      this.dialogFormVisible = true
    },
    // 新增标签
    async addCate (cateName) {
      const res = await this['cate/addCate'](cateName)
      if (!res.data.status) {
        this.$message({
          message: '新增标签成功',
          type: 'success'
        })
        location.reload()
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cate_page {
  padding: 1rem;
  .card {
    height: 44rem;
    .title {
      display: flex;
      justify-content: right;
      padding: 0 5rem;
    }
  }
}
</style>
