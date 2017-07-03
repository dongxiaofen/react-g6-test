import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function ShareHolder({ shareHolderList, isLoading, errText }) {
  const handleSubConam = (items) => {
    if (items.subConam) {
      if (items.regCapCur) {
        return Number(items.subConam).toFixed(2) + '万' + '（' + items.regCapCur + '）';
      }
      return Number(items.subConam).toFixed(2) + '万元';
    }
    return '--';
  };
  const handleRelConam = (items) => {
    if (items.relConam) {
      if (items.regCapCur) {
        return Number(items.relConam).toFixed(2) + '万' + '（' + items.regCapCur + '）';
      }
      return Number(items.relConam).toFixed(2) + '万元';
    }
    return '--';
  };
  const data = {
    meta: {
      body: [
        { 'key': 'shareholderName', 'width': '2' },
        // { 'key': 'shareholderType', 'width': '2' },
        { 'key': 'subConam', 'width': '1.6', modifyBlock: handleSubConam },
        { 'key': 'relConam', 'width': '1.6', modifyBlock: handleRelConam },
        { 'key': 'fundedRatio', 'width': '1.4' },
        { 'key': 'conDate', 'width': '1.4' },
      ],
      tData: shareHolderList,
      dict: 'shareholder',
    },
    isLoading: isLoading,
    module: errText ? errText : '股东信息',
    error: errText || shareHolderList.length === 0 ? {message: errText} : false,
  };
  return (
    <div>
      <ModuleTitle module="股东信息" count={shareHolderList.length} />
      <CommonTable {...data} />
    </div>
  );
}

ShareHolder.propTypes = {
  foo: PropTypes.string,
};
export default observer(ShareHolder);
