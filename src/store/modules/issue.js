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
  sprints: []
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
    console.log("action openIssueDetail")
    state.commit('openIssueDetail', issue)
  },

  async detailSummaryCommit(state) {
    let detail = state.state.detail;
    let issue = await client.issueSummaryChange(detail.id, detail.summary)
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
    console.log("mutation openIssueDetail")
    state.detail = issue
  },

  detailSummaryChanged(state, text) {
    state.detail.summary = text
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}