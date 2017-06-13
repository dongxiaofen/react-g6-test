import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function EquityTransfer({MortageStore}) {
  const evtData = MortageStore.sharesImpawnList;
  const count = evtData.content ? evtData.content.length : 0;
  const isLoading = evtData.content === undefined ? true : false;
  const isError = evtData.error;
  const data = {
    meta: {
      body: [
        { 'key': 'freMoney', 'width': '4' },
        { 'key': 'freRatio', 'width': '4' },
        { 'key': 'freFromDate', 'width': '4' },
        { 'key': 'freOrgName', 'width': '4', 'hide': true },
        { 'key': 'freDocId', 'width': '4', 'hide': true },
        { 'key': 'freToDate', 'width': '4', 'hide': true },
        { 'key': 'unfreOrgName', 'width': '4', 'hide': true },
      ],
      dict: 'sharesFrostListItemLists',
      cData: evtData.content
    },
    isLoading: isLoading,
    module: '股权转让',
    error: isError
  };
  return (
    <div>
      <ModuleTitle module="股权转让" count={count} />
      <CardTable {...data} />
    </div>
  );
}

EquityTransfer.propTypes = {
  foo: PropTypes.string,
};
export default observer(EquityTransfer);
