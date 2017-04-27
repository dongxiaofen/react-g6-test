import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import { CommonTable } from 'components/common/report';

function RecentOffers({ recentRecruitment, isLoading }) {
  const modifyBlock = (obj) => {
    const url = obj.sourceUrl;
    const category = obj.category;
    return <a href={url} target="_blank">{category}</a>;
  };
  const data = {
    meta: {
      body: [
        { 'key': 'category', 'width': '1.2', 'modifyBlock': modifyBlock},
        { 'key': 'salaryText', 'width': '2' },
        { 'key': 'address', 'width': '4' },
        { 'key': 'requireNum', 'width': '1.4' },
        { 'key': 'releaseTime', 'width': '1.4' },
      ],
      tData: recentRecruitment,
      dict: 'recentRecruitment'
    },
    isLoading: isLoading,
    module: '近期招聘信息',
    error: recentRecruitment.length === 0
  };
  return (
    <CommonTable {...data} />
  );
}

RecentOffers.propTypes = {
  recentRecruitment: PropTypes.object,
  isLoading: PropTypes.bool,
};
export default observer(RecentOffers);
