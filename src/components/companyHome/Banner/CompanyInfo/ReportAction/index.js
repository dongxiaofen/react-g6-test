import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ReportAction({ bannerStore, routing }) {
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
    // this.props.commonBoundAC.updateValue(['operation'], operation, 'REPORT_UPDATE_VALUE');
    // this.props.commonBoundAC.updateValue([statusType], true, 'PAY_MODAL_UPDATE_VALUE');
    // this.props.commonBoundAC.updateValue(['modalType'], modalType, 'PAY_MODAL_UPDATE_VALUE');
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
      <div className={styles.bannerBtnLeft + ' ' + monitorCss} onClick={operatMonitor}>
        <span>{monitorText}</span>
      </div>
    );
  } else if (monitorId && companyType === 'ASSOCIATE') {
    leftTypeBtn = (
      <div className={styles.bannerBtnLeft + ' ' + monitorCss} onClick={operatMonitor}>
        <span>{monitorText}</span>
      </div>
    );
  } else if (reportId) {
    leftTypeBtn = (
      <div className={styles.bannerBtnLeft + ' ' + refreshCss} onClick={openPayModal.bind(this, 'refreshReport', 'updateReport', 'reportModalStatus')}>
        <span>{refreshText}</span>
      </div>
    );
  }
  return (
    <div>
      {leftTypeBtn}
      {monitorId && companyType === 'MAIN' && bannerStore.monitorStatus !== 'EXPIRED' ? <div className={styles.bannerLines}></div> : ''}
      {monitorId && companyType === 'MAIN' ? <div className={styles.bannerBtnLeft} onClick={openPayModal.bind(this, 'recharge', 'continueMonitor', 'monitorModalStatus')}>续期</div> : ''}
    </div>
  );
}

ReportAction.propTypes = {
  foo: PropTypes.string,
};
export default inject('routing')(observer(ReportAction));
