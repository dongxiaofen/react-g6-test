import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import Row from 'components/common/layout/Row';
import StatisticInfoItem from './StatisticInfoItem';

function StatisticInfo({ statistic, params, loading }) {
  const statisticCheck = (key, text) => {
    if (text) {
      return statistic && statistic[key] ? statistic[key] : '暂无';
    }
    return statistic && statistic[key] ? statistic[key] : 0;
  };

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
  let companyAvgUpdate = statisticCheck('companyAvgUpdate');
  if (companyAvgUpdate && companyAvgUpdate >= 0) {
    companyAvgUpdate = '+' + companyAvgUpdate;
  }
  const config = [
    {
      title: firstTitle,
      num: statisticCheck('companyInMonitor'),
      numTitle: '家',
      subtitle1: '更新企业',
      subContent1: statisticCheck('companyUpdated', 1),
      subtitle2: '企业平均变化量',
      subContent2: companyAvgUpdate
    },
    {
      title: '分布地区',
      num: statisticCheck('provinceCount'),
      numTitle: '个',
      subtitle1: '更新最多地区',
      subContent1: statisticCheck('provinceMax', 1),
      subtitle2: '该地区更新企业',
      subContent2: statisticCheck('provinceCountInMax')
    },
    {
      title: '分布行业',
      num: statisticCheck('industryCount'),
      numTitle: '个',
      subtitle1: '更新最多行业',
      subContent1: statisticCheck('industryMax', 1),
      subtitle2: '该行业更新企业',
      subContent2: statisticCheck('industryCountInMax')
    },
    {
      title: '更新数据来源',
      num: statisticCheck('sourceCount'),
      numTitle: '个',
      subtitle1: '更新最多来源',
      subContent1: statisticCheck('sourceMax', 1),
      subtitle2: '该行业更新企业',
      subContent2: statisticCheck('sourceCountInMax')
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
