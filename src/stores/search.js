import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import {searchApi} from 'api';
import searchCompanyStore from './searchCompany';
class SearchStore {
  // 搜索类型
  @observable searchTypeConfig = {
    'COMPANY_NAME': '企业名',
    'CORP_CODE': '组织机构/工商注册/社会信用代码',
    'PERSON': '法人/股东/高管',
    'ALL': '地址/经营范围/产品/商标'
  };
  // placeholder 配置
  @observable plholderConfig = {
    'COMPANY_NAME': '请输入企业名称，如 “小米科技”',
    'CORP_CODE': '请输入组织机构代码',
    'PERSON': '请输入法人名称或股东、高管名称，如 “雷军”',
    'ALL': '可输入地址、经营范围、产品、商标等信息',
  };
  // 搜索类型
  @observable searchType = 'COMPANY_NAME';
  // 点击搜索后公司名
  @observable searchKey = '';
  // tab下拉框是否收起
  @observable searchTabStatus = false;
  // 历史记录
  @observable historyResult = [];
  // 点击搜索按钮获取搜索列表
  @action.bound searchCompanyClick() {
    browserHistory.push('/searchCompany');
    // 重置页数
    searchCompanyStore.pageParams.index = 1;
    // 发送请求
    searchCompanyStore.getCompanyList();
  }
  // 获取历史记录
  @action.bound getHistory() {
    searchApi.getHistory()
      .then(action('searchCompany history', (resp) => {
        this.historyResult = resp.data.content;
      }))
      .catch((err) => {
        console.log(err.response, '=====history error');
      });
  }
  // 点击历史记录
  @action.bound historyClick(obj) {
    browserHistory.push('/searchCompany');
    searchCompanyStore.searchType = obj.type;
    searchCompanyStore.searchKey = obj.keyword;
    searchCompanyStore.getCompanyList();

    this.searchType = obj.type;
    this.searchKey = obj.keyword;
  }
  // 切换tab
  @action.bound searchTabClick(key, type) {
    if (type === 'top') {
      searchCompanyStore.searchTabStatus = key;

      this.searchTabStatus = key;
    } else {
      searchCompanyStore.searchType = key;

      this.searchType = key;
    }
  }
  // 搜索的searchKey
  @action.bound searchChange(evt) {
    searchCompanyStore.searchKey = evt.target.value;

    this.searchKey = evt.target.value;
  }
  // 搜索handleEnter
  @action.bound handleEnter(evt) {
    if (evt.keyCode === 13) {
      browserHistory.push('/searchCompany');
      // 重置页数
      searchCompanyStore.pageParams.index = 1;

      // 发送请求
      searchCompanyStore.getCompanyList();
    }
  }
  // 重置所有数据
  @action.bound resetData() {
    this.searchType = 'COMPANY_NAME';
    this.searchKey = '';
    this.searchTabStatus = false;
    this.historyResult = [];
  }
}
export default new SearchStore();
