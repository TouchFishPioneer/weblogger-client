import request from '@/utils/requests'

export function fetchPinArray (params) {
  return request({
    url: '/pin',
    method: 'get',
    params
  })
}
