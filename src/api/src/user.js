import request from '@/utils/request';

export default {
  login(data = {}, options = {}) {
    return request({
      url: '/authentication/custom/pwd',
      method: 'post',
      data: Object.assign(data, { clientId: 'boss', clientSecret: 'boss_secret', tenantId: '1', loginTag: 'ep' }),
      options
    });
  }
};
