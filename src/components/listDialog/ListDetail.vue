<template>
  <div class="list_detail">
    <el-form label-width="5rem" :model="selectList">
      <el-row>
        <el-col>
          <el-form-item label="标题">
            <el-input
              type="textarea"
              :value="selectList.name"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="作者">
            <el-input :value="selectList.author" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="创建日期">
            <el-input :value="selectList.createdate" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :value="selectList.detail"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="分类">
            <span v-if="cates">
              <el-tag
                v-for="cate of cates"
                :key="cate.id"
                style="margin: 0.1rem"
                >{{ cate.name }}</el-tag
              >
            </span>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="标签">
            <span v-if="tags">
              <el-tag
                v-for="tag of tags"
                :key="tag.id"
                type="success"
                style="margin: 0.1rem"
                >{{ tag.name }}</el-tag
              >
            </span>
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="访问量">
            <el-input :value="selectList.traffic" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['selectList', 'cates', 'tags']
}
</script>

<style lang="scss" scoped></style>
