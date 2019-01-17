import axios from 'axios'
import { config } from '../config/config'

// create axios instance
const service = axios.create({
  baseURL: `${config.server.url}:${config.server.port}`,
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
