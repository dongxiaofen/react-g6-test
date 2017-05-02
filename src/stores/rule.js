import { observable } from 'mobx';
// import {searchApi} from 'api';
class RuleStore {
  // 列表数据
  @observable ruleList = [];
  // 搜索框
  @observable searchInput = '';
  // 搜索框发送字段
  @observable searchInputSend = '';
  // 搜索预警名返回内容
  @observable searchRuleList = [];
  // 启用／停用状态 规则的id
  @observable ruleStatusId = '';
  // 启用／停用开关后提示框
  @observable switchModal = false;
  // Loading
  @observable loading = false;

  // 行业列表收起与展开
  @observable industryShow = false;
  // 行业集合
  @observable industryList = [];
  @observable industryListOrg = [];
  // 行业选择停留效果
  @observable industryActive = '';

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
  // 事件类型列表
  @observable eventTypeData = [];
  // 二类 列表
  @observable eventTypeTwoList = '';
  // 三类 列表
  @observable eventTypeThreeList = '';
  // 选择事件类型
  @observable eventTypeOne = '';
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

  // 查看预警id
  @observable ruleCheckId = '';
  // 地区
  @observable area = '地区不限';
  // 行业名与ID
  @observable industry = '行业不限';
  @observable industryId = '0';
  // 预警名称
  @observable name = '';
  // 规模
  @observable scale = 'UNLIMITED';
  // submit后提示框
  @observable submitModal = false;
  // 添加预警或修改预警时是否已经submit
  @observable submitType = false;
}
export default new RuleStore();
