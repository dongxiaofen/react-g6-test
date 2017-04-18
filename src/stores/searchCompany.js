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
  // 显示到filter的公司名
  @observable searchKeyFilter = '';
  // 是否已搜索
  @observable isShowResult = false;
  // 搜索返回结果
  @observable searchResult = [];
  // 搜索返回结果 searchParameter
  @observable searchParameter = '';
  // 历史记录
  @observable historyResult = [];
  // 数据条数
  @observable page = {};
  // 分页相关
  @observable pageParams = {
    index: 1,
    size: 10
  };
  // 筛选
  @observable filterSheet = {
    // 配置
    config: {
      industryType: '行业类型',
      scale: '公司规模',
      province: '省份地区',
      companyStatus: '经营状态',
      stockMarket: '上市类型'
    },
    // 基础数据
    data: [],
    // 选中结果状态
    filterStatus: {
      industryType: [],
      scale: [],
      province: [],
      companyStatus: [],
      stockMarket: [],
    },
    // 是否全选
    filterStatusAll: {
      industryType: false,
      scale: false,
      province: false,
      companyStatus: false,
      stockMarket: false,
    },
    // 选中结果
    filterResult: {
      industryType: [],
      scale: [],
      province: [],
      companyStatus: [],
      stockMarket: [],
    },
  };
  // 根据筛选模块高度决定是否显示收起展开
  @observable filterArray = {};
  @observable filterArrayStatus = {};
  // 是否收起filter模块
  @observable filterToggle = false;
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
    // 赋值显示到filter的公司名
    this.searchKeyFilter = this.searchKey;
    searchApi.getCompanyList(params)
      .then(action('searchCompany list', (resp) => {
        console.log(resp, '======searchCompany result');
        this.searchResult = resp.data.data;
        // filterSheet相关
        if (resp.data.aggregations) {
          // 放入初始数据
          this.filterSheet.data = resp.data.aggregations;
          resp.data.aggregations.map((obj)=>{
            if (obj.value.length > 0) {
              // 放入初始数据状态
              const statusArray = [];
              obj.value.map(()=> {
                statusArray.push(false);
              });
              this.filterSheet.filterStatus[obj.key] = statusArray;
            }
          });
        }
        this.searchParameter = resp.data.searchParameter;
        this.page = resp.data.page;
        this.isShowResult = true;
      }))
      .catch(action('searchCompany error', (err) => {
        console.log(err.response, '=====searchCompany error');
        this.isShowResult = true;
        // 重置数据
        this.filterSheet.data = [];
        this.filterSheet.filterStatus = {
          industryType: [],
          scale: [],
          province: [],
          companyStatus: [],
          stockMarket: []
        };
      }));
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
  // 点击历史记录
  @action.bound historyClick(obj) {
    this.searchType = obj.type;
    this.searchKey = obj.keyword;
    this.getCompanyList();
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
  // 根据筛选模块高度决定是否显示收起展开
  @action.bound filterSingleShow(type, obj, obj2) {
    if (type === 'value') {
      this.filterArray = obj;
      this.filterArrayStatus = obj2;
    }
    if (type === 'show') {
      this.filterArrayStatus[obj] = !this.filterArrayStatus[obj];
    }
  }
  // 点击filterItem
  @action.bound filterItemClick(key, idx, type) {
    if (type === 'ok') {
      this.filterSheet.data.map((obj)=>{
        if (obj.key === key) {
          if (idx === 'all') {
            this.filterSheet.filterResult[key] = obj.value;
            this.filterSheet.filterStatus[key].map((status)=>{
              status = true;
            })
          } else {
          }
        }
      })
    } else {
    }
    console.log(key, idx);
  }
}
export default new SearchCompanyStore();
