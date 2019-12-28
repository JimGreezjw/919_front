import request from '@/utils/request'

export function genSdnum(data) {
  return request({
    url: '/bills/add',
    method: 'post',
    data
  })
}
