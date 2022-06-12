import api from '../api/index'

export default {
    install(app) {
        app.provide('api', api)
    }
}
// provide(/* key */ 'message', /* value */ 'hello!')