import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function Investment({ frinvList, isLoading }) {
  const data = {
    meta: {
      title: {
        main: 'entName',
        sub: ['entStatus', 'entType']
      },
      body: [
        { 'key': 'esDate', 'width': '4' },
        { 'key': 'fundedRatio', 'width': '4' },
        { 'key': 'subConam', 'width': '4' },
        { 'key': 'regCap', 'width': '4', 'hide': true },
        { 'key': 'frName', 'width': '4', 'hide': true },
        { 'key': 'regNo', 'width': '4', 'hide': true },
        { 'key': 'regOrg', 'width': '4', 'hide': true },
      ],
      isExpand: false,
      dict: 'frinvList',
      cData: frinvList
    },
    isLoading: isLoading,
    module: '法人对外投资',
    error: frinvList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="法人对外投资" count={frinvList.length} />
      <CardTable {...data} />
    </div>
  );
}

Investment.propTypes = {
  foo: PropTypes.string,
};
export default observer(Investment);
