import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Row from 'components/common/layout/Row';
import StatisticInfoItem from './StatisticInfoItem';

function StatisticInfo({ statistic, params, loading }) {
  let firstTitle;
  switch (params.type) {
    case 'MAIN':
      firstTitle = '监控中主体企业';
      break;
    case 'ASSOCIATE':
      firstTitle = '监控中关联企业';
      break;
    default:
      firstTitle = '监控中所有企业';
      break;
  }
  let companyAvgUpdate = statistic.companyAvgUpdate ? statistic.companyAvgUpdate : 0;
  if (companyAvgUpdate && companyAvgUpdate >= 0) {
    companyAvgUpdate = '+' + companyAvgUpdate;
  }
  const config = [
    {
      title: firstTitle,
      num: statistic.companyInMonitor,
      numTitle: '家',
      subtitle1: '更新企业',
      subContent1: statistic.companyUpdated ? statistic.companyUpdated : '暂无',
      subtitle2: '企业平均变化量',
      subContent2: companyAvgUpdate
    },
    {
      title: '分布地区',
      num: statistic.provinceCount,
      numTitle: '个',
      subtitle1: '更新最多地区',
      subContent1: statistic.provinceMax ? statistic.provinceMax : '暂无',
      subtitle2: '该地区更新企业',
      subContent2: statistic.provinceCountInMax ? statistic.provinceCountInMax : 0
    },
    {
      title: '分布行业',
      num: statistic.industryCount,
      numTitle: '个',
      subtitle1: '更新最多行业',
      subContent1: statistic.industryMax ? statistic.industryMax : '暂无',
      subtitle2: '该行业更新企业',
      subContent2: statistic.industryCountInMax ? statistic.industryCountInMax : 0
    },
    {
      title: '更新数据来源',
      num: statistic.sourceCount,
      numTitle: '个',
      subtitle1: '更新最多来源',
      subContent1: statistic.sourceMax ? statistic.sourceMax : '暂无',
      subtitle2: '该行业更新企业',
      subContent2: statistic.sourceCountInMax ? statistic.sourceCountInMax : 0
    },
  ];
  return (
    <Row>
      {
        config.map((item, idx) => {
          return <StatisticInfoItem key={idx} data={item} loading={loading} />;
        })
      }
    </Row>
  );
}

StatisticInfo.propTypes = {
  statistic: PropTypes.object,
  params: PropTypes.object,
  loading: PropTypes.bool,
};
export default observer(StatisticInfo);
