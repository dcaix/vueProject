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
// 用户列表数据获取
export const getUsersData = (params) => {
  return axios.get('users', {params: params}).then((res) => {
    return res.data
  })
}
// 用户状态修改
export const toggleUserState = (params) => {
// restful  /users/512/state/true
  return axios.put('users/' + params.uId + '/state/' + params.state).then(res => {
    return res.data
  })
}

// 添加用户
export const addUser = (params) => {
  return axios.post('users', params).then((res) => {
    return res.data
  })
}

// 删除用户 deleUser
export const deleUser = (id) => {
  return axios.delete('users/' + id).then((res) => {
    return res.data
  })
}

// 根据id获取用户信息
export const getUser4id = (id) => {
  return axios.get('users/' + id).then((res) => {
    return res.data
  })
}

// 编辑用户提交 confirmEdit
export const confirmEdit = (params) => {
  return axios.put('users/' + params.id, params).then((res) => {
    return res.data
  })
}

// 权限管理-角色列表
export const roleList = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}

// 权限管理-添加角色
export const addRole = (params) => {
  return axios.post('roles', params).then(res => {
    return res.data
  })
}

// 用户管理-分配角色
export const giveRole = (params) => {
  return axios.put('users/' + params.id + '/role', params).then(res => {
    return res.data
  })
}

// 权限管理-根据id查询角色信息
export const getRoleById = (params) => {
  return axios.get('roles/' + params.id).then(res => {
    return res.data
  })
}

// 权限管理-编辑角色
export const editRole = (params) => {
  return axios.put('roles/' + params.id, params).then(res => {
    return res.data
  })
}

// 权限管理-删除角色
export const deleteRole = (params) => {
  return axios.delete('roles/' + params.id).then(res => {
    return res.data
  })
}

// 权限管理-删除指定角色的权限
export const deleteRoleRight = (params) => {
  return axios.delete('roles/' + params.roleId + '/rights/' + params.rightId).then(res => {
    return res.data
  })
}

// 权限管理-提交角色授权
export const submitGrant = (params) => {
  return axios.post('roles/' + params.roleId + '/rights', params).then(res => {
    return res.data
  })
}

// 权限管理-权限列表
export const rightList = (params) => {
  return axios.get('rights/' + params.type).then(res => {
    return res.data
  })
}
