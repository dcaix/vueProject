import axios from 'axios'

// 设置请求基准路径
// 远程地址
// axios.defaults.baseURL = 'http://47.96.21.88:8888/api/private/v1/'
// 本地请求地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 登录拦截
// 发送请求时拦截器处理token
axios.interceptors.request.use(function (config) {
  // 获取当前是否存在token
  let token = localStorage.getItem('mytoken')
  if (token) {
    // 添加请求头 Authorization 请求头的键是前后台约定
    config.headers['Authorization'] = token
  }
  // 返回修改后的请求头信息
  return config
}, function (error) {
  return Promise.reject(error)
})

// 实现登录功能
export const login = (params) => {
  return axios.post('login', params).then(res => {
    return res.data
  })
}
