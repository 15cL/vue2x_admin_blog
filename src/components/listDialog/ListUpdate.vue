<template>
  <div class="list_detail">
    <avatarUpload
      style="margin: 0rem 5rem 3rem"
      @getAva="getAva"
      :picUrl="imgUrl"
    ></avatarUpload>
    <el-form label-width="5rem" :model="selectList">
      <el-row>
        <el-col>
          <el-form-item prop="name" label="标题">
            <el-input type="textarea" v-model="selectList.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="author" label="作者">
            <el-input v-model="selectList.author"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="createdate" label="创建日期">
            <el-input v-model="selectList.createdate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item prop="detail" label="内容">
            <el-input
              type="textarea"
              v-model="selectList.detail"
              @focus="openEditor"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="分类">
            <el-checkbox-group v-model="selectList.cate_id">
              <el-checkbox-button
                v-for="cate of allCates"
                :key="cate.id"
                :label="cate.name"
                name="type"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="标签">
            <el-checkbox-group v-model="selectList.tag_id">
              <el-checkbox-button
                v-for="tag of allTags"
                :key="tag.id"
                :label="tag.name"
                name="type"
              ></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="update">确定</el-button>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="showEditor" fullscreen append-to-body>
      <mavon-editor v-model="selectList.detail"></mavon-editor>
      <el-button style="margin-top: 1rem" @click="okDeatail">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import avatarUpload from './avatarUpload.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    avatarUpload
  },
  props: ['list', 'tags', 'cates'],
  data () {
    return {
      selectList: {
        name: '',
        author: '',
        createdate: '',
        detail: '',
        tag_id: '',
        cate_id: '',
        traffic: '',
        id: '',
        article_avatar: ''
      },
      imgUrl: '',
      allTags: [],
      allCates: [],
      showEditor: false
    }
  },
  created () {
    this.selectList = { ...this.list }
    this.getDefaultTag()
    this.getDefaultCate()
    this.getArtAvatar()
  },
  methods: {
    ...mapActions(['article/updateArticle', 'article/getAvatar']),
    // 关闭dialog
    cancel () {
      this.$emit('cancel')
      this.selectList.tag_id = null
    },
    openEditor () {
      this.showEditor = true
    },
    okDeatail () {
      this.showEditor = false
    },
    // 获取修改的图片
    getAva (ava) {
      this.selectList.article_avatar = JSON.stringify(ava)
    },

    // 获取原来文章的图片
    async getArtAvatar () {
      const res = await this['article/getAvatar']({ id: this.list.id })
      this.imgUrl = 'data:image/png;base64,' + res
    },

    // 获取默认选中的分类
    getDefaultCate () {
      this.allCates = JSON.parse(this.cates) // 列出所有的tag
      const Idarr = JSON.parse(this.selectList.cate_id) // 获取已选中的id
      const arr = []
      const _this = this

      if (Idarr) {
        // 遍历获取默认标签
        Idarr.forEach((v) => {
          const index = _this.allCates.findIndex((m) => m.id === v)
          arr.push(_this.allCates[index].name)
        })
      }
      this.selectList.cate_id = arr
    },

    // 获取默认选中的标签
    getDefaultTag () {
      this.allTags = JSON.parse(this.tags) // 列出所有的tag
      const Idarr = JSON.parse(this.selectList.tag_id) // 获取已选中的id
      const arr = []
      const _this = this

      if (Idarr) {
        // 遍历获取默认标签
        Idarr.forEach((v) => {
          const index = _this.allTags.findIndex((m) => m.id === v)
          arr.push(_this.allTags[index].name)
        })
      }
      this.selectList.tag_id = arr
    },

    // 修改文章
    async update () {
      // 选择的标签
      const _this = this
      const tagId = []
      const cateId = []
      if (this.selectList.tag_id) {
        this.selectList.tag_id.forEach((v) => {
          const has = _this.allTags.findIndex((m) => m.name === v)
          tagId.push(this.allTags[has].id)
        })
        if (!tagId.length) {
          this.selectList.tag_id = JSON.stringify(null)
        } else {
          this.selectList.tag_id = JSON.stringify(tagId)
        }
      }
      if (this.selectList.cate_id) {
        this.selectList.cate_id.forEach((v) => {
          const has = _this.allCates.findIndex((m) => m.name === v)
          cateId.push(this.allCates[has].id)
        })
        if (!cateId.length) {
          this.selectList.cate_id = JSON.stringify(null)
        } else {
          this.selectList.cate_id = JSON.stringify(cateId)
        }
      }
      const list = this.selectList
      if (this.selectList.article_avatar.includes('./public')) {
        delete list.article_avatar
      }
      const res = await this['article/updateArticle'](list)
      if (!res.data.status) {
        this.$message({
          message: '更新文章成功',
          type: 'success'
        })
        location.reload()
      }
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped></style>
