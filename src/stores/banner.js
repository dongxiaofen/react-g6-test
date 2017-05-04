import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import {companyHomeApi} from 'api';
import modalStore from './modal';
import messageStore from './message';
import payModalStore from './payModal';
class BannerStore {
  // banner
  @observable monitorId = '';
  @observable reportId = '';
  @observable companyName = '';
  @observable companyType = '';

  @observable hisNameVis = false;
  @observable contactVis = false;
  @observable historyName = [];
  @observable riskInfo = [];
  @observable industryNames = [];
  @observable bannerData = {};
  @observable contactExtended = '';
  @observable monitorStatus = '';
  @observable lastModifiedTs = '获取中...';
  @observable refreshStatus = 'complete';
  @observable searchedCount = '';
  @observable lastModifiedTs = '';

  // 上市代码
  @observable stockCode = '';

  // 升级成高级报告或者深度报告
  @observable updateHighOrDeep = {
    active: 1,
    pointText: '已选择高级查询报告',
    pointTextSub: '（包含快速查询报告数据，另有关联网络、上市、新闻、团队、经营数据）'
  };

  // 下载pdf配置
  @observable pdfDownloadConfig = {
    levelOne: [
      { label: '信息概览', value: 'SUMMARY', checked: false },
      { label: '企业基本信息', value: 'CORP', checked: false },
      { label: '上市披露', value: 'STOCK', checked: false },
      { label: '关联网络', value: 'NETWORK', checked: false },
      { label: '风险信息', value: 'RISK', checked: false },
      { label: '新闻信息', value: 'NEWS', checked: false },
      { label: '经营信息', value: 'OPERATION', checked: false },
      { label: '团队信息', value: 'TEAM', checked: false },
    ],
    levelTwo: {
      'SUMMARY': [],
      'CORP': [
        { label: '工商基本信息', value: 'CORP_BASIC', checked: false },
        { label: '工商变更', value: 'CORP_ALTER', checked: false },
        { label: '对外投资任职', value: 'CORP_INV_POS', checked: false },
        { label: '企业年报', value: 'CORP_YEAR_REPORT', checked: false },
      ],
      'STOCK': [
        { label: '公司概况', value: 'STOCK_INFO', checked: false },
        { label: '公司公告', value: 'STOCK_ANNOUNCEMENT', checked: false },
      ],
      'NETWORK': [
        { label: '关联关系', value: 'NETWORK_RELEVANCE', checked: false },
        { label: '风险关系', value: 'NETWORK_BLACKLIST', checked: false },
      ],
      'RISK': [
        { label: '判决文书', value: 'RISK_JUDGEMENT', checked: false },
        { label: '法院公告', value: 'RISK_ANNOUNCEMENT', checked: false },
        { label: '开庭公告', value: 'RISK_NOTICE', checked: false },
        { label: '被执行人信息', value: 'RISK_EXECUTE', checked: false },
        { label: '失信被执行人', value: 'RISK_DISHONESTY', checked: false },
        { label: '涉诉资产', value: 'RISK_LITIGATION', checked: false },
        { label: '纳税信用', value: 'RISK_TAXATION', checked: false },
        { label: '经营异常', value: 'RISK_ABNORMAL', checked: false },
        { label: '抽查检查', value: 'RISK_CHECK', checked: false },
      ],
      'NEWS': [],
      'OPERATION': [
        { label: '企业综合信息', value: 'OPERATION_TEL', checked: false },
        { label: '招投标', value: 'OPERATION_BIDDING', checked: false },
        { label: '专利', value: 'OPERATION_PATENT', checked: false },
        { label: '商标', value: 'OPERATION_TRADEMARK', checked: false },
      ],
      'TEAM': [
        { label: '招聘/员工背景', value: 'TEAM_RECRUITMENT_RESUME', checked: false },
        { label: '团队监控分析', value: 'TEAM_ANALYSIS', checked: false },
      ]
    },
  };

  @observable isAllChecked = false;


  closeHisNamePopoverAlias = this.closeHisNamePopover;
  openHisNamePopoverAlias = this.openHisNamePopover;
  closeContactPopoverAlias = this.closeContactPopover;
  openContactPopoverAlias = this.openContactPopover;
  extendContactAlias = this.extendContact;

  @action.bound closeHisNamePopover() {
    this.hisNameVis = false;
  }
  @action.bound openHisNamePopover() {
    this.hisNameVis = true;
  }
  @action.bound closeContactPopover() {
    this.contactVis = false;
  }
  @action.bound openContactPopover() {
    this.contactVis = true;
  }
  @action.bound extendContact(key) {
    this.contactExtended = this.contactExtended === key ? '' : key;
  }
  @action.bound getBannerInfo(monitorId, reportId, companyName, companyType) {
    this.monitorId = monitorId;
    this.reportId = reportId;
    this.companyName = companyName;
    this.companyType = companyType;
    companyHomeApi.getBannerInfo(monitorId, reportId, companyName, companyType)
      .then(action('get banner info...', (resp) => {
        console.log('banner结果', resp.data);
        this.companyName = resp.data.name;
        this.historyName = resp.data.bannerInfo.bannerInfo.historyName;
        this.riskInfo = resp.data.bannerInfo.bannerInfo.riskInfo;
        this.industryNames = resp.data.industryNames;
        this.bannerData = resp.data.bannerInfo.bannerInfo;
        this.monitorStatus = resp.data.monitorStatus;
        this.lastModifiedTs = resp.data.lastModifiedTs ? resp.data.lastModifiedTs : '无';
        this.refreshStatus = 'complete';
        this.searchedCount = resp.data.searchedCount;
        this.lastModifiedTs = resp.data.lastModifiedTs;
      }))
      .catch((err) => {
        console.log('banner出错', err);
      });
  }
  @action.bound toggleMonitorStatus(monitorId, status) {
    companyHomeApi.toggleMonitorStatus(monitorId, status)
      .then(action('toggle monitor status', (resp) => {
        this.monitorStatus = resp.data[0].status;
      }))
      .catch((err) => {
        console.log('toggle monitor status 出错', err.response);
      });
  }

  // 获取上市代码
  @action.bound getStockCode({ reportId, monitorId, analysisReportId }) {
    companyHomeApi.getStockCode({ reportId, monitorId, analysisReportId })
      .then(action('get stock code', (resp) => {
        this.stockCode = resp.data;
      }))
      .catch((err) => {
        if (err.response.status !== 404) {
          console.log('获取stockCode出错', err.response);
        }
      });
  }

  // 修改UpdateHighOrDeep
  @action.bound setUpdateHighOrDeep({ active, pointText, pointTextSub }) {
    this.updateHighOrDeep.active = active;
    this.updateHighOrDeep.pointText = pointText;
    this.updateHighOrDeep.pointTextSub = pointTextSub;
  }

  // 创建高级报告或者深度报告
  @action.bound createReport(active, companyName) {
    modalStore.confirmLoading = true;
    companyHomeApi.createReport(active, companyName)
      .then(action('create report', (resp) => {
        console.log(resp.data);
        modalStore.confirmLoading = false;
        modalStore.closeAction();
        if (resp.data.reportId) {
          messageStore.openMessage({ content: '高级查询报告创建成功' });
          browserHistory.push(`/companyHome?reportId=${resp.data.reportId}&companyType=MAIN`);
        }
        if (resp.data.analysisReportId) {
          messageStore.openMessage({ content: '深度分析报告创建成功' });
          browserHistory.push(`/companyHome?analysisReportId=${resp.data.analysisReportId}&companyType=MAIN`);
        }
      }))
      .catch((err) => {
        console.log(err);
        modalStore.confirmLoading = false;
      });
  }

  // 创建监控
  @action.bound createMonitor(obj) {
    companyHomeApi.createMonitor(obj)
      .then(action('create monitor', (resp) => {
        payModalStore.closeAction();
        messageStore.openMessage({ content: '成功创建监控' });
        browserHistory.push(`/companyHome?monitorId=${resp.data.monitorId}&companyType=MAIN`);
      }))
      .catch(action('createMonitor error', (err) => {
        console.log(err.response, '=====createMonitor error');
      }));
  }

  // 设置Pdf弹窗第一层级
  @action.bound setPdfLevelOne(key, value, checked) {
    this.pdfDownloadConfig.levelOne[key].checked = checked;
    this.pdfDownloadConfig.levelTwo[value].map((item) => {
      item.checked = checked;
    });
    if (checked === false) {
      this.isAllChecked = false;
    }
  }

  // 设置pdf弹窗第二层级
  @action.bound setPdfLevelTwo(_levelOne, key, levelOneKey, checked) {
    const levelOne = this.pdfDownloadConfig.levelOne;
    const levelTwo = this.pdfDownloadConfig.levelTwo;
    levelTwo[_levelOne][key].checked = checked;
    const isAllChecked = levelTwo[_levelOne].every((item) => {
      return item.checked === true;
    });
    if (isAllChecked) {
      levelOne[levelOneKey].checked = true;
    } else {
      levelOne[levelOneKey].checked = false;
      this.isAllChecked = false;
    }
  }

  // 设置全部下载按钮
  @action.bound setDownloadAll(checked) {
    this.isAllChecked = checked;
    const levelOne = this.pdfDownloadConfig.levelOne;
    const levelTwo = this.pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    const stockCode = this.stockCode;
    levelOne.map((item) => {
      if (item.value === 'STOCK') {
        if (stockCode) {
          item.checked = checked;
        }
      } else {
        item.checked = checked;
      }
    });
    levelTwoKeys.map((key) => {
      if (key === 'STOCK') {
        if (stockCode) {
          levelTwo[key].map((item) => {
            item.checked = checked;
          });
        }
      } else {
        levelTwo[key].map((item) => {
          item.checked = checked;
        });
      }
    });
  }

  // 重置pdfConfig checked
  @action.bound clearPdfConfigChecked() {
    const pdfDownloadConfig = this.pdfDownloadConfig;
    const levelOne = pdfDownloadConfig.levelOne;
    const levelTwo = pdfDownloadConfig.levelTwo;
    const levelTwoKeys = Object.keys(levelTwo);
    levelOne.map((item) => {
      item.checked = false;
    });
    levelTwoKeys.map((key) => {
      levelTwo[key].map((item) => {
        item.checked = false;
      });
    });
    this.isAllChecked = false;
    modalStore.visible = false;
    modalStore.isCustomize = false;
  }
}
export default new BannerStore();
