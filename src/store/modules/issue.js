import client from "./client"
import moment from 'moment'

const state = {
  layout: {
    issuesGrid: 24,
    detailGrid: 8
  },
  todo: {
    visible: false,
    title: ""
  },
  detail: {
    visible: false,
    summary: "",
    summaryEditing: false
  },
  sourceDetail: {

  },
  sprints: [],
  worklog: {
    dialogVisible: false,
    issueId: 0,
    spent: "",
    remaining: "",
    started: null,
    content: ""
  },
  statuses: []
}

const getters = {
  selectableStatuses: state => {
    // let issueStatus = state.detail.status
    // let issueStatues = state.statuses.filter((status) => issueStatus && issueStatus.id != status.id)
    let statuses = state.statuses
    return statuses
  },

  issueWorklogPercent: state => {
    let tracking = state.detail.time_tracking;
    if (!tracking) {
      return 0;
    }
    
    return (tracking.time_spent.seconds / tracking.original_estimate.seconds) * 100;
  }
}

const actions = {
  async loadIssues(state) {
    let sprints = await client.loadSprints()
    state.commit("setIssues", sprints)
  },

  async addNewIssue(state, issue) {
    let created = await client.createIssueToSprint(issue.sprint.id, issue.summary)
    state.commit('addIssue', { sprint: issue.sprint, issue: created })
  },

  async loadIssueDetail(state, issue) {
    let loadedIssue = await client.loadIssue(issue.id)
    let issueStatuses = await client.loadIssueStatuses()
    state.commit("setIssueStatuses", issueStatuses)
    state.commit('setIssueDetail', loadedIssue)
  },

  async changeIssueSummary(state) {
    let detail = state.state.detail;
    await client.issueSummaryChange(detail.id, detail.summary)
    state.commit('summaryCommited', {})
  },

  async addWorklog(state, command) {
    let started = moment(command.started).format("YYYY-MM-DD[T]HH:mm:ss")
    let worklog = await client.addWorklogToIssue(command.spent,
      command.remaining, started, command.content, command.issueId)

    state.commit('worklogAdded', worklog)
    await state.dispatch('loadIssueDetail', {id: command.issueId})
  },

  async issueStatusChanged(state, issueStatusId) {
    await client.issueStatusChange(state.state.detail.id, issueStatusId)
    state.commit('issueStatusChangeById', issueStatusId)
  }
}

function findSprintById(state, id) {
  for (let sprint of state.sprints) {
    if (sprint.id == id) {
      return sprint
    }
  }

  return null
}

const mutations = {
  showTodoWriter(state) {
    state.todo.visible = true
  },

  todoChanged(state, text) {
    state.todo.title = text
  },

  setIssues(state, sprints) {
    state.sprints = sprints
  },

  setIssueStatuses(state, issueStatuses) {
    state.statuses = issueStatuses
  },

  addIssue(state, issue) {
    let sprint = findSprintById(state, issue.sprint.id)
    sprint.issues.push(issue.issue)
  },

  setIssueDetail(state, issueDetail) {
    state.detail = Object.assign({}, issueDetail)
    state.sourceDetail = issueDetail

    state.layout.issuesGrid = 16
    state.layout.detailGrid = 8
    state.detail.visible = true
  },

  issueStatusChangeById(state, issueStatusId) {
    window.console.debug("issue.mutations.issueStatusChangeById")
    for (let status of state.statuses) {
      if (issueStatusId == status.id) {
        state.detail.status = status
        break
      }
    }
  },

  setIssueSummary(state, summary) {
    state.detail.summary = summary
  },

  summaryCommited(state) {
    state.sourceDetail.summary = state.detail.summary
  },

  worklogAdded(state) {
    state.worklog.dialogVisible  = false
  },

  setTimeTrackerRemaining(state, remaining) {
    state.worklog.remaining  = remaining
  },

  setTimeTrackerSpent(state, spent) {
    state.worklog.spent = spent
  },

  setTimeTrackerStarted(state, started) {
    state.worklog.started = started
  },

  setTimerTrackerVisible(state, visible) {
    state.worklog.dialogVisible = visible
  },

  setTimeTrackerContent(state, content) {
    state.worklog.content = content
  },

  initalizeTimeTracking(state, issueId) {
    window.console.debug("initalizeTimeTracking")
    state.worklog.issueId = issueId
    state.worklog.spent = ""
    state.worklog.remaining = ""
    state.worklog.started = (new Date()).toString()
    state.worklog.content = ""
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}