import request from '@/utils/request'

export default {
  getFields(data = {}, options = {}) {
    let { pageNum, pageSize } = data
    delete data.pageNum
    delete data.pageSize
    return request({
      url: `/field/page?pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'post',
      data,
      options
    })
  },
  addField(data = {}, options = {}) {
    return request({
      url: `/field`,
      method: 'post',
      data,
      options
    })
  },
  updateField(data = {}, options = {}) {
    return request({
      url: `/field/${data.fieldId}`,
      method: 'put',
      data,
      options
    })
  },
  deleteField(data = {}, options = {}) {
    return request({
      url: `/field/${data.fieldId}`,
      method: 'delete',
      data,
      options
    })
  },
}