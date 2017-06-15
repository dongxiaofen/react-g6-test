import { action } from 'mobx';
import { browserHistory } from 'react-router';
import { linkJumpApi } from 'api';
import searchCompanyStore from './searchCompany';
import messageStore from './message';
class LinkJumpStore {
  // 获取报告类型
  @action.bound getNameType(name) {
    const params = {
      companyName: name,
    };
    linkJumpApi.getNameType(params)
      .then(action('link cpmpany', (resp) => {
        // 返回数据
        const data = resp.data;
        // 跳转相关地方
        if (data && data.monitorId > 0) {
          // 跳转监控
          browserHistory.push(`/companyHome?monitorId=${data.monitorId}`);
        } else if (data && data.reportId > 0) {
          // 跳转报告
          browserHistory.push(`/companyHome?reportId=${data.reportId}`);
        } else {
          // 跳转搜索页面进行搜索
          searchCompanyStore.searchTabClick('COMPANY_NAME');
          searchCompanyStore.searchChangeOther(name);
          searchCompanyStore.getCompanyList();
          browserHistory.push(`/searchCompany`);
        }
      }))
      .catch(action('link cpmpany error', (err) => {
        console.log(err.response, '=====link cpmpany error');
        // 跳转搜索页面进行搜索
        searchCompanyStore.searchTabClick('COMPANY_NAME');
        searchCompanyStore.searchChangeOther(name);
        searchCompanyStore.getCompanyList();
        browserHistory.push(`/searchCompany`);
      }));
  }

  @action.bound getCompanyExist(name, referer) {
    const params = {
      companyName: name,
    };
    linkJumpApi.getCompanyExist(params)
      .then(action('link company report', (resp) => {
        if (resp.data) {
          if (referer === 'other') {
            browserHistory.push(`/companyHome?companyName=${name}`);
          } else if (referer === 'self') {
            location.href = `/companyHome?companyName=${name}`;
          }
        } else {
          messageStore.openMessage({
            type: 'error',
            content: '查询数据失败，该企业无工商登记信息',
          });
        }
      }))
      .catch(action('link company report err', (err) => {
        console.log(err.response, '======= link company report err');
        messageStore.openMessage({
          type: 'error',
          content: '没有找到该公司',
        });
      }));
  }
}
export default new LinkJumpStore();
