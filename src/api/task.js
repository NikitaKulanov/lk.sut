export default function(instance) {
    return {
        getTask(taskId) {
            return instance.get('tasks/' + taskId)
        },
        postBindTaskAndMessage(taskId, payload) {
            return instance.post('tasks/' + taskId + '/messages', payload, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        },
        postBindTaskAndLink(taskId, payload) {
            return instance.post('tasks/' + taskId + '/links', payload, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        },
        postBindTaskAndFile(taskId, payload) {
            return instance.post('tasks/' + taskId + '/files', payload, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
        },
        pathTask(taskId, payload) {
            return instance.patch('tasks/' + taskId, payload, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        },
        createTask(payload) {
            return instance.post('tasks', payload, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        },
    }
}