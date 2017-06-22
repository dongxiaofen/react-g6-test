import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function CourtAnnouncement({courtAnnouncement, regTime, loading}) {
  const listMapToStr = (value)=>{
    if (typeof value === 'object') {
      return value.join('； ') || '--';
    }
    return value || '--';
  };
  const modifyTypeName = (data) => {
    return data.typeName || data.type || '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'typeName', 'width': '6', modifyBlock: modifyTypeName},
        {'key': 'publishTime', 'width': '6', modifyText: regTime},
        {'key': 'identity', 'width': '6'},
        {'key': 'caseReason', 'width': '6'},
        {'key': 'court', 'width': '6', hide: true},
        {'key': 'relevantDepartments', 'width': '6', hide: true, modifyText: listMapToStr},
        {'key': 'content', 'width': '12', hide: true}
      ],
      isExpand: false,
      dict: 'courtAnnouncement',
      cData: courtAnnouncement.content
    },
    isLoading: loading,
    module: '法院公告',
    error: courtAnnouncement.content.length === 0
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
