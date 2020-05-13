import request from '@/utils/request'

export function genSdnum(data) {
  return request({
    url: '/bills/add',
    method: 'post',
    data
  })
}

export function upDateSdnum(data) {
  return request({
    url: '/bills/update',
    method: 'post',
    data
  })
}

export function getTypes(typeName) {
  return request({
    url: '/types/listType',
    method: 'get',
    params: typeName
  })
}
