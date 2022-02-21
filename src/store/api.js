import router from '@/router'
import axios from 'axios'
var api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use((response) => {
    return response;
    }, (error) => {
        if (error.response.status !== 401 && error.response.data.message !== 'missing or malformed jwt') {
            return new Promise((_, reject) => {
                reject(error)
            });
        }
        if (error.config.url == '/auth/refresh' ) {
            return new Promise((_, reject) => {
                reject(error);
                router.push('/logout')
            });
        }
        return new Promise((resolve, reject) => 
            api.get('/auth/refresh')
                .then((response) => {
                    if (response.status === 200) {
                        const config = error.config;
                        axios.request(config).then(response => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error)
                            router.push('/login')
                        })
                    }
                }).catch((error) => {
                    reject(error)
                    router.push('/login')
                })
        )
    })


export default api
