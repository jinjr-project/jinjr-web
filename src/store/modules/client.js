import axios from "axios"
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
export default {
    async loadSprints() {
        return (await axios.get("/sprint")).data
    },

    async loadIssue(id) {
      return (await axios.get(`/issue/${id}`)).data
    },

    async loadIssueStatuses() {
        return (await axios.get("/issue/status")).data
    },

    async createIssueToSprint(sprintId, summary) {
        return (await axios.post("/issue", {sprint_id: sprintId, summary: summary})).data
    },

    async issueSummaryChange(issueId, summary) {
        return (await axios.put(`/issue/${issueId}/summary`, { summary: summary })).data
    },

    async issueStatusChange(issueId, statusId) {
      return (await axios.put(`/issue/${issueId}/status`, `status_id=${statusId}`, config)
        ).data
    },

    async addWorklogToIssue(spent, remaining, started, content, issueId) {
        let worklog = {
            issueId: issueId,
            spent: spent,
            remaining: remaining,
            started: started,
            content: content
        }

        let response = await axios.post(`/issue/${issueId}/worklog`, worklog)

        return response.data
    }
}