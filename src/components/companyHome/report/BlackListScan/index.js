import React from 'react';
import mobx from 'mobx';
import { inject, observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import BeforeScan from './BeforeScan';
import Scanning from './Scanning';
import AfterScan from './AfterScan';
import ErrorPage from './ErrorPage';

function BlackListScanComp({ blackListScanStore, reportId }) {
  console.log(mobx.toJS(blackListScanStore), '-----');
  const { status, error } = blackListScanStore.scanStatus;
  const { getStatus, scanMain, scanRelated, scanNetwork, data } = blackListScanStore;
  const notReady = data.ready.some(finish => finish === false);
  const funcObj = {
    getStatus,
    scanMain,
    scanRelated,
    scanNetwork,
  };
  if (error) {
    return <ErrorPage funcObj={funcObj} reportId={reportId} />;
  }
  if (status === undefined) {
    return <AnimateLoading />;
  }
  if (status === 'FIRST_TIME') {
    return <BeforeScan funcObj={funcObj} reportId={reportId} />;
  }
  if (status === 'PROCESSING' || notReady) {
    return <Scanning blackListScanStore={blackListScanStore} />;
  }
  return <AfterScan blackListScanStore={blackListScanStore} reportId={reportId} />;
}

export default inject('blackListScanStore')(observer(BlackListScanComp));
