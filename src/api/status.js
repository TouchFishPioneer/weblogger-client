import request from '@/utils/requests'

export function fetchStatus (params) {
  return request({
    url: '/status',
    method: 'get',
    params
  })
}
