const state = {
  todo: {
    visible: false,
    title: ""
  }
}

const getters = {
}

const actions = {
}

const mutations = {
  showTodoWriter(state) {
    state.todo.visible = true
  },

  todoChanged(state, text) {
    state.todo.title = text
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }