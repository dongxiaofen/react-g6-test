import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function EquityFreeze({MortageStore}) {
  const evtData = MortageStore.sharesFrostList;
  if (evtData.content && evtData.content.length > 0) {
    const content = evtData.content;
    const newContent = [];
    content.forEach((item) => {
      if (item.unfreOrgName === '' &&
          item.unfreOrgName === '' &&
          item.unfreOrgName === '' &&
          item.unfreOrgName === '') {
        const newItem = {};
        newItem.freMoney = item.freMoney;
        newItem.freRatio = item.freRatio;
        newItem.freFromDate = item.freFromDate;
        newItem.freOrgName = item.freOrgName;
        newItem.freDocId = item.freDocId;
        newItem.freToDate = item.freToDate;
        newContent.push(newItem);
      } else {
        newContent.push(item);
      }
    });
    evtData.content = newContent;
  }
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
        { 'key': 'unfreDocId', 'width': '4', 'hide': true },
        { 'key': 'unfreDate', 'width': '4', 'hide': true },
        { 'key': 'unfreInfo', 'width': '4', 'hide': true },
      ],
      dict: 'sharesFrostListItemLists',
      cData: evtData.content
    },
    isLoading: isLoading,
    module: '股权冻结',
    error: isError
  };
  return (
    <div>
      <ModuleTitle module="股权冻结" count={count} />
      <CardTable {...data} />
    </div>
  );
}

EquityFreeze.propTypes = {
  foo: PropTypes.string,
};
export default observer(EquityFreeze);
