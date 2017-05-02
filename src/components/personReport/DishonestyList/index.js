import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { ModuleTitle, CommonTable } from 'components/common/report';

function DishonestyList({}) {
  const data = {
    meta: {
      body: [
        { 'key': 'name', 'width': '4' },
        { 'key': 'position', 'width': '6' },
      ],
      tData: personList,
      dict: 'personList',
    },
    isLoading: isLoading,
    module: '主要人员',
    error: personList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="主要人员" count={personList.length} />
      <CommonTable {...data} />
    </div>
  );
}

DishonestyList.propTypes = {
  foo: PropTypes.string,
};
export default observer(DishonestyList);
