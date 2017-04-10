import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import Button from 'components/lib/button';
import Input from 'components/lib/input';
import Pagination from 'components/lib/pagination';
import Switch from 'components/lib/switch';
import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
import styles from './index.less';
@observer
export default class MonitorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      status: false,
    };
  }
  testPage = (value) => {
    this.setState({
      current: value,
    });
  }
  testSwitch = (value) => {
    this.setState({
      status: value,
    });
  }
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <Button btnType="primary" onClick={this.test}>test</Button>
        <Input inputType="singleline" onChange={this.test} placeholder="test" />
        <Pagination current={this.state.current} total={20} onChange={this.testPage} />
        <Switch status={this.state.status} onChange={this.testSwitch} />
        <Tabs className={styles.test} defaultActiveKey={3}>
          <TabPane tab="第一个" disabled title="test">1</TabPane>
          <TabPane className={styles.test} tab="第二个">2</TabPane>
          <TabPane tab="第三个" reMountEveryTime>3</TabPane>
        </Tabs>
      </Container>
    );
  }
}
