// import parseTime, formatTime and set to filter
export {
  parseTime,
  formatTime
}
  from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTimestamp(value) {
  if (value == null) {
    return ''
  } else {
    const date = new Date(value)
    const y = date.getFullYear() // 年
    let MM = date.getMonth() + 1 // 月
    MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate() // 日
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours() // 时
    h = h < 10 ? ('0' + h) : h
    let m = date.getMinutes() // 分
    m = m < 10 ? ('0' + m) : m
    let s = date.getSeconds()// 秒
    s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m
  }
}

export function parseFilePath(value) {
  if (value == null) {
    return ''
  } else {
    const pathList = value.split('/')
    return pathList[pathList.length - 1]
  }
}

export function statusFilterName(status) {
  const statusMap = {
    6: '未执行',
    7: '执行中',
    8: '完成',
    9: '作废'
  }
  return statusMap[status]
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [{
    value: 1E18,
    symbol: 'E'
  },
  {
    value: 1E15,
    symbol: 'P'
  },
  {
    value: 1E12,
    symbol: 'T'
  },
  {
    value: 1E9,
    symbol: 'G'
  },
  {
    value: 1E6,
    symbol: 'M'
  },
  {
    value: 1E3,
    symbol: 'k'
  }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function statusFilter(status) {
  const statusMap = {
    6: 'info',
    7: '',
    8: 'success',
    9: 'danger'
  }
  return statusMap[status]
}
