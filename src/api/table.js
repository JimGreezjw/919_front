import request from '@/utils/request'
import axios from 'axios'
import { baseUrl } from '@/settings'

export function getList(data) {
  return request({
    // url: '/table/list',
    url: '/bills/list',
    method: 'post',
    data
  })
}

export function downLoadFile(fileName) {
  const download_url = baseUrl + '\\download\\'
  return axios({
    method: 'post',
    url: download_url, // 请求地址 /api/download
    params: { file: fileName }, // 参数
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}
