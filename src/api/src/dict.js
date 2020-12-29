import request from '@/utils/request'

export default {
  getDicts(data = {}, options = {}) {
    return request({
      url: '/dict/default-field-list',
      method: 'get',
      data,
      options
    })
  }
}