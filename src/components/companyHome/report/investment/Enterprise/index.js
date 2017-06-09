import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function Enterprise({investmentStore}) {
  const evtData = investmentStore.entData;
  const count = evtData.content ? evtData.content.length : 0;
  const isLoading = evtData.content === undefined ? true : false;
  const isError = evtData.error;
  const data = {
    meta: {
      title: {
        main: 'entName',
        sub: ['entStatus', 'entType'],
      },
      body: [
        { 'key': 'name', 'width': '4' },
        { 'key': 'subConam', 'width': '4' },
        { 'key': 'fundedRatio', 'width': '4' },
        { 'key': 'regCap', 'width': '4', 'hide': true },
        { 'key': 'regNo', 'width': '4', 'hide': true },
        { 'key': 'regOrg', 'width': '4', 'hide': true },
        { 'key': 'esDate', 'width': '4', 'hide': true },
      ],
      dict: 'entinvItemLists',
      cData: evtData.content
    },
    isLoading: isLoading,
    module: '企业对外投资',
    error: isError
  };
  return (
    <div>
      <ModuleTitle module="企业对外投资" count={count} />
      <CardTable {...data} />
    </div>
  );
}

Enterprise.propTypes = {
  foo: PropTypes.string,
};
export default observer(Enterprise);
