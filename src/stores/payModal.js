import { observable } from 'mobx';
class PayModalStore {
  @observable value = {
    // 对应报告的监控id
    monitorId: '',
    // 对应报告的报告id
    reportId: '',
    // 主弹窗相关
    // 报告弹窗是否显示
    reportModalStatus: false,
    // 监控弹窗是否显示
    monitorModalStatus: false,
    monitorListPayModal: false, // 监控列表弹窗控制字段
    // 报告转监控是否显示
    reportToMonitorStatus: false,

    isSuccessful: true,
    // 弹窗类型
    // 生成报告 createReport
    // 刷新报告 updateReport
    // 创建监控 createMonitor
    // 转为监控 turnMonitor
    // 监控续费 continueMonitor
    modalType: '',
    // 弹窗标题
    title1: '创建报告',
    title2: '刷新报告',
    title3: '加入监控',
    title4: '加入监控',
    title5: '监控续期',
    // 弹窗内容１
    message1: 1500,
    // 弹窗内容２
    message2: '',
    // 弹窗内容３
    message3: '持续监控 将使用 150 点',
    // 协议是否勾选
    checkValue: 0,
    // loading
    btnLoading: false,
    // 下拉框值
    selectValue: 'ONE_YEAR',
    // 二次弹框相关
    // 二次弹框是否显示
    secondVisible: false,
    // 需要显示的内容
    secondText: '',
    // 二次弹框标题
    secondTitle: '',
    // 重复创建id
    repeatReportId: '',
    repeatMonitorId: '',
    isRepeat: false,
  };
}
export default new PayModalStore();
