import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function AlterList({alterList, isLoading}) {
  const data = {
    meta: {
      title: {
        main: 'altItem',
        sub: ['altDate']
      },
      body: [
        // { 'key': 'altItem', 'width': '6' },
        // { 'key': 'altDate', 'width': '6' },
        { 'key': 'altBe', 'width': '6', 'hide': true },
        { 'key': 'altAf', 'width': '6', 'hide': true },
      ],
      isExpand: false,
      dict: 'alterList',
      cData: alterList
    },
    isLoading: isLoading,
    module: '变更信息',
    error: alterList.length === 0
  };
  console.log(data);
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
