import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import Select from 'components/lib/Select';
import styles from './index.less';

const Option = Select.Option;
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
  }

  testOnChange = () => {
    console.log('this is test onchange');
  }

  render() {
    return (
      <div className={styles.wrap}>
        this is MonitorStatisticsGetData
        <div style={{ marginLeft: 20 }}>
          <Select onChange={this.testOnChange}>
            <Option value="">
              所有企业
            </Option>
            <Option value="MAIN">
              主体企业
            </Option>
            <Option value="ASSOCIATE">
              关联企业
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}
