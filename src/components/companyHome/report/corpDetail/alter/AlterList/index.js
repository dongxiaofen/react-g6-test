import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function AlterList({alterList, isLoading}) {
  const data = {
    meta: {
      body: [
        { 'key': 'altItem', 'width': '8' },
        { 'key': 'altDate', 'width': '4' },
        { 'key': 'altBe', 'width': '8', 'hide': true },
        { 'key': 'altAf', 'width': '4', 'hide': true },
      ],
      isExpand: false,
      dict: 'alterList',
      cData: alterList
    },
    isLoading: isLoading,
    module: '变更信息',
    error: alterList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="变更信息" count={alterList.length} />
      <CardTable {...data} />
    </div>
  );
}

AlterList.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlterList);
