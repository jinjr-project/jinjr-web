import client from "./client"

const state = {
  todo: {
    visible: false,
    title: ""
  },
  detail: {
    summary: "",
    summaryEditing: false
  },
  sourceDetail: {

  },
  sprints: [],
  worklog: {
    dialogVisible: true,
    issueId: 0,
    original: "",
    remaining: "",
    startedDate: null,
    startedTime: null,
    content: ""
  }
}

const getters = {
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

  async openIssueDetail(state, issue) {
    state.commit('openIssueDetail', issue)
  },

  async detailSummaryCommit(state) {
    let detail = state.state.detail;
    await client.issueSummaryChange(detail.id, detail.summary)
    state.commit('summaryCommited', {})
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

  addIssue(state, issue) {
    let sprint = findSprintById(state, issue.sprint.id)
    sprint.issues.push(issue.issue)
  },

  openIssueDetail(state, issue) {
    state.detail = Object.assign({}, issue)
    state.sourceDetail = issue
  },

  detailSummaryChanged(state, text) {
    state.detail.summary = text
  },

  summaryCommited(state) {
    state.sourceDetail.summary = state.detail.summary
  },

  timeTrackerRemainingChanged(state, remaining) {
    state.worklog.remaining  = remaining
  },

  timeTrackerOriginalChanged(state, original) {
    state.worklog.original = original
  },

  timeTrackerStartedDateChanged(state, started) {
    state.worklog.startedDate = started
  },

  timeTrackerStartedTimeChanged(state, started) {
    state.worklog.startedTime = started
  },

  timeTrackerContentChanged(state, content) {
    state.worklog.content = content
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}