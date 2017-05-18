import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';
function FiliationList({ filiationList, isLoading, errText }) {
  if (!filiationList) {
    return null;
  }
  const data = {
    meta: {
      body: [
        { 'key': 'brName', 'width': '4' },
        { 'key': 'brRegno', 'width': '2' },
        { 'key': 'belong_org', 'width': '6' },
      ],
      tData: filiationList,
      dict: 'filiationList'
    },
    isLoading: isLoading,
    module: errText ? errText : '分支机构',
    error: errText || filiationList.length === 0 ? {message: errText} : true,
  };
  return (
    <div>
      <ModuleTitle module="分支机构" count={filiationList ? filiationList.length : 0} />
      <CommonTable {...data} />
    </div>
  );
}

FiliationList.propTypes = {
  filiationList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};
export default observer(FiliationList);
