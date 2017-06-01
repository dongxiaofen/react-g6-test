import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ReportAction({ bannerStore, modalStore, payModalStore, routing }) {
  const { monitorId, reportId } = routing.location.query;
  const monitorStatus = bannerStore.monitorStatus;
  /* 普通按钮 */
  const addMonitorAction = () => {
    bannerStore.updateToMonitor({
      reportId: reportId,
      time: payModalStore.selectValue
    });
  };

  const openCreateMonitorModal = () => {
    payModalStore.openCompModal({
      'modalType': 'createMonitor',
      'width': '504px',
      'pointText': true,
      'callBack': addMonitorAction
    });
  };

  const renewalConfirm = () => {
    bannerStore.renewalMonitor(monitorId, payModalStore.selectValue);
  };

  const renewalMonitorModal = () => {
    payModalStore.openCompModal({
      'modalType': 'continueMonitor',
      'width': '504px',
      'callBack': renewalConfirm
    });
  };

  const bannerActionBtn = () => {
    const outputBtn = [];
    const addMonitor = <div key="btnAddMonitor" className={styles.actionBtn} onClick={openCreateMonitorModal}>加入监控</div>;
    const monitorRenewal = <div key="btnRenewalMonitor" className={styles.actionBtn} onClick={renewalMonitorModal}>监控续期</div>;
    if (reportId) {
      outputBtn.push(addMonitor);
    }
    if (monitorId) {
      outputBtn.push(monitorRenewal);
    }
    return (
      <div className="clearfix">
        <div className={styles.actionBtnGroup}>
          {outputBtn}
        </div>
      </div>
    );
  };

  /* 文字按钮 */
  const clearPdfConfigChecked = () => {
    bannerStore.clearPdfConfigChecked();
  };

  const openDownLoadPdf = () => {
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

  const addOrCancelCollection = () => {
    const params = { collection: !bannerStore.collection };
    bannerStore.addOrCancelCollection({ reportId, monitorId, params });
  };

  const pauseOrRestoreMonitorConfirm = () => {
    bannerStore.pauseOrRestoreMonitor(monitorId, monitorStatus === 'MONITOR' ? 'PAUSE' : 'MONITOR');
  };

  const pauseOrRestoreMonitorModal = () => {
    modalStore.openCompModal({
      title: '暂停监控',
      width: 440,
      confirmAction: pauseOrRestoreMonitorConfirm,
      cancelAction: modalStore.closeAction,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./PauseOrRestoreMonitor'));
        });
      }
    });
  };

  const refreshHighOrDeepConfirm = () => {
    bannerStore.refreshHighOrDeep(reportId);
  };

  const refreshHighOrDeepModal = () => {
    modalStore.openCompModal({
      title: '刷新报告',
      width: 420,
      isSingleBtn: true,
      confirmAction: refreshHighOrDeepConfirm,
      loader: (cb) => {
        require.ensure([], (require) => {
          cb(require('./RefreshHighOrDeep'));
        });
      }
    });
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

  const pauseOrRestoreMonitorTextAction = () => {
    let output = null;
    // 判断bannerInfo数据是否请求回来了
    if (bannerStore.isLoading) {
      output = (
        <div key="textAction4" className={styles.textAction}>
          加载中...
        </div>
      );
    } else {
      // 当该监控是暂停监控状体时
      if (monitorStatus === 'PAUSE') {
        // 恢复按钮前面转菊花
        if (bannerStore.reStoreLoading) {
          output = (
            <div key="textAction4" className={styles.textAction}>
              <i className="anticon anticon-spin anticon-loading"></i>
              恢复监控
            </div>
          );
        } else {
          // 恢复按钮的点击事件
          output = (
            <div key="textAction4" className={styles.textAction} onClick={pauseOrRestoreMonitorConfirm}>
              <i className="fa fa-eye"></i>
              恢复监控
            </div>
          );
        }
      } else {
        // 暂停监控按钮
        output = (
          <div key="textAction4" className={styles.textAction} onClick={pauseOrRestoreMonitorModal}>
            <i className="fa fa-eye-slash" aria-hidden="true"></i>
            暂停监控
          </div>
        );
      }
    }
    return output;
  };

  const bannerTextAction = () => {
    const output = [];
    const collectionAction = collectionTextAction();
    const refreshReportAction = (
      <div key="textAction2" className={styles.textAction} onClick={refreshHighOrDeepModal}>
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
    const pauseOrRestoreMonitorAction = pauseOrRestoreMonitorTextAction();
    output.push(collectionAction);
    if (monitorId) {
      if (monitorStatus !== 'EXPIRED') {
        output.push(pauseOrRestoreMonitorAction);
      }
    } else {
      output.push(refreshReportAction);
    }
    output.push(downloadPdfAction);
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
