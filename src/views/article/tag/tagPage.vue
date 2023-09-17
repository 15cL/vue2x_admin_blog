<template>
  <div class="tag_page">
   <el-card class="card">
      <div slot="header" class="title">
        <el-button type="primary" @click="addTagOpen">新增标签</el-button>
      </div>
      <div>
        <el-table stripe :data="list">
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
            <el-button v-if="selectList.id" type="primary" :plain="true" @click='updateTag(selectList.id)'>确定</el-button>
            <el-button v-else type="primary" :plain="true" @click='addTag(selectList.name)'>确定</el-button>
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
    this.getTags()
  },
  methods: {
    ...mapActions(['tag/updateTag', 'tag/delTag', 'tag/addTag']),
    async getTags () {
      const res = await this.$store.dispatch('tag/getTags')
      this.list = res.data.data
      window.localStorage.setItem('json_tag', JSON.stringify(res.data.data))
    },

    // 更新标签 打开dialog
    update (row) {
      this.dialogFormVisible = true

      // 解决浅拷贝导致引用对象的改变
      this.selectList = JSON.parse(JSON.stringify(row))
    },
    // 更新标签
    async  updateTag (id) {
      const res = await this['tag/updateTag']({ tagName: this.selectList.name, id })
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
      const res = await this['tag/delTag'](id)
      if (!res.data.status) {
        this.$message({
          message: '删除标签成功',
          type: 'success'
        })
        location.reload()
      }
    },

    // 新增标签 打开dialog
    addTagOpen () {
      this.selectList.name = ''
      this.selectList.id = ''
      this.dialogFormVisible = true
    },
    // 新增标签
    async addTag (tagName) {
      const res = await this['tag/addTag'](tagName)
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
.tag_page {
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
