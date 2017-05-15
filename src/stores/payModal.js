import { observable, action } from 'mobx';

class PayModalStore {
    // 对应报告的监控id
    @observable monitorId ='';
    // 对应报告的报告id
    @observable reportId = '';
    // 主弹窗相关
    // 报告弹窗是否显示
    @observable reportModalStatus = false;
    // 监控弹窗是否显示
    @observable monitorModalStatus = false;
    @observable monitorListPayModal = false; // 监控列表弹窗控制字段
    // 报告转监控是否显示
    @observable reportToMonitorStatus = false;
    // 弹窗类型
    // 生成报告 createReport
    // 刷新报告 updateReport
    // 创建监控 createMonitor
    // 转为监控 turnMonitor
    // 监控续费 continueMonitor
    @observable modalType = '';
    // 弹窗标题
    @observable tittle ='';
    // loading
    @observable btnLoading = false;
    // 下拉框值
    @observable selectValue = 'ONE_YEAR';
    // 二次弹框相关
    // 二次弹框是否显示
    @observable secondVisible = false;
    // 需要显示的内容
    @observable secondText = '';
    // 二次弹框标题
    @observable secondTitle = '';
    // 重复创建id
    @observable repeatReportId = '';
    @observable repeatMonitorId = '';
    @observable isRepeat = false;

    @observable visible = false;
    @observable pointText = '';
    @observable pactUrl = '';
    @observable pactName ='';
    @observable width = '560px';

    @observable callBack = null;

    @action.bound closeAction() {
      this.visible = false;
      this.btnLoading = false;
      this.selectValue = 'ONE_YEAR';
    }

    @action.bound openCompModal({ modalType, width, pactName, pactUrl, pointText, callBack }) {
      this.visible = true;
      this.pactName = pactName;
      this.pactUrl = pactUrl;
      this.pointText = pointText;
      this.modalType = modalType;
      this.callBack = callBack;
      switch (modalType) {
        case 'continueMonitor':
          this.tittle = '监控续期';
          break;
        case 'createMonitor':
          this.tittle = '加入监控';
          break;
        case 'turnMonitor':
          this.tittle = '转为监控';
          break;
        default:
          break;
      }
      if (width !== undefined) { this.width = width; }
    }

    @action.bound choiceClick(value) {
      this.selectValue = value;
    }

    @action.bound confirmAction() {
      this.btnLoading = true;
      if (this.callBack) {
        this.callBack.call(this);
      }
    }

}
export default new PayModalStore();
