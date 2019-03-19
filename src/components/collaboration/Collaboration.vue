<template>
  <div>
    <el-row type="flex">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">项目</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">Jinjr</a></el-breadcrumb-item>
          <el-breadcrumb-item>Jinjr 面板</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      
    </el-row>
    <el-row type="flex">
      <el-col :span="24">
        <h1>待办事项列表</h1>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="2">
        <el-input v-model="filters.search"  size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="22" :offset="1">
        <div>
          <div>
              <h2>Jinjr 面板 冲刺1</h2>
              <div>冲刺描述</div>
          </div>
          <el-table :data="userstories" :border="true" :show-header="false" size="mini" stripe="true">
            <el-table-column
              prop="title"
              label="标题"
              width="*">
            </el-table-column>
            <el-table-column
              prop="sequence"
              width="50"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="storyPoints"
              width="50"
              label="估算">
            </el-table-column>
          </el-table>
          <div>
            <span>+ 创建事务</span>
          </div>
        </div>
        <div>
          <el-row type="flex">
            <el-col :span="22">
              <h2>待办事项列表</h2> <span></span>
            </el-col>
            <el-col :span="1" justify="end">
              <el-button size="mini">创建冲刺</el-button>
            </el-col>
          </el-row>
          <el-table :data="userstories" :border="true" :show-header="false" size="mini" stripe="true">
            <el-table-column
              prop="title"
              label="标题"
              width="*">
            </el-table-column>
            <el-table-column
              prop="sequence"
              width="50"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="storyPoints"
              width="50"
              label="估算">
            </el-table-column>
          </el-table>
          <div>
            <span>+ 创建事务</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      filters: {
        search: ''
      },
      userstories: [
        {
          title: "title1",
          sequence: 1,
          storyPoints: 5
        },
        {
          title: "title1",
          sequence: 1,
          storyPoints: 5
        },
        {
          title: "title1",
          sequence: 1,
          storyPoints: 5
        },
        {
          title: "title1",
          sequence: 1,
          storyPoints: 5
        }
      ]
    }
  }
}
</script>