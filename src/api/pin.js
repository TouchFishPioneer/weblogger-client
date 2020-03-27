import request from '../utils/request'

export function fetchPins (params) {
  return request({
    url: '/pin',
    method: 'get',
    params
  })
}
