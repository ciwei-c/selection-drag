import request from '@/utils/request'

export default {
  getClassifiers(data = {}, options = {}) {
    let { pageNum, pageSize } = data
    delete data.pageNum
    delete data.pageSize
    return request({
      url: `/classifier/page?pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'post',
      data,
      options
    })
  }, 
  getClassifierTemplates(data = {}, options = {}) {
    return request({
      url: `/classifier/templates/${data.classifierId}`,
      method: 'get',
      data,
      options
    })
  },
  addClassifierTemplate(data = {}, options = {}) {
    return request({
      url: `/classifier/template`,
      method: 'POST',
      data,
      options
    })
  },
  getClassifierById(data = {}, options = {}) {
    return request({
      url: `/classifier/${data.classifierId}`,
      method: 'get',
      data,
      options
    })
  },
  addClassifier(data = {}, options = {}) {
    return request({
      url: `/classifier`,
      method: 'post',
      data,
      options
    })
  },
  deleteClassifier(data = {}, options = {}) {
    return request({
      url: '/classifier/' + data.classifierId,
      method: 'delete',
      data: {},
      options
    })
  },
  deleteClassifierTemplate(data = {}, options = {}) {
    return request({
      url: `/classifier/template?classifierId=${data.classifierId}&templateId=${data.templateId}`,
      method: 'delete',
      data: {},
      options
    })
  },
  updateClassifier(data = {}, options = {}) {
    return request({
      url: '/classifier/' + data.classifierId,
      method: 'put',
      data,
      options
    })
  },
}