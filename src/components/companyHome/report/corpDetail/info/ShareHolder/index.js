import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
// import styles from './index.less';

function ShareHolder({ shareHolderList, isLoading, errText }) {
  const data = {
    meta: {
      body: [
        { 'key': 'shareholderName', 'width': '4' },
        { 'key': 'subConam', 'width': '2' },
        { 'key': 'regCapCur', 'width': '1.2' },
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
