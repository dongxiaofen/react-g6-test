import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import moment from 'moment';

import Container from 'components/common/Layout/Container';
import Row from 'components/common/Layout/Row';
import Col from 'components/common/Layout/Col';
import styles from './index.less';

import SwitchData from './SwitchData';
import StatisticInfo from './StatisticInfo';

const params = {
  begin: moment().subtract(29, 'day').format('YYYY-MM-DD'),
  end: moment().format('YYYY-MM-DD'),
  type: '',
};
@inject('monitorStatisticsStore')@observer
export default class MonitorStatisticsGetData extends Component {
  static propTypes = {
    monitorStatisticsStore: PropTypes.object
  };
  componentDidMount() {
    axios.post('/api/user/login', {
      email: 'cy@sc.cn',
      password: '25f9e794323b453885f5181f1b624d0b'
    });
    const msStore = this.props.monitorStatisticsStore;
    msStore.getStatistic(params);
    msStore.getChangeTrend(params);
    msStore.setParams(params);
  }

  testOnChange = () => {
    console.log('this is test onchange');
  }

  render() {
    const msStore = this.props.monitorStatisticsStore;
    return (
      <Container>
        <Row>
          <Col width="12">
            <div className={`clearfix ${ styles.wrap }`}>
              <div className={styles.title}>监控统计</div>
              <SwitchData
                msStore={msStore}
                params={params}/>
            </div>
          </Col>
        </Row>
        <Row>
          <StatisticInfo
            statistic={msStore.statistic}
            params={msStore.params}
            loading={msStore.loadingGroup.statistic}/>
        </Row>
      </Container>
    );
  }
}
