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
        <div v-for="sprint in sprints" :key="sprint.name">
          <div>
              <h2>{{sprint.name}}</h2>
              <div>冲刺描述</div>
          </div>
          <el-table :data="sprint.stories" :border="true" :show-header="false" size="mini">
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
            <span @click="showTodoWriter()" v-if="!todo.visible">+ 创建事务</span>
            <div v-if="todo.visible">
              <el-input border="false" :value="todo.title" @input="todoChanged"><el-button slot="suffix">创建</el-button></el-input>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<style scoped>
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      filters: {
        search: ''
      }
    }
  },
  computed: mapState({
    todo: state => state.issue.todo,
    sprints: state => state.issue.sprints
  }),

  created() {
    this.$store.dispatch("issue/loadIssues")
  },

  methods: {
    showTodoWriter() {
      this.$store.commit("issue/showTodoWriter")
    },

    todoChanged(text) {
      this.$store.commit("issue/todoChanged", text)
    }
  }
}
</script>