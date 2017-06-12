import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CardTable } from 'components/common/report';
function FiliationList({ filiationList, isLoading, errText }) {
  if (!filiationList) {
    return null;
  }
  console.log(errText);
  const data = {
    meta: {
      title: {
        main: 'brName',
        // sub: ['fundedRatio'],
        // handleClick: handleClick
      },
      body: [
        { 'key': 'brPrincipal', 'width': '3' },
        { 'key': 'brRegno', 'width': '3' },
        { 'key': 'brAddr', 'width': '3' },
        { 'key': 'belong_org', 'width': '3' },
        { 'key': 'cbuItem', 'width': '12', 'hide': true },
      ],
      isExpand: false,
      dict: 'filiationList',
      cData: filiationList
    },
    isLoading: isLoading,
    module: '分支机构',
    error: filiationList.length === 0

    // meta: {
    //   body: [
    //     { 'key': 'brName', 'width': '4' },
    //     { 'key': 'brRegno', 'width': '2' },
    //     { 'key': 'belong_org', 'width': '6' },
    //   ],
    //   tData: filiationList,
    //   dict: 'filiationList'
    // },
    // isLoading: isLoading,
    // module: errText ? errText : '分支机构',
    // error: errText || filiationList.length === 0 ? {message: errText} : false,
  };
  return (
    <div>
      <ModuleTitle module="分支机构" count={filiationList ? filiationList.length : 0} />
      <CardTable {...data} />
    </div>
  );
}

FiliationList.propTypes = {
  filiationList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};
export default observer(FiliationList);
