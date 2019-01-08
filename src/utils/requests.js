import axios from 'axios'

// create axios instance
const service = axios.create({
  baseURL: '127.0.0.1',
  timeout: 15000
})

// response interceptor
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    return Promise.reject(new Error('error'))
  } else {
    return response.data
  }
}, error => {
  console.log('err' + error)
  return Promise.reject(error)
})

export default service
