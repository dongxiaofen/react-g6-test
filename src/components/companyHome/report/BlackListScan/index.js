import React from 'react';
import { inject, observer } from 'mobx-react';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import BeforeScan from './BeforeScan';
import Scanning from './Scanning';
import AfterScan from './AfterScan';

function BlackListScanComp({ blackListScanStore }) {
  const status = blackListScanStore.scanStatus.status;
  console.log(status, '---status');
  if (status === undefined) {
    return <AnimateLoading />;
  }
  if (status === 'FIRST_TIME') {
    return <BeforeScan />;
  }
  if (status === 'PROCESSING') {
    return <Scanning />;
  }
  return <AfterScan />;
}

export default inject('blackListScanStore')(observer(BlackListScanComp));
