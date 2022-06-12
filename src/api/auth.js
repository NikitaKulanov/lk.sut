export default function(instance) {
    return {
        login(payload) {
            return instance.post('user/login', payload)
        },
        register(payload) {
            return instance.post('user/register', payload)
        },
        getCSRF() {
            return instance.get(process.env.VUE_APP_API_SERVER_NEW + '/sanctum/csrf-cookie')
        },
        logout() {
            return instance.get('user/logout')
        },
    }
}