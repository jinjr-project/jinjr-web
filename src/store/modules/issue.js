import client from "./client"

const state = {
  todo: {
    visible: false,
    title: ""
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}