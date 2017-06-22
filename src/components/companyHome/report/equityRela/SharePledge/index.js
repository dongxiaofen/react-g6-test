import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { CardTable } from 'components/common/report';
// import styles from './index.less';

function SharePledge({MortageStore}) {
  const evtData = MortageStore.sharesImpawnList;
  // const count = evtData.content ? evtData.content.length : 0;
  const isLoading = evtData.content === undefined ? true : false;
  const isError = evtData.error;
  const data = {
    meta: {
      body: [
        { 'key': 'imporg', 'width': '4' },
        { 'key': 'imporgType', 'width': '4' },
        { 'key': 'imporgAmount', 'width': '4' },
        { 'key': 'imporgAthOrg', 'width': '4', 'hide': true },
        { 'key': 'imporgRecordDate', 'width': '4', 'hide': true },
        { 'key': 'imporgTo', 'width': '4', 'hide': true },
        { 'key': 'imporgDate', 'width': '4', 'hide': true },
      ],
      dict: 'sharesImpawnListItemLists',
      cData: evtData.content
    },
    isLoading: isLoading,
    module: '股权质押',
    error: isError
  };
  return (
    <div>
      {/* <ModuleTitle module="股权质押" count={count} /> */}
      <CardTable {...data} />
    </div>
  );
}

SharePledge.propTypes = {
  foo: PropTypes.string,
};
export default observer(SharePledge);
