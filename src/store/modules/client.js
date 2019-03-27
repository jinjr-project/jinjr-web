import axios from "axios"

export default {
    async loadSprints() {
        return (await axios.get("/sprint")).data
    },

    async createIssueToSprint(sprintId, summary) {
        return (await axios.post("/issue", {sprint_id: sprintId, summary: summary})).data
    },

    async issueSummaryChange(issueId, summary) {
        return (await axios.put(`/issue/${issueId}/summary`, { summary: summary })).data
    },

    async issueStatusChange(issueId, statusId) {

    }
}