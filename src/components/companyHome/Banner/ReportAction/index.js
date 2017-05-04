import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ReportAction({ bannerStore, modalStore, payModalStore, routing }) {
  const { monitorId, reportId, analysisReportId, companyType } = routing.location.query;
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

  const choiceOk = () => {
    const companyName = routing.location.query.companyName;
    const obj = { companyName: companyName, time: payModalStore.selectValue };
    bannerStore.createMonitor(obj);
  };

  const openPayModal = () => {
    // payModalStore.openCompModal({
    //   'modalType': 'createMonitor',
    //   'width': '560px',
    //   'pactName': '用户服务协议',
    //   'pactUrl': '/',
    //   'pointText': '创建报告即视为同意',
    //   'callBack': choiceOk
    // });
  };

  const openCreateMonitorModal = () => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '560px',
      'pactName': '用户服务协议',
      'pactUrl': '/',
      'pointText': '创建报告即视为同意',
      'callBack': choiceOk
    });
  };

  const updateHighOrDeepConfirmAction = () => {
    if (reportId) {
      bannerStore.updateToAnalysisReport(reportId);
    } else {
      const companyName = routing.location.query.companyName;
      const updateHighOrDeep = bannerStore.updateHighOrDeep;
      bannerStore.createReport(updateHighOrDeep.active, companyName);
    }
  };
  const openUpdateHighOrDeepModal = () => {
    modalStore.openCompModal({
      title: '升级报告',
      width: 420,
      isSingleBtn: true,
      pointText: '升级报告即视为同意',
      pactUrl: 'xxxxxx',
      pactName: '用户服务协议',
      confirmAction: updateHighOrDeepConfirmAction,
      closeAction: modalStore.closeAction,
      loader: (cb) => {
        if (reportId) {
          require.ensure([], (require) => {
            cb(require('./UpdateDeep'));
          });
        } else {
          require.ensure([], (require) => {
            cb(require('./UpdateHighOrDeep'));
          });
        }
      }
    });
  };
  const bannerActionBtn = () => {
    const outputBtn = [];
    const updateReport = <div key="btnUpdateReprot" className={styles.actionBtn} onClick={openUpdateHighOrDeepModal}>升级报告</div>;
    const addMonitor = <div key="btnAddMonitor" className={styles.actionBtn} onClick={openCreateMonitorModal}>加入监控</div>;
    const updateMonitor = <div key="btnUpdateMonitor" className={styles.actionBtn}>升级监控</div>;
    const monitorRenewal = <div key="btnRenewalMonitor" className={styles.actionBtn}>监控续期</div>;
    switch (companyType) {
      case 'FREE':
        outputBtn.push(updateReport);
        outputBtn.push(addMonitor);
        break;
      case 'MAIN':
        if (reportId) {
          outputBtn.push(updateReport);
          outputBtn.push(addMonitor);
        }
        if (analysisReportId) {
          outputBtn.push(addMonitor);
        }
        if (monitorId) {
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
        <div className={styles.actionBtnGroup}>
          {outputBtn}
        </div>
      </div>
    );
  };

  const openDownLoadPdf = () => {
    const clearPdfConfigChecked = () => {
      bannerStore.clearPdfConfigChecked();
    };
    modalStore.openCompModal({
      width: 750,
      isCustomize: true,
      closeAction: clearPdfConfigChecked,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./DownloadPdf'));
        });
      }
    });
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
  console.log(leftTypeBtn, '-----------------leftTypeBtn');

  const addOrCancelCollection = () => {
    const params = { collection: !bannerStore.collection };
    bannerStore.addOrCancelCollection({ reportId, analysisReportId, monitorId, params });
  };

  const collectionTextAction = () => {
    let output = null;
    const collection = bannerStore.collection;
    const collectionText = collection ? '取消收藏' : '加入收藏';
    if (bannerStore.isLoading) {
      output = (
        <div key="textAction1" className={styles.textAction}>
          加载中...
        </div>
      );
    } else {
      if (bannerStore.collectionLoading) {
        output = (
          <div key="textAction1" className={styles.textAction}>
            <i className="anticon anticon-spin anticon-loading"></i>
            {collectionText}
          </div>
        );
      } else {
        output = (
          <div key="textAction1" className={styles.textAction} onClick={addOrCancelCollection}>
            <i className={collection ? 'fa fa-star' : 'fa fa-star-o'}></i>
            {collectionText}
          </div>
        );
      }
    }
    return output;
  };

  const bannerTextAction = () => {
    const output = [];
    const mainStatus = bannerStore.mainStatus;
    const monitorStatus = bannerStore.monitorStatus;
    const collectionAction = collectionTextAction();
    const refreshReportAction = (
      <div key="textAction2" className={styles.textAction}>
        <i className="fa fa-refresh"></i>
        刷新报告
      </div>
    );
    const downloadPdfAction = (
      <div key="textAction3" className={styles.textAction} onClick={openDownLoadPdf}>
        <i className="fa fa-download"></i>
        下载PDF
      </div>
    );
    const monitorAction = (
      <div key="textAction4" className={styles.textAction}>
        <i className="fa fa-camera-retro" aria-hidden="true"></i>
        {monitorStatus === 'MONITOR' ? '暂停监控' : '恢复监控'}
      </div>
    );
    if (companyType === 'MAIN') {
      output.push(collectionAction);
      if (monitorId) {
        output.push(monitorAction);
      } else {
        output.push(refreshReportAction);
      }
    } else {
      if (mainStatus !== 'PAUSE') {
        output.push(monitorAction);
      }
    }
    if (companyType !== 'FREE') {
      output.push(downloadPdfAction);
    }
    return (
      <div className="clearfix">
        <div className={styles.textActionGroup}>
          {output}
        </div>
      </div>
    );
  };

  return (
    <div className="clearfix">
      {bannerActionBtn()}
      {bannerTextAction()}
    </div>
  );
}

ReportAction.propTypes = {
  bannerStore: PropTypes.object,
  modalStore: PropTypes.object,
  payModalStore: PropTypes.object,
  routing: PropTypes.object,
};
export default inject('routing', 'modalStore', 'payModalStore')(observer(ReportAction));
