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
        return err
    })
    // 返回实例
    return instance(config)
}