import { observable, action } from 'mobx';
import {ruleApi} from 'api';
import messageStore from './message';
import { browserHistory } from 'react-router';

class RuleAddStore {
  // 行业列表收起与展开
  @observable industryShow = false;
  // 行业集合
  @observable industryList = [];
  @observable industryListOrg = [];
  // 选择的值用作比较
  @observable industryActive = '行业不限';
  // 默认行业名与ID 行业提交值
  @observable industry = '行业不限';
  @observable industryId = '0';

  // 事件类型列表收起与展开
  @observable eventTypeShow = false;
  // 事件类型 工商
  @observable eventTypeDataCORP = [];
  // 事件类型 法务
  @observable eventTypeDataLEGAL = [];
  // 事件类型 新闻
  @observable eventTypeDataNEWS = [];
  // 点击选择哪一种类型 default=CORP
  @observable eventType = 'CORP';
  // 三类 列表
  @observable eventTypeThreeList = [];
  // 是否选择包含关键词
  @observable keyWordStatus = false;
  // 关键词
  @observable keyWordArray = '';
  // 选择事件类型名称 显示到下拉框
  @observable eventTypeOne = '请选择或搜索';
  @observable eventTypeTwo = '';
  @observable eventTypeThree = '';
  @observable eventTypeThreeId = '';
  // 事件搜索
  @observable eventSarch = '';
  // 事件类型搜索列表
  @observable eventSearchList = '';
  // 二级选择停留效果
  @observable eventTypeTwoStyle = '';
  // 三级选择停留效果
  @observable eventTypeThreeStyle = '';
  // 地区
  @observable area = '地区不限';
  // 规则名称
  @observable name = '';
  // 规模
  @observable scale = 'UNLIMITED';
  @observable scaleName = '规模不限';
  // 发生次数大于等于
  @observable alterCount = '';
  // 选择应用范围或应用企业
  @observable selectRange = 'range';

  // 应用企业 公司基础数据
  @observable companyData = [];
  // 选择公司列表
  @observable companySelectData = [];
  // 公司名筛选
  @observable searchCompanyName = '';

  // 是否分享
  @observable ruleShare = true;

  // 添加规则或修改规则时是否已经submit
  @observable submitType = false;
  @observable btnLoading = false;
  @observable btnDisable = false;

  // 获取监控公司列表
  @action.bound getMonitorCompany() {
    const params = {
      companyName: this.searchCompanyName
    };
    ruleApi.getMonitorCompany(params)
      .then(action('monitor list', (resp) => {
        this.companyData = resp.data;
      }))
      .catch(action('monitor error', (err) => {
        console.log(err.response, '=====monitor error');
        this.companyData = [];
      }));
  }
  // 填写搜索
  @action.bound changeCompanyName(evt) {
    this.searchCompanyName = evt.target.value;
    if (evt.target.value.length === 0) {
      // 发送请求
      this.getMonitorCompany();
    }
  }
  // 搜索handleEnter
  @action.bound handleEnter(evt) {
    if (evt.keyCode === 13) {
      this.searchCompanyName = evt.target.value;
      // 发送请求
      this.getMonitorCompany();
    }
  }
  // 选中公司列表数据
  @action.bound onChangeCompany(obj, evt) {
    console.log(evt.target.checked);
    if (evt.target.checked === true) {
      this.companySelectData.push(obj);
    } else {
      this.cancelSelectCompany(obj);
    }
  }
  // 删除选中的公司
  @action.bound cancelSelectCompany(obj) {
    const oldData = this.companySelectData;
    const newData = [];
    if (oldData && oldData.length > 1) {
      oldData.map((data)=>{
        if (data.monitorId !== obj.monitorId) {
          newData.push(data);
        }
      });
      this.companySelectData = newData;
    } else {
      this.companySelectData = [];
    }
  }

  // 获取三种事件类型
  @action.bound getTypeListCORP() {
    ruleApi.getTypeList('CORP')
      .then(action('CORP', (resp) => {
        this.eventTypeDataCORP = resp.data;
      }))
      .catch(action('CORP error', (err) => {
        console.log(err.response, '=====CORP error');
      }));
  }
  @action.bound getTypeListLEGAL() {
    ruleApi.getTypeList('LEGAL')
      .then(action('LEGAL', (resp) => {
        this.eventTypeDataLEGAL = resp.data;
      }))
      .catch(action('LEGAL error', (err) => {
        console.log(err.response, '=====LEGAL error');
      }));
  }
  @action.bound getTypeListNEWS() {
    ruleApi.getTypeList('NEWS')
      .then(action('NEWS', (resp) => {
        this.eventTypeDataNEWS = resp.data;
      }))
      .catch(action('NEWS error', (err) => {
        console.log(err.response, '=====NEWS error');
      }));
  }
  // 选择事件类型搜索筛选结果
  @action.bound selectSearchEvent(obj, evt) {
    // 写入一级类型
    this.eventTypeOne = obj[0];
    // 写入二级类型
    this.eventTypeTwo = obj[1];
    // 写入三级类型和id
    this.eventTypeThree = obj[2].name;
    this.eventTypeThreeId = obj[2].id;
    // 关闭弹窗
    this.eventTypeShow = false;
    evt.stopPropagation();
  }
  // 事件类型搜索
  @action.bound eventSearch(evt) {
    const reg = new RegExp(evt.target.value);
    const filterData = [];
    // 筛选工商
    const corpData = this.eventTypeDataCORP;
    corpData.map((obj)=>{
      obj.value.map((item)=>{
        if (reg.test(item.name)) {
          filterData.push(
            ['工商信息', obj.name, item]
          );
        }
      });
    });
    // 筛选法务
    const legalData = this.eventTypeDataLEGAL;
    legalData.map((obj)=>{
      obj.value.map((item)=>{
        if (reg.test(item.name)) {
          filterData.push(
            ['法务信息', obj.name, item]
          );
        }
      });
    });
    // 筛选新闻
    const newsData = this.eventTypeDataNEWS;
    newsData.map((obj)=>{
      obj.value.map((item)=>{
        if (reg.test(item.name)) {
          filterData.push(
            ['新闻舆情', obj.name, item]
          );
        }
      });
    });
    // 筛选字段
    this.eventSarch = evt.target.value;
    // 筛选结果
    this.eventSearchList = filterData;
    // 没有搜索时清空 否则会把所有内容打印出来
    if (evt.target.value.length < 1) {
      this.eventSearchList = '';
    }
  }
  // 打开关闭事件类型弹窗
  @action.bound eventToggle(type) {
    this.eventTypeShow = type;
  }
  // 选择类型
  @action.bound setEventType(type, typeName) {
    // 写入一级类型
    this.eventType = type;
    // 写入一级类型名称
    this.eventTypeOne = typeName;
    this.eventTypeShow = true;
    // 重置数据
    this.eventTypeTwo = '';
    this.eventTypeThree = '';
    this.eventTypeThreeId = '';
  }
  // 二级类型选择
  @action.bound setEventTypeTwo(value, name, oneType) {
    if (oneType === '请选择或搜索') {
      this.eventTypeOne = '工商信息';
    }
    // 写入三级类型
    this.eventTypeThreeList = value;
    // 写入二级类型名称
    this.eventTypeTwo = name;
    // 重置数据
    this.eventTypeThree = '';
    this.eventTypeThreeId = '';
  }
  // 三级类型选择
  @action.bound setEventTypeThree(value) {
    // 根据筛选的三级类型映射一二级类型
    // 筛选工商
    const corpData = this.eventTypeDataCORP;
    corpData.map((obj)=>{
      obj.value.map((item)=>{
        if (item.name === value.name) {
          this.eventType = 'CORP';
          this.eventTypeOne = '工商信息';
          this.eventTypeTwo = obj.name;
        }
      });
    });
    // 筛选法务
    const legalData = this.eventTypeDataLEGAL;
    legalData.map((obj)=>{
      obj.value.map((item)=>{
        if (item.name === value.name) {
          this.eventType = 'LEGAL';
          this.eventTypeOne = '法务信息';
          this.eventTypeTwo = obj.name;
        }
      });
    });
    // 筛选新闻
    const newsData = this.eventTypeDataNEWS;
    newsData.map((obj)=>{
      obj.value.map((item)=>{
        if (item.name === value.name) {
          this.eventType = 'NEWS';
          this.eventTypeOne = '新闻舆情';
          this.eventTypeTwo = obj.name;
        }
      });
    });
    // 写入三级类型名称
    this.eventTypeThree = value.name;
    // 写入三级类型id
    this.eventTypeThreeId = value.id;
    // 关闭弹窗
    this.eventTypeShow = false;
    // evt.stopPropagation();
    // 如果选择三级事件类型是 新闻舆情 / 新闻 / 包含关键词
    this.keyWordStatus = this.eventTypeThreeId === 879 ? true : false;
  }
  // 事件类型填写关键词
  @action.bound keyWordChange(val) {
    const pattern = new RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\￥)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)(\`)]+/);
    this.keyWordArray = val.target.value.replace(pattern, '');
    // const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\-\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？(\%)(\_)(\+)]");
    this.keyWordArray = val.target.value.replace(pattern, '');
    console.log(this.keyWordArray, '=======', val.target.value);
  }

  // 获取行业列表
  @action.bound getIndustryList() {
    ruleApi.getIndustryList()
      .then(action('industryList', (resp) => {
        const industry = [{'id': 0, 'name': '行业不限', 'analysis': true}];
        const industryAll = industry.concat(resp.data);
        this.industryList = industryAll;
      }))
      .catch(action('industryList error', (err) => {
        console.log(err.response, '=====ruleList error');
      }));
  }

  // 填写规则名称
  @action.bound changeName(evt) {
    this.name = evt.target.value;
  }

  // 选择应用范围或应用企业
  @action.bound setSelectRange(text) {
    this.selectRange = text;
  }

  // 行业列表收起与展开
  @action.bound IndustryShowStatus(bool) {
    this.industryListOrg = [];
    this.industryShow = bool;
  }
  // 选择行业
  @action.bound selectIndustry(value) {
    this.industry = value.name;
    this.industryId = value.id;
    this.industryActive = value.name;
    this.industryShow = false;
    this.industryListOrg = [];
  }
  // 填写行业
  @action.bound changeIndustry(evt) {
    this.industry = evt.target.value;
    const reg = new RegExp(evt.target.value);
    const filterData = [];
    this.industryList.map((item)=>{
      if (reg.test(item.name)) {
        filterData.push(item);
      }
    });
    this.industryListOrg = filterData;
  }

  // 选择地区
  @action.bound selectArea(value) {
    this.area = value;
  }

  // 选择规模
  @action.bound selectScale(value, name) {
    this.scale = value;
    this.scaleName = name;
  }

  // 发生次数
  @action.bound setAlterCount(evt) {
    const text = evt.target.value.replace(/\D/g, '');
    if (text !== '0') {
      this.alterCount = text;
    }
  }

  // 选择分享
  @action.bound setRuleShare(val) {
    this.ruleShare = val;
  }

  // 提交规则
  @action.bound createRule() {
    // 提交记录
    this.submitType = true;
    this.btnLoading = true;
    this.btnDisable = true;
    // 规则名称
    const name = this.name;
    // 行业
    const industry = this.industryId;
    // 地区
    const area = this.area;
    // 企业规模
    const scale = this.scale;
    // 企业
    const monitorIds = [];
    if (this.companySelectData && this.companySelectData.length > 0) {
      this.companySelectData.map((obj)=>{
        monitorIds.push(obj.monitorId);
      });
    }
    // 事件类型
    const eventType = this.eventTypeThreeId;
    // 关键词
    let keywordsArray = [];
    if (this.keyWordArray && this.keyWordArray.length > 0) {
      // 替换多个空格
      let keyWordArrayNew = this.keyWordArray.replace(/[\s ]{2,}/g, ' ');
      // 替换首尾空格
      keyWordArrayNew = keyWordArrayNew.replace(/(^\s*)|(\s*$)/g, '');
      // 判断赋值关键值参数
      if (keyWordArrayNew.indexOf(' ') > -1) {
        keywordsArray = keyWordArrayNew.split(' ');
      } else {
        keywordsArray.push(keyWordArrayNew);
      }
    }
    // 发生次数
    const alterCount = this.alterCount;
    // 是否分享
    const share = this.ruleShare;
    // 提交对象
    let params = {};
    if (this.selectRange === 'range') {
      if (!name && !eventType && !alterCount) {
        this.btnLoading = false;
        this.btnDisable = false;
        const obj = {
          type: 'warning',
          content: '有必填项未填'
        };
        messageStore.openMessage({ ...obj });
        return true;
      }
      params = {
        name: name,
        industry: industry,
        area: area,
        scale: scale,
        eventType: eventType,
        keywords: keywordsArray,
        alterCount: alterCount,
        share: share,
      };
    } else {
      if (!name && monitorIds.length < 1 && !eventType && !alterCount) {
        const obj = {
          type: 'warning',
          content: '有必填项未填'
        };
        messageStore.openMessage({ ...obj });
        return true;
      }
      params = {
        name: name,
        monitorIds: monitorIds,
        eventType: eventType,
        keywords: keywordsArray,
        alterCount: alterCount,
        share: share,
      };
    }
    ruleApi.createRule(params)
      .then(action('createRule', (resp) => {
        console.log(resp);
        const obj = {
          type: 'info',
          content: '规则创建成功'
        };
        messageStore.openMessage({ ...obj });
        this.btnLoading = false;
        this.btnDisable = false;
        // 跳转到列表
        browserHistory.push('/ruleList');
      }))
      .catch(action('createRule error', (err) => {
        this.btnLoading = false;
        this.btnDisable = false;
        const obj = {
          type: 'warning',
          content: err.response.data.message
        };
        messageStore.openMessage({ ...obj });
        console.log(err.response, '=====createRule error');
      }));
  }

  // 创建规则数据重置
  @action.bound resetCreateRuleData() {
    // 行业列表收起与展开
    this.industryShow = false;
    // 行业集合
    this.industryList = [];
    this.industryListOrg = [];
    // 选择的值用作比较
    this.industryActive = '行业不限';
    // 默认行业名与ID 行业提交值
    this.industry = '行业不限';
    this.industryId = '0';

    // 事件类型列表收起与展开
    this.eventTypeShow = false;
    // 事件类型 工商
    this.eventTypeDataCORP = [];
    // 事件类型 法务
    this.eventTypeDataLEGAL = [];
    // 事件类型 新闻
    this.eventTypeDataNEWS = [];
    // 点击选择哪一种类型 default=CORP
    this.eventType = 'CORP';
    // 三类 列表
    this.eventTypeThreeList = [];
    // 选择事件类型名称 显示到下拉框
    this.eventTypeOne = '请选择或搜索';
    this.eventTypeTwo = '';
    this.eventTypeThree = '';
    this.eventTypeThreeId = '';
    // 事件搜索
    this.eventSarch = '';
    // 事件类型搜索列表
    this.eventSearchList = '';
    // 二级选择停留效果
    this.eventTypeTwoStyle = '';
    // 三级选择停留效果
    this.eventTypeThreeStyle = '';
    // 地区
    this.area = '地区不限';
    // 规则名称
    this.name = '';
    // 规模
    this.scale = 'UNLIMITED';
    this.scaleName = '规模不限';
    // 发生次数大于等于
    this.alterCount = '';
    // 选择应用范围或应用企业
    this.selectRange = 'range';

    // 应用企业 公司基础数据
    this.companyData = [];
    // 选择公司列表
    this.companySelectData = [];
    // 公司名筛选
    this.searchCompanyName = '';

    // 是否选择包含关键词
    this.keyWordStatus = false;
    // 关键词
    this.keyWordArray = '';

    // 分享
    this.ruleShare = true;

    // 添加规则或修改规则时是否已经submit
    this.submitType = false;
    this.btnLoading = false;
    this.btnDisable = false;
  }
}
export default new RuleAddStore();
