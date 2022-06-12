export default function(instance) {
    return {
        getTasksForStudent() {
            return instance.get('kanban/student/tasks')
        },
        getStudentsForProfessor(disciplineId, groupId) {
            return instance.get('kanban/professor/disciplines/' + disciplineId + '/groups/' + groupId)
        },
        getGroupsForProfessor() {
            return instance.get('kanban/professor/groups/disciplines')
        }
    }
}
