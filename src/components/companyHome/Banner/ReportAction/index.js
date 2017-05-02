import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ReportAction({ bannerStore, modalStore, routing }) {
  const {monitorId, reportId, companyType} = routing.location.query;
  const operatMonitor = () => {
    if (bannerStore.monitorStatus === 'PAUSE' || bannerStore.monitorStatus === 'MONITOR') {
      if (bannerStore.monitorStatus === 'PAUSE') {
        const newStatus = bannerStore.monitorStatus === 'MONITOR' ? 'PAUSE' : 'MONITOR';
        // this.props.commonBoundAC.updateValue(['actionStatus', 'monitorStatus'], true, 'REPORT_UPDATE_VALUE');
        bannerStore.toggleMonitorStatus(monitorId, newStatus);
      } else {
        // this.props.commonBoundAC.updateValue(['changeMonitorStatus', 'visible'], true, 'REPORT_UPDATE_VALUE');
      }
    }
  };
  const openPayModal = () => {
  };
  const openUpdateModal = () => {
    modalStore.openCompModal({
      title: '升级报告',
      width: 420,
      isSingleBtn: true,
      pointText: '升级报告即视为同意',
      pactUrl: 'xxxxxx',
      pactName: '用户服务协议',
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./UpdateHighOrDeep'));
        });
      }
    });
  };
  const bannerActionBtn = () => {
    const outputBtn = [];

    const _companyType = routing.location.query.companyType;
    const _monitorId = routing.location.query.monitorId;
    const _reportId = routing.location.query.reportId;
    const _analysisReportId = routing.location.query.analysisReportId;

    const updateReport = <div className={styles.actionBtn} onClick={openUpdateModal}>升级报告</div>;
    const addMonitor = <div className={styles.actionBtn}>加入监控</div>;
    const updateMonitor = <div className={styles.actionBtn}>升级监控</div>;
    const monitorRenewal = <div className={styles.actionBtn}>监控续期</div>;
    switch (_companyType) {
      case 'FREE':
        outputBtn.push(updateReport);
        outputBtn.push(addMonitor);
        break;
      case 'MAIN':
        if (_reportId) {
          outputBtn.push(updateReport);
          outputBtn.push(addMonitor);
        }
        if (_analysisReportId) {
          outputBtn.push(addMonitor);
        }
        if (_monitorId) {
          outputBtn.push(monitorRenewal);
        }
        break;
      case 'ASSOCIATE':
        outputBtn.push(updateReport);
        outputBtn.push(updateMonitor);
        break;
      default:
        break;
    }
    return (
      <div className="clearfix">
        {outputBtn}
      </div>
    );
  };
  let monitorText = '';
  let monitorCss = styles.bgOrange;
  let refreshCss = styles.enable;
  let refreshText = '刷新报告';
  let leftTypeBtn = '';
  if (bannerStore.monitorStatus === 'MONITOR') {
    monitorText = companyType === 'ASSOCIATE' ? '暂停监控' : '暂停监控';
  } else if (bannerStore.monitorStatus === 'PAUSE') {
    monitorText = '恢复监控';
  } else if (bannerStore.monitorStatus === false) {
    monitorText = '获取中';
    monitorCss = styles.disable;
  } else if (bannerStore.monitorStatus === true) {
    monitorText = '修改中';
    monitorCss = styles.disable;
  }
  if (bannerStore.refreshStatus === 'loading') {
    refreshCss = styles.disable;
    refreshText = '请稍后';
  }

  if (monitorId && companyType === 'MAIN') {
    leftTypeBtn = (
      <div className={styles.bannerAction + ' ' + monitorCss} onClick={operatMonitor}>
        <span>{monitorText}</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE') {
    leftTypeBtn = (
      <div className={styles.bannerAction + ' ' + monitorCss} onClick={operatMonitor}>
        <span>{monitorText}</span>
      </div>
    );
  } else if (reportId) {
    leftTypeBtn = (
      <div className={styles.bannerAction + ' ' + refreshCss} onClick={openPayModal.bind(this, 'refreshReport', 'updateReport', 'reportModalStatus')}>
        <span>{refreshText}</span>
      </div>
    );
  }
  return (
    <div className={`clearfix ${styles.actionBox}`}>
      {bannerActionBtn()}
      {leftTypeBtn}
      {monitorId && companyType === 'MAIN' ? <div className={styles.bannerAction} onClick={openPayModal.bind(this, 'recharge', 'continueMonitor', 'monitorModalStatus')}>续期</div> : ''}
    </div>
  );
}

ReportAction.propTypes = {
  bannerStore: PropTypes.object,
  modalStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('routing', 'modalStore')(observer(ReportAction));
