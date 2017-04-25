import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function AlterList({alterList, isLoading}) {
  console.log(alterList, '=====');
  const data = {
    items: alterList,
    isExpand: false,
    dict: 'alterList',
    isLoading: isLoading,
    module: '变更信息',
    error: alterList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="变更信息" />
      <CardTable {...data} />
    </div>
  );
}

AlterList.propTypes = {
  foo: PropTypes.string,
};
export default observer(AlterList);
