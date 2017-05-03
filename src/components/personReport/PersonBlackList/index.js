import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle, CommonTable } from 'components/common/report';

function PersonBlackList({personBlacklist, isLoading}) {
  const data = {
    meta: {
      body: [
        { 'key': 'publishSource', 'width': '1' },
        { 'key': 'loanAmount', 'width': '2' },
        { 'key': 'overAmount', 'width': '2' },
        { 'key': 'state', 'width': '1' },
        { 'key': 'loanDate', 'width': '1' },
        { 'key': 'loanTerm', 'width': '2' },
        { 'key': 'overDate', 'width': '2' },
      ],
      tData: personBlacklist,
      dict: 'personBlacklist',
    },
    isLoading: isLoading,
    module: '老赖记录',
    error: personBlacklist === undefined
  };
  return (
    <div>
      <ModuleTitle module={`老赖记录（${personBlacklist ? personBlacklist.length : 0}）`} />
      <CommonTable {...data} />
    </div>
  );
}

PersonBlackList.propTypes = {
  foo: PropTypes.string,
};
export default observer(PersonBlackList);
