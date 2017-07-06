import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function CourtAnnouncement({courtAnnouncement, regTime, loading}) {
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
  const modifyTypeName = (data) => {
    return data.docType || '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'docType', 'width': '6', modifyBlock: modifyTypeName},
        {'key': 'publishTime', 'width': '6', modifyText: regTime},
        {'key': 'identity', 'width': '6'},
        {'key': 'caseReason', 'width': '6'},
        {'key': 'court', 'width': '6', hide: true},
        {'key': 'litigant', 'width': '6', hide: true, modifyText: listMapToStr},
        {'key': 'content', 'width': '12', hide: true}
      ],
      isExpand: false,
      dict: 'courtAnnouncement',
      cData: courtAnnouncement.content
    },
    isLoading: loading,
    module: '法院公告',
    error: !courtAnnouncement.content || courtAnnouncement.content.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

CourtAnnouncement.propTypes = {
  loading: PropTypes.bool,
  regTime: PropTypes.func,
  courtAnnouncement: PropTypes.object,
};
export default observer(CourtAnnouncement);
