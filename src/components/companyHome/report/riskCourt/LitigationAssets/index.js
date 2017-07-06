import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {CardTable } from 'components/common/report';

function LitigationAssets({litigationAssets, regTime, loading}) {
  const priceHandle = (value) => {
    return value ? value + '万元' : '--';
  };
  const data = {
    meta: {
      body: [
        {'key': 'title', 'width': '12'},
        {'key': 'releaseTime', 'width': '6', 'modifyText': regTime},
        {'key': 'price', 'width': '6', 'modifyText': priceHandle},
        {'key': 'category', 'width': '6', hide: true},
        {'key': 'status', 'width': '6', hide: true},
        {'key': 'court', 'width': '12', hide: true},
        {'key': 'projectNotice', 'width': '12', hide: true}
      ],
      isExpand: false,
      dict: 'courtLitigation',
      cData: litigationAssets.content
    },
    isLoading: loading,
    module: '被执行人信息',
    error: !litigationAssets.content || litigationAssets.content.length === 0
  };
  return (
    <CardTable {...data} />
  );
}

LitigationAssets.propTypes = {
  loading: PropTypes.bool,
  regTime: PropTypes.func,
  litigationAssets: PropTypes.object,
};
export default observer(LitigationAssets);
