import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
// import styles from './index.less';

function AlterList({alterList, isLoading, errText}) {
  const data = {
    meta: {
      body: [
        { 'key': 'altItem', 'width': '6' },
        { 'key': 'altDate', 'width': '6' },
        { 'key': 'altBe', 'width': '6', 'hide': true },
        { 'key': 'altAf', 'width': '6', 'hide': true },
      ],
      isExpand: false,
      dict: 'alterList',
      cData: alterList
    },
    isLoading: isLoading,
    module: errText ? errText : '变更信息',
    error: errText || alterList.length === 0 ? {message: errText} : false,
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
