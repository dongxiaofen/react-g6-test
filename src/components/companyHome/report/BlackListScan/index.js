import React from 'react';
import { inject, observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import BeforeScan from './BeforeScan';
import Scanning from './Scanning';
import AfterScan from './AfterScan';
import ErrorPage from './ErrorPage';

function BlackListScanComp({ blackListScanStore, reportId }) {
  const { status, errorCode } = blackListScanStore.scanStatus;
  const { getStatus, scanMain, scanRelated, scanNetwork } = blackListScanStore;
  const funcObj = {
    getStatus,
    scanMain,
    scanRelated,
    scanNetwork,
  };
  console.log(status, '---status');
  if (errorCode) {
    return <ErrorPage funcObj={funcObj} reportId={reportId} />;
  }
  if (status === undefined) {
    return <AnimateLoading />;
  }
  if (status === 'FIRST_TIME') {
    return <BeforeScan funcObj={funcObj} reportId={reportId} />;
  }
  if (status === 'PROCESSING') {
    return <Scanning blackListScanStore={blackListScanStore} />;
  }
  return <AfterScan />;
}

export default inject('blackListScanStore')(observer(BlackListScanComp));
