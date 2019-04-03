import client from "./client"

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
    original: "",
    remaining: "",
    startedDate: null,
    startedTime: null,
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

  async addWorklogToIssue(state) {
    let request = state.worklog
    let worklog = await client.addWorklogToIssue(request.original, 
      request.remaining, request.content, request.issueId)

    state.commit('worklogAdded', worklog)
  },

  async issueStatusChanged(state, issueStatusId) {
    let response = client.issueStatusChange(state.state.detail.id, issueStatusId)
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
    state.worklog = {
      dialogVisible: state.worklog.dialogVisible,
      issueId: state.worklog.issueId,
      original: "",
      remaining: "",
      startedDate: null,
      startedTime: null,
      content: ""
    }
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

  timerTrackerClose(state) {
    state.worklog.dialogVisible = false
  },

  timerTrackerVisible(state, visible) {
    state.worklog.dialogVisible = visible
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