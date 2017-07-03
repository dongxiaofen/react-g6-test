import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';
function CourtNotice({courtNotice, regTime, loading}) {
  const listMapToStr = (value) => {
    if (value && value.length) {
      const output = [];
      value.forEach((item) => {
        output.push(item.litigantName);
      });
      return output.length ? output.join('；') : '--';
    }
    return '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'identity', 'width': '6'},
        {'key': 'caseReason', 'width': '6'},
        {'key': 'judgeTime', 'width': '6', modifyText: regTime},
        {'key': 'court', 'width': '6'},
        {'key': 'litigant', 'width': '12', hide: true, modifyText: listMapToStr},
        {'key': 'detail', 'width': '12', hide: true}
      ],
      isExpand: false,
      dict: 'courtNotice',
      cData: courtNotice.content
    },
    isLoading: loading,
    module: '开庭公告',
    error: !courtNotice.content || courtNotice.content.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

CourtNotice.propTypes = {
  loading: PropTypes.bool,
  regTime: PropTypes.func,
  courtNotice: PropTypes.object,
};
export default observer(CourtNotice);
