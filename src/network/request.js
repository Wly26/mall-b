import axios from "axios"
export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    });
    // 配置请求和响应拦截
    instance.interceptors.request.use(res => {
        return res
    },err => {
        return err
    })
    instance.interceptors.response.use(res => {
        return res
    },err => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break
                case 401:
                    err.message = '未授权的访问'
                    break
            }
        }
        return err
    })
    // 返回实例
    return instance(config)
}