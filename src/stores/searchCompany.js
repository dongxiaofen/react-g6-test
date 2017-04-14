import { observable, action } from 'mobx';
import {searchApi} from 'api';
class SearchCompanyStore {
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
  // 历史记录
  @observable searchHistory = [];
  // 点击搜索后公司名
  @observable searchKey = '';
  // 搜索返回结果
  @observable searchResult = [];
  // 返回结果 searchParameter
  @observable searchParameter = '';
  // 历史记录
  @observable historyResult = [];
  // 数据条数
  @observable totalElements = 0;
  // 分页相关
  @observable pageParams = {
    index: 1,
    size: 10
  };
  // 筛选
  @observable filterSheet = {
    data: {},
    config: {
      industryType: '行业类型',
      scale: '公司规模',
      province: '省份地区',
      companyStatus: '经营状态',
      stockMarket: '上市类型'
    },
    filterStatus: {},
    filterResult: {},
  };
  // loading状态
  @observable loading = false;
  // 获取搜索公司列表
  @action.bound getCompanyList() {
    const params = {
      params: {
        keyWord: this.searchKey,
        type: this.searchType
      },
    };
    searchApi.getCompanyList(params)
      .then(action('searchCompany list', (resp) => {
        console.log(resp, '======searchCompany result');
        this.searchResult = resp.data.data;
        this.searchParameter = resp.data.searchParameter;
      }))
      .catch((err) => {
        console.log(err.response, '=====searchCompany error');
      });
  }
  // 获取历史记录
  @action.bound getHistory() {
    searchApi.getHistory()
      .then(action('searchCompany history', (resp) => {
        console.log(resp, '======searchCompany history');
        this.historyResult = resp.data.content;
      }))
      .catch((err) => {
        console.log(err.response, '=====history error');
      });
  }
  // 切换tab
  @action.bound searchTabClick(key) {
    this.searchType = key;
  }
  // 搜索的searchKey
  @action.bound searchChange(evt) {
    this.searchKey = evt.target.value;
  }
  // 搜索handleEnter
  @action.bound handleEnter(evt) {
    if (evt.keyCode === 13) {
      this.getCompanyList();
    }
  }
}
export default new SearchCompanyStore();
