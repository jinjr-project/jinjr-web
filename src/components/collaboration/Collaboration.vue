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
          <el-row>
            <el-col :span="16">
              <el-table :data="sprint.issues" :border="true" :show-header="false" size="mini" @row-click="openIssueDetail">
                <el-table-column
                  prop="summary"
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
                  <el-input border="false" :value="todo.title" @input="todoChanged"><el-button slot="suffix" @click="addNewTodo(sprint)">创建</el-button></el-input>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <!-- <h1 v-if="!detail.summaryEditing">{{detail.summary}}</h1> -->
              <el-input :value="detail.summary" @input="detailSummaryChanged" @keyup.enter.native="onDetailSummaryEnter"></el-input>
              <jj-progress v-bind:value="20"></jj-progress>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<style scoped>
  jj-progress {
    width: 100%;
    height: 25px;
  }
</style>
<script>
import { mapState/*, mapActions*/ } from 'vuex'

import Progress from './Progress'

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
    sprints: state => state.issue.sprints,
    detail: state => state.issue.detail
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
    },
    addNewTodo(sprint) {
      this.$store.dispatch("issue/addNewIssue", {sprint: sprint, summary: this.todo.title})
    },

    openIssueDetail(row) {
      this.$store.dispatch("issue/openIssueDetail", row)
    },

    detailSummaryChanged(text) {
      this.$store.commit("issue/detailSummaryChanged", text)
    },

    onDetailSummaryEnter(e) {
      this.$store.dispatch("issue/detailSummaryCommit", {})
    }
  },

  components: {
    'jj-progress': Progress
  }
}
</script>