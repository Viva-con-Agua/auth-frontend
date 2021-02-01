import axios from 'axios'
var apiSession = axios.create({
    baseURL: 'http://localhost:1323',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiSession
