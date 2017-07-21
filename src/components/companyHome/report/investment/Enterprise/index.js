import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import SimpleTable from 'components/common/report/SimpleTable';
// import styles from './index.less';

function Enterprise({investmentStore}) {
  const evtData = investmentStore.entData;
  const count = evtData.content ? evtData.content.length : 0;
  const isLoading = evtData.content === undefined ? true : false;
  const isError = evtData.error;
  const modifyTextNumber = (value) => {
    if (value) {
      return Number(value).toFixed(2) === '0.00' ? '--' : Number(value).toFixed(2);
    }
    return '--';
  };
  const modifyRato = (value) => {
    return value && value !== '0.00%' ? value : '--';
  };
  const data = {
    meta: {
      body: [
        [{ 'key': 'entName', colSpan: '1' }, { 'key': 'entStatus', colSpan: '1' }],
        [{ 'key': 'subConam', 'width': '4', 'modifyBlock': modifyTextNumber}, { 'key': 'fundedRatio', 'width': '4', modifyBlock: modifyRato}],
        [{ 'key': 'regCap', 'width': '4', 'hide': true, 'modifyBlock': modifyTextNumber}, { 'key': 'esDate', 'width': '4'}]
      ],
      dict: 'entinvItemLists',
      items: evtData.content || [],
      maxCols: 2,
      hasNumber: true,
      isLoading: isLoading,
      module: '企业对外投资',
      error: isError
    },
  };
  return (
    <div>
      <ModuleTitle module="企业投资" count={count} />
      <SimpleTable meta={data.meta} module="enterprise"/>
    </div>
  );
}

Enterprise.propTypes = {
  foo: PropTypes.string,
};
export default observer(Enterprise);
