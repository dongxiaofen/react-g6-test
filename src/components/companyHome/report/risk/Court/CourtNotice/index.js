import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';
function CourtNotice({courtNotice, regTime}) {
  const listMapToStr = (value)=>{
    let newValue = value;
    if (typeof value === 'object') {
      newValue = value.join('；');
    }
    return newValue || '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'identity', 'width': '6'},
        {'key': 'caseReason', 'width': '6'},
        {'key': 'judgeTime', 'width': '6', modifyText: regTime},
        {'key': 'court', 'width': '6'},
        {'key': 'relevantDepartments', 'width': '12', hide: true, modifyText: listMapToStr},
        {'key': 'content', 'width': '12', hide: true}
      ],
      isExpand: false,
      dict: 'courtNotice',
      cData: courtNotice.data
    },
    module: '法院公告',
    error: courtNotice.data.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

CourtNotice.propTypes = {
  foo: PropTypes.string,
};
export default observer(CourtNotice);
