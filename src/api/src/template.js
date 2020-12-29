import request from '@/utils/request'

export default {
  getAllTemplates(data = {}, options = {}) {
    return request({
      url: '/template/list',
      method: 'post',
      data,
      options
    })
  },
  addTemplate(data = {}, options = {}) {
    return request({
      url: '/template',
      method: 'post',
      data,
      options
    })
  },
  deleteTemplate(data = {}, options = {}) {
    return request({
      url: '/template/' + data.templateId,
      method: 'delete',
      data: {},
      options
    })
  },
  templateIdentify(data = {}, options = {}) {
    return request({
      url: '/template/template-identify/' + data.templateId,
      method: 'post',
      data: {},
      options
    })
  },
  getTemplateById(data = {}, options = {}) {
    return request({
      url: '/template/definition/' + data.templateId,
      method: 'get',
      data: {},
      options
    })
  },
  getTemplates(data = {}, options = {}) {
    let { pageNum, pageSize } = data
    delete data.pageNum
    delete data.pageSize
    return request({
      url: `/template/page?pageNum=${pageNum}&pageSize=${pageSize}`,
      method: 'post',
      data,
      options
    })
  },
  areaIdentify(data = {}, options = {}) {
    return request({
      url: `/template/area-identify`,
      method: 'post',
      data,
      options
    })
  },
  updateTemplate(data = {}, options = {}) {
    return request({
      url: `/template/definition/${data.templateId}`,
      method: 'put',
      data,
      options
    })
  },
  publishTemplate(data = {}, options = {}) {
    return request({
      url: `/template/release/${data.templateId}`,
      method: 'post',
      data,
      options
    })
  },
}