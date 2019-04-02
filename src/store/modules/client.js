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

    },

    async addWorklogToIssue(original, remaining, started, content, issueId) {
        let worklog = {
            issueId: issueId,
            original: original,
            remaining: remaining,
            started: started,
            content: content
        }

        let response = await axios.post(`/issue/${issueId}/worklog`, worklog)

        return response.data
    }
}