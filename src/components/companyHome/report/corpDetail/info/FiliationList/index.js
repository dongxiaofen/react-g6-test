import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
function FiliationList({filiationList, isLoading}) {
  const data = {
    meta: [
      { 'key': 'brName', 'width': '4' },
      { 'key': 'brRegno', 'width': '2' },
      { 'key': 'belong_org', 'width': '6' },
    ],
    tData: filiationList,
    dict: 'filiationList',
    isLoading: isLoading,
    module: '分支机构',
    error: filiationList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="分支机构" count={filiationList.length} />
      <CommonTable {...data} />
    </div>
  );
}

FiliationList.propTypes = {
  foo: PropTypes.string,
};
export default observer(FiliationList);
