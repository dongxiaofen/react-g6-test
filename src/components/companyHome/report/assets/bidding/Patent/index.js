import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report/';

function Patent({patentItemList, isLoading}) {
  const data = {
    meta: {
      title: {
        main: 'title',
        sub: ['title']
      },
      body: [
        { 'key': 'title', 'width': '6' },
        { 'key': 'classificationNumbercname', 'width': '6' },
        // { 'key': 'regNo', 'width': '6' },
        // { 'key': 'authPubDate', 'width': '6' },
        // { 'key': 'authPubNum', 'width': '6' },
        // { 'key': 'classificationNumber', 'width': '6' },
      ],
      isExpand: false,
      dict: 'patentInfo',
      cData: patentItemList
    },
    isLoading: isLoading,
    module: '企业对外投资',
    error: patentItemList.length === 0
  };
  return (
    <div>
      <ModuleTitle module="专利信息" />
      <CardTable {...data} />
    </div>
  );
}

Patent.propTypes = {
  foo: PropTypes.string,
};
export default observer(Patent);
