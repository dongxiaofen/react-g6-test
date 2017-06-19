import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
// import styles from './index.less';

function EquityTransfer({MortageStore}) {
  const evtData = MortageStore.sharesTransferList;
  // const count = evtData.content ? evtData.content.length : 0;
  const isLoading = evtData.content === undefined ? true : false;
  const isError = evtData.error;
  const data = {
    meta: {
      body: [
        { 'key': 'assignee', 'width': '4' },
        { 'key': 'transferType', 'width': '4' },
        { 'key': 'pledgeDate', 'width': '4' },
        { 'key': 'pledgedAmount', 'width': '4', 'hide': true },
        { 'key': 'transfersRatio', 'width': '4', 'hide': true},
      ],
      dict: 'sharesTransferListItemLists',
      cData: evtData.content
    },
    isLoading: isLoading,
    module: '股权转让',
    error: isError
  };
  return (
    <div>
      {/* <ModuleTitle module="股权转让" count={count} /> */}
      <CardTable {...data} />
    </div>
  );
}

EquityTransfer.propTypes = {
  foo: PropTypes.string,
};
export default observer(EquityTransfer);
