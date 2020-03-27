import request from '../utils/request'

export function fetchStatus () {
  return request({
    url: '/status',
    method: 'get'
  })
}
