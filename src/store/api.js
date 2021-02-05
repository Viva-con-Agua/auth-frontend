import axios from 'axios'
var apiSession = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiSession
