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
        { 'key': 'authPubDate', 'width': '6' },
        { 'key': 'authPubNum', 'width': '6' },
        { 'key': 'description', 'width': '12', 'hide': true },
      ],
      isExpand: false,
      dict: 'patentInfo',
      cData: patentItemList
    },
    isLoading: isLoading,
    module: '专利信息',
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
