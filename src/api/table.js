import request from '@/utils/request'

export function getList(params) {
  return request({
    // url: '/table/list',
    url: '/bills/list',
    method: 'get',
    params: { type: params, year: 2019 }
  })
}
