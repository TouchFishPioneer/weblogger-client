import request from '@/utils/requests'

export function fetchArrays (params) {
  return request({
    url: '/sequence/arrays',
    method: 'get',
    params
  })
}
