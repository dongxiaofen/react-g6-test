import { action } from 'mobx';
import { browserHistory } from 'react-router';
import {linkJumpApi} from 'api';
import searchCompanyStore from './searchCompany';
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
}
export default new LinkJumpStore();
