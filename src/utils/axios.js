import axios from 'axios'
import router from '@/router'

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    sessionStorage.getItem('token') ? config.headers.token = sessionStorage.getItem('token') : null
    return config;
});

// 响应拦截器
axios.interceptors.response.use(res => {
    const { data = {}, status } = res
    if (status == 200) {
        if (data.code != 200) {
            if (data.code == 611) {
                router.push('/login')
                return
            }
            return Promise.reject(data)
        }

        return data.data
    } else {
        const { status, statusText } = res
        return Promise.reject(res)

    }

})

export default axios