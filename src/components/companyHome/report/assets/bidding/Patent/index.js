import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { CardTable, ModuleTitle } from 'components/common/report/';

function Patent({patentItemList, isLoading}) {
  const cname = (value) => {
    if (value) {
      return value.classificationNumber.cname.length === 0 ?
        '--' :
        value.classificationNumber.cname;
    }
  };

  const number = (value) => {
    if (value) {
      return value.classificationNumber.number;
    }
  };

  const data = {
    meta: {
      title: {
        main: 'title',
      },
      body: [
        { 'key': 'classificationNumbercname', 'width': '6', 'modifyBlock': cname },
        { 'key': 'authPubDate', 'width': '6' },
        { 'key': 'authPubNum', 'width': '6' },
        { 'key': 'applyDate', 'width': '6' },
        { 'key': 'applyNum', 'width': '6', 'hide': true },
        { 'key': 'classificationNumberNumber', 'width': '6', 'modifyBlock': number, 'hide': true },
        { 'key': 'type', 'width': '6', 'hide': true },
        { 'key': 'inventionPerson', 'width': '6', 'hide': true },
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
