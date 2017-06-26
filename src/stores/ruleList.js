import { observable, action } from 'mobx';
import {ruleApi} from 'api';
import uiStore from './ui';
import clientStore from './client';
import modalStore from './modal';

class RuleListStore {
  // 列表数据
  @observable ruleList = [];
  // 搜索框
  @observable searchInput = '';
  // 搜索框发送字段
  @observable searchInputSend = '';
  // 搜索规则名返回内容
  @observable searchRuleList = [];
  // 启用／停用状态 规则的id
  @observable ruleStatusId = '';
  // 启用／停用开关后提示框
  @observable switchModal = false;
  // Loading
  @observable loading = false;
  // 操作单条数据
  @observable itemData = {};
  // 需要展开应用企业的列表 存储信息为rule.id
  @observable showCompanyId = [];
  // 需要展开关键词的列表 存储信息为rule.id
  @observable showKeyWordId = [];
  // switchLoading 关闭规则
  @observable switchLoading = false;
  // switchLoading 分享规则
  @observable switchLoading2 = false;
  // 选择的哪中规则类型（我的规则false，上级规则true）
  @observable ruleType = false;
  // 是否只看开启的规则
  @observable ruleOpen = false;
  // 是否主账号(如果主账号则不显示上级规则列表)
  @observable mainUser = true;

  // 搜索输入
  @action.bound setSearchInput(value) {
    this.searchInput = value;
  }
  // 搜索列表
  @action.bound getSearchRuleList(value) {
    this.searchInputSend = value;
    this.getRuleTypeList();
  }

  // 分页时获取哪种数据
  @action.bound getRuleTypeList() {
    if (this.ruleType) {
      // 上级规则
      this.getRuleShareList();
    } else {
      // 我的规则
      this.getRuleList();
    }
  }

  // 获取规则列表
  @action.bound getRuleList() {
    // 是否主账号
    this.mainUser = clientStore.userInfo.root;
    // 打开loading
    this.loading = true;
    // 参数
    const params = {
      index: uiStore.uiState.ruleListPager.index,
      size: uiStore.uiState.ruleListPager.size,
      status: this.ruleOpen ? 'USING' : '',
      ruleName: this.searchInputSend,
    };
    ruleApi.getRuleList(params)
      .then(action('ruleList list', (resp) => {
        this.ruleList = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.ruleListPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('ruleList error', (err) => {
        // 关闭loading
        this.loading = false;
        // 重置数据
        this.ruleList = [];
        console.log(err.response, '=====ruleList error');
      }));
  }
  // 获取上级规则列表
  @action.bound getRuleShareList() {
    // 打开loading
    this.loading = true;
    // 参数
    const params = {
      index: uiStore.uiState.ruleListPager.index,
      size: uiStore.uiState.ruleListPager.size,
      ruleName: this.searchInputSend,
    };
    ruleApi.getRuleShareList(params)
      .then(action('ruleShareList list', (resp) => {
        this.ruleList = resp.data.content;
        // 关闭loading
        this.loading = false;
        uiStore.uiState.ruleListPager.totalElements = resp.data.totalElements;
      }))
      .catch(action('ruleShareList error', (err) => {
        // 关闭loading
        this.loading = false;
        // 重置数据
        this.ruleList = [];
        console.log(err.response, '=====ruleList error');
      }));
  }

  // 需要展开应用企业的列表 存储信息为rule.id
  @action.bound setShowCompanyId(id) {
    const show = this.showCompanyId.indexOf(id) > -1 ? true : false;
    if (show) {
      const idx = this.showCompanyId.indexOf(id);
      this.showCompanyId.splice(idx, 1);
    } else {
      this.showCompanyId.push(id);
    }
  }
  // 需要展开关键词的列表 存储信息为rule.id
  @action.bound setShowKeyWordId(id) {
    console.log('====', id);
    const show = this.showKeyWordId.indexOf(id) > -1 ? true : false;
    if (show) {
      const idx = this.showKeyWordId.indexOf(id);
      this.showKeyWordId.splice(idx, 1);
    } else {
      this.showKeyWordId.push(id);
    }
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
  // 开启关闭分享
  @action.bound changeRuleShare(data) {
    // 打开弹出按钮loading
    modalStore.confirmLoading = true;
    // 设置switchLoading2
    this.switchLoading2 = true;
    // 存储当前操作的单条数据
    this.itemData = data;
    // share参数
    const share = {
      share: !this.itemData.rule.share,
    };
    console.log(this.itemData.rule.share, '====share');
    ruleApi.getRuleShare(data.rule.id, share)
      .then(action('ruleShare', () => {
        // console.log(resp.data, '=====rule');
        // 关闭loading
        this.switchLoading2 = false;
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
        this.switchLoading2 = false;
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

  // 选择规则列表类型tab(我的规则或上级规则)
  @action.bound setRuleType(type) {
    this.ruleType = type;
    // 分页是否大于1
    let pageIndex = true;
    if (uiStore.uiState.ruleListPager.index > 1) {
      pageIndex = false;
    }
    // 重置分页并自动获取列表
    uiStore.uiState.ruleListPager.index = 1;
    uiStore.uiState.ruleListPager.size = 10;
    // 分页大于1时不需要重新获取列表
    if (pageIndex) {
      this.getRuleTypeList();
    }
  }
  // 只看开启的规则
  @action.bound setRuleOpen(evt) {
    this.ruleOpen = evt.target.checked;
    // 重置分页
    uiStore.uiState.ruleListPager.index = 1;
    uiStore.uiState.ruleListPager.size = 10;
    // 请求我的规则列表
    this.getRuleList();
  }
  // 重置列表数据
  @action.bound resetListData() {
    this.ruleList = [];
    // 搜索框
    this.searchInput = '';
    // 搜索框发送字段
    this.searchInputSend = '';
    // 搜索规则名返回内容
    this.searchRuleList = [];
    // 启用／停用状态 规则的id
    this.ruleStatusId = '';
    // 启用／停用开关后提示框
    this.switchModal = false;
    // Loading
    this.loading = false;
    // 操作单条数据
    this.itemData = {};
    // 需要展开应用企业的列表 存储信息为rule.id
    this.showCompanyId = [];
    // switchLoading 关闭规则
    this.switchLoading = false;
    // switchLoading 分享规则
    this.switchLoading2 = false;
    // 选择的哪中规则类型（我的规则false，上级规则true）
    this.ruleType = false;
    // 是否只看开启的规则
    this.ruleOpen = false;
    // 是否主账号(如果主账号则不显示上级规则列表)
    this.mainUser = true;
    uiStore.uiState.ruleListPager.index = 1;
    uiStore.uiState.ruleListPager.size = 10;
  }
}
export default new RuleListStore();
