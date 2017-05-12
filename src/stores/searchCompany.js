import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import {searchApi} from 'api';
import modalStore from './modal';
import payModalStore from './payModal';
import messageStore from './message';
// import routing from '../routes';
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
  // 点击搜索后公司名
  @observable searchKey = '';
  // 显示到filter的公司名
  @observable searchKeyFilter = '';
  // tab下拉框是否收起
  @observable searchTabStatus = false;
  // 是否已搜索
  @observable isShowResult = false;
  // 是否开启loading
  @observable isShowLoading = false;
  // 搜索返回结果
  @observable searchResult = [];
  // 搜索返回结果 searchParameter
  @observable searchParameter = '';
  // 历史记录
  @observable historyResult = [];
  // 返回数据page集合
  @observable page = {};
  // 分页相关
  @observable pageParams = {
    index: 1,
    size: 10
  };
  // 筛选
  @observable filterSheet = {
    // filterSheet status
    filterSheetStatus: false,
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
  // 点击某条数据相关信息
  @observable singleItemData = {};
  // 选择那种报告 'analysis'深度 'report'高级 'free'快速
  @observable reportType = 'analysis';
  // 获取搜索公司列表
  @action.bound getCompanyList() {
    // 是否已搜索
    this.isShowResult = true;
    // filter公司名赋值
    this.searchKeyFilter = this.searchKey;
    // 打开loading
    this.isShowLoading = true;
    const params = {
      params: {
        keyWord: this.searchKey,
        type: this.searchType,
        index: this.pageParams.index,
        size: this.pageParams.size,
      },
    };
    searchApi.getCompanyList(params)
      .then(action('searchCompany list', (resp) => {
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
        // 关闭loading
        this.isShowLoading = false;
      }))
      .catch(action('searchCompany error', (err) => {
        console.log(err.response, '=====searchCompany error');
        this.searchResult = [];
        this.searchParameter = '';
        this.page = {};
        // 关闭loading
        this.isShowLoading = false;
        // 重置filter
        this.filterSheet = {
          // filterSheet status
          filterSheetStatus: false,
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
      }));
  }
  // 点击搜索按钮获取搜索列表
  @action.bound searchCompanyClick() {
    // 重置页数
    this.pageParams.index = 1;
    // 发送请求
    this.getCompanyList();
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
    this.searchType = obj.type;
    this.searchKey = obj.keyword;
    this.getCompanyList();
  }
  // 切换tab
  @action.bound searchTabClick(key, type) {
    if (type === 'top') {
      this.searchTabStatus = key;
    } else {
      this.searchType = key;
    }
  }
  // 切换tab
  @action.bound searchTabMouseDown(key) {
    this.searchType = key;
    this.searchTabStatus = false;
  }
  // 搜索的searchKey
  @action.bound searchChange(evt) {
    this.searchKey = evt.target.value;
  }
  // 搜索handleEnter
  @action.bound handleEnter(evt) {
    if (evt.keyCode === 13) {
      // 重置页数
      this.pageParams.index = 1;
      // 发送请求
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
  // filter发送请求
  @action.bound filterSearchCompany() {
    // 打开loading
    this.isShowLoading = true;
    const params = {
      // scrollId: searchCompanyState.getIn(['searchResult', 'scrollId']),
      index: this.pageParams.index,
      size: this.pageParams.size,
      filters: this.filterSheet.filterResult,
      params: this.searchParameter,
    };
    // 赋值显示到filter的公司名
    this.searchKeyFilter = this.searchKey;
    searchApi.getFilterSearch(params)
      .then(action('filterSearchCompany list', (resp) => {
        this.searchResult = resp.data.data;
        this.page = resp.data.page;
        // 关闭loading
        this.isShowLoading = false;
      }))
      .catch(action('filterSearchCompany error', (err) => {
        console.log(err.response, '=====filterSearchCompany error');
        this.searchResult = [];
        this.page = {};
        // 关闭loading
        this.isShowLoading = false;
      }));
  }
  // 点击filterItem  key:类型 idx:序号 type:选择或取消
  @action.bound filterItemClick(key, idx, type) {
    this.filterSheet.data.map((obj)=>{
      // 匹配类型
      if (obj.key === key) {
        // 选择和取消
        if (type === 'ok') {
          // 全选和单选
          if (idx === 'all') {
            this.filterSheet.filterResult[key] = obj.value;
            const status = [];
            this.filterSheet.filterStatus[key].map(()=>{
              status.push(true);
            });
            this.filterSheet.filterStatus[key] = status;
            this.filterSheet.filterStatusAll[key] = true;
          } else {
            // 公司规模只能单选和全选 所以特殊处理
            if (key === 'scale') {
              const value = obj.value[idx];
              this.filterSheet.filterResult[key] = [];
              this.filterSheet.filterResult[key].push(value);
              const status = [];
              this.filterSheet.filterStatus[key].map((val, num)=>{
                if (num === idx) {
                  status.push(!val);
                } else {
                  status.push(false);
                }
              });
              this.filterSheet.filterStatus[key] = status;
            } else {
              const value = obj.value[idx];
              this.filterSheet.filterResult[key].push(value);
              this.filterSheet.filterStatus[key][idx] = true;
            }
          }
        } else {
          if (idx === 'all') {
            this.filterSheet.filterResult[key] = [];
            const status = [];
            this.filterSheet.filterStatus[key].map(()=>{
              status.push(false);
            });
            this.filterSheet.filterStatus[key] = status;
            this.filterSheet.filterStatusAll[key] = false;
          } else {
            // 公司规模全选后单选取消的那一项为选择的那一项 这块逻辑待确定
            if (key === 'scale') {
              // const value = obj.value[idx];
              this.filterSheet.filterResult[key] = [];
              // this.filterSheet.filterResult[key].push(value);
              const status = [];
              this.filterSheet.filterStatus[key].map(()=>{
                status.push(false);
                // if (num === idx) {
                //   status.push(val);
                // } else {
                //   status.push(false);
                // }
              });
              this.filterSheet.filterStatus[key] = status;
            } else {
              const value = obj.value[idx];
              const valIdx = this.filterSheet.filterResult[key].indexOf(value);
              this.filterSheet.filterResult[key].splice(valIdx, 1);
              this.filterSheet.filterStatus[key][idx] = false;
            }
          }
        }
      }
    });
    // 重置页数
    this.pageParams.index = 1;
    // 发送请求
    this.filterSearchCompany();
  }
  // 收起打开筛选
  @action.bound updateValue(oldValue, newValue) {
    this.filterSheet[oldValue] = newValue;
  }
  // 选择的单条数据
  @action.bound singleData(data) {
    this.singleItemData = data;
  }
  // 创建免费报告
  @action.bound createFreeReport() {
    modalStore.closeAction();
    const obj = {
      content: '快速查询报告创建成功'
    };
    messageStore.openMessage({ ...obj });
    const companyName = this.singleItemData.company;
    browserHistory.push('/companyHome?companyName=' + companyName + '&companyType=FREE');
  }
  // 创建高级报告
  @action.bound createReport() {
    // 打开弹出按钮loading
    modalStore.confirmLoading = true;
    const companyName = this.singleItemData.company;
    searchApi.createReport(companyName)
      .then(action('createReport', (resp) => {
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        // 弹出成功提示
        const obj = {
          content: '高级查询报告创建成功'
        };
        messageStore.openMessage({ ...obj });
        // 跳转
        browserHistory.push(`/companyHome?reportId=${resp.data.reportId}&companyType=MAIN`);
      }))
      .catch(action('createReport error', (err) => {
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        if (err.response && err.response.data && err.response.data.message) {
          // 重复创建时
          if (err.response.data.errorCode === 409201) {
            // 弹出成功提示
            const obj = {
              content: '高级查询报告创建成功'
            };
            messageStore.openMessage({ ...obj });
            // 跳转
            browserHistory.push(`/companyHome?reportId=${err.response.data.data.reportId}&companyType=MAIN`);
          } else {
            // 弹出失败提示
            const obj = {
              content: err.response.data.message
            };
            messageStore.openMessage({ ...obj });
          }
        }
        console.log(err.response, '=====createReport error');
      }));
  }
  // 创建深度报告
  @action.bound createAnalysisReport() {
    // 打开弹出按钮loading
    modalStore.confirmLoading = true;
    const companyName = this.singleItemData.company;
    searchApi.createAnalysisReport(companyName)
      .then(action('createAnalysisReport', (resp) => {
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        // 弹出成功提示
        const obj = {
          content: '深度分析报告创建成功'
        };
        messageStore.openMessage({ ...obj });
        // 跳转
        browserHistory.push(`/companyHome?analysisReportId=${resp.data.analysisReportId}&companyType=MAIN`);
      }))
      .catch(action('createAnalysisReport error', (err) => {
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        if (err.response && err.response.data && err.response.data.message) {
          // 重复创建时
          if (err.response.data.errorCode === 409201) {
            // 弹出成功提示
            const obj = {
              content: '深度分析报告创建成功'
            };
            messageStore.openMessage({ ...obj });
            // 跳转
            browserHistory.push(`/companyHome?analysisReportId=${err.response.data.data.analysisReportId}&companyType=MAIN`);
          } else {
            // 弹出失败提示
            const obj = {
              content: err.response.data.message
            };
            messageStore.openMessage({ ...obj });
          }
        }
        console.log(err.response, '=====createAnalysisReport error');
      }));
  }
  // 选择哪种报告
  @action.bound selectReportType(obj) {
    this.reportType = obj;
  }
  // 根据选择的报告类型创建报告
  @action.bound createReportType() {
    if (this.reportType === 'free') {
      this.createFreeReport();
    }
    if (this.reportType === 'report') {
      this.createReport();
    }
    if (this.reportType === 'analysis') {
      this.createAnalysisReport();
    }
  }
  // 创建监控
  @action.bound createMonitor(obj) {
    searchApi.createMonitor(obj)
      .then(action('createMonitor', (resp) => {
        payModalStore.closeAction();
        const text = {
          content: '已创建监控'
        };
        messageStore.openMessage({ ...text });
        // /companyHome?monitorId=184832&companyType=MAIN
        browserHistory.push(`/companyHome?monitorId=${resp.data.monitorId}&companyType=MAIN`);
      }))
      .catch(action('createMonitor error', (err) => {
        console.log(err.response, '=====createMonitor error');
        payModalStore.closeAction();
        const text = {
          type: 'warning',
          content: err.response.data.message
        };
        messageStore.openMessage({ ...text });
      }));
  }
  // 分页
  @action.bound getPageList(newPage) {
    this.pageParams.index = newPage;
    let type = '';
    Object.keys(this.filterSheet.filterResult).map((key)=>{
      if (this.filterSheet.filterResult && this.filterSheet.filterResult[key] && this.filterSheet.filterResult[key].length > 0) {
        type = 'filter';
      }
    });
    if (type === 'filter') {
      this.filterSearchCompany();
    } else {
      this.getCompanyList();
    }
  }
  // 提交关键词
  @action.bound getFeedBack() {
    const params = {
      name: this.searchKeyFilter,
    };
    searchApi.getFeedBack(params)
      .then(action('getFeedBack list', (resp) => {
        console.log(resp, '======getFeedBack result');
      }))
      .catch(action('getFeedBack error', (err) => {
        console.log(err.response, '=====getFeedBack error');
      }));
  }
  // 重置所有数据
  @action.bound resetData() {
    this.searchType = 'COMPANY_NAME';
    this.searchKey = '';
    this.searchKeyFilter = '';
    this.searchTabStatus = false;
    this.isShowResult = false;
    this.searchResult = [];
    this.searchParameter = '';
    this.page = {};
    this.pageParams = {
      index: 1,
      size: 10
    };
    this.filterSheet = {
      // filterSheet status
      filterSheetStatus: false,
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
    this.filterArray = {};
    this.filterArrayStatus = {};
    this.filterToggle = false;
    this.loading = false;
    this.singleItemData = {};
    this.reportType = 'analysis';
  }
}
export default new SearchCompanyStore();
