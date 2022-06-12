import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_SERVER_NEW + '/api/',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // Referer: process.env.VUE_APP_API_REFERER
    }
})

export default instance
