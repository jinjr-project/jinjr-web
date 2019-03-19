import mock from "./issue_mock"

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
    mock.sprints.forEach(sprint => {
      sprint.isTodo = false
    })
    mock.sprints.push({
      name: "待办列表",
      stories: []
    })
    state.commit("setIssues", mock.sprints)
  }
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
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }