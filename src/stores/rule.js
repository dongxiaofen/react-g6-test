import { observable, action } from 'mobx';
import {ruleApi} from 'api';
import uiStore from './ui';
import modalStore from './modal';
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
  // 操作单条数据
  @observable itemData = {};
  // switchLoading
  @observable switchLoading = false;

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
  // 获取规则列表
  @action.bound getRuleList() {
    // 打开loading
    this.loading = true;
    ruleApi.getRuleList(uiStore.uiState.ruleListPager)
      .then(action('ruleList list', (resp) => {
        this.ruleList = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.ruleListPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('ruleList error', (err) => {
        // 关闭loading
        this.loading = false;
        console.log(err.response, '=====ruleList error');
      }));
  }
  // 开启关闭规则
  @action.bound changeRuleStatus(data) {
    // 打开弹出按钮loading
    modalStore.confirmLoading = true;
    // 设置switchLoading
    this.switchLoading = true;
    // 存储当前操作的单条数据
    this.itemData = data;
    ruleApi.getRuleStatus(data.rule.id)
      .then(action('ruleStatus', () => {
        // console.log(resp.data, '=====rule');
        // 关闭loading
        this.switchLoading = false;
        // 清空当前操作的单条数据
        this.itemData = {};
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        // 重新获取数据
        this.getRuleList();
      }))
      .catch(action('ruleStatus error', (err) => {
        // 关闭loading
        this.switchLoading = false;
        // 清空当前操作的单条数据
        this.itemData = {};
        // 关闭弹出按钮loading
        modalStore.confirmLoading = false;
        // 关闭model
        modalStore.closeAction();
        console.log(err.response, '=====ruleStatus error');
      }));
  }
  // 存储当前操作的单条数据
  @action.bound setItemData(data) {
    this.itemData = data;
  }
}
export default new RuleStore();
