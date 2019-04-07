<template>
  <div>
    <el-dialog
      title="时间跟踪"
      :visible.sync="worklog.dialogVisible"
      width="35%"
      :before-close="onCloseTimeTracker">
      
      <jj-time-tracker 
        :remaining="worklog.remaining"
        @remainingChanged="timeTrackerRemainingChanged"
        :spent="worklog.spent"
        @spentChanged="timeTrackerSpentChanged"
        :started="worklog.started"
        @startedChanged="timeTrackerStartedChanged"
        :content="worklog.content"
        @contentChanged="timeTrackerContentChanged"
      >
      </jj-time-tracker>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="onClickSaveTimeTracker" size="small">保存</el-button>
      </span>
    </el-dialog>

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
            <el-col :span="layout.issuesGrid">
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
            <el-col :span="layout.detailGrid" v-if="detail.visible">
              <!-- <h1 v-if="!detail.summaryEditing">{{detail.summary}}</h1> -->
              <el-input :value="detail.summary" @input="onIssueSummaryChanged" @keyup.enter.native="onIssueSummaryEnter"></el-input>
              <div>
                <h5>状态</h5>
                <el-select v-bind:value="detail.status.name" @change="issueStatusChanged" size="small">
                  <el-option
                    v-for="issueStatus in selectableStatuses"
                    :key="issueStatus.id"
                    :label="issueStatus.name"
                    :value="issueStatus.id">
                  </el-option>
                </el-select>
              </div>
              <div>
                <h5>时间跟踪</h5>
                <jj-progress 
                  v-bind:value="issueWorklogPercent"
                  :time-tracking="detail.time_tracking"
                  @click.native="openTimeTracker()">
                </jj-progress>
              </div>
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

  h5 {
    margin: 10px;
  }

  /* full-width {
    width: 10%;
  } */
</style>
<script>
import { mapState,/*, mapActions*/ 
mapGetters} from 'vuex'

import Progress from './Progress'
import TimeTracker from './TimeTracker'

export default {
  data() {
    return {
      filters: {
        search: ''
      },
      remaining: "",
      a: 16
    }
  },
  computed: mapState({
    todo: state => state.issue.todo,
    sprints: state => state.issue.sprints,
    detail: state => state.issue.detail,
    worklog: state => state.issue.worklog,
    layout: state => state.issue.layout,
    statuses: state => state.issue.statuses,

    ...mapGetters('issue', {
      selectableStatuses: 'selectableStatuses',
      issueWorklogPercent: 'issueWorklogPercent'
    })
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
      this.$store.dispatch("issue/loadIssueDetail", row)
    },

    issueStatusChanged(issueStatusId) {
      window.console.debug(`Collaboration.vue: issue status changed [${issueStatusId}]`)
      this.$store.dispatch("issue/issueStatusChanged", issueStatusId)
    },

    onIssueSummaryChanged(summary) {
      this.$store.commit("issue/setIssueSummary", summary)
    },

    onIssueSummaryEnter(e) {
      this.$store.dispatch("issue/changeIssueSummary", {})
    },

    onClickSaveTimeTracker() {
      this.$store.dispatch("issue/addWorklog", {
        issueId: this.detail.id,
        spent: this.worklog.spent,
        remaining: this.worklog.remaining,
        content: this.worklog.content,
        started: this.worklog.started
      })
    },

    onCloseTimeTracker() {
      window.console.debug("on close time tracker")
      this.$store.commit('issue/setTimerTrackerVisible', false);
    },

    openTimeTracker() {
      window.console.debug('open time tracker')
      this.$store.commit('issue/initalizeTimeTracking', this.detail.id);
      this.$store.commit('issue/setTimerTrackerVisible', true);
    },

    timeTrackerRemainingChanged(remaining) {
      this.$store.commit('issue/setTimeTrackerRemaining', remaining)
    },

    timeTrackerSpentChanged(spent) {
      window.console.debug(`time tracker spent changed ${spent}`)
      this.$store.commit('issue/setTimeTrackerSpent', spent)
    },

    timeTrackerStartedChanged(val) {
      window.console.debug(`time tracker started changed ${val}`)
      this.$store.commit('issue/setTimeTrackerStarted', val)
    },

    timeTrackerContentChanged(val) {
      window.console.debug(`time tracker content changed ${val}`)
      this.$store.commit('issue/setTimeTrackerContent', val)
    }
  },

  components: {
    'jj-progress': Progress,
    'jj-time-tracker': TimeTracker
  }
}
</script>