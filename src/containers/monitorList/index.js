import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import Button from 'components/lib/button';
import Input from 'components/lib/input';
import Pagination from 'components/lib/pagination';
// import styles from './index.less';
@observer
export default class MonitorList extends Component {
  test = (evt) => {
    console.log(evt);
  }
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <Button btnType="primary" onClick={this.test}>test</Button>
        <Input inputType="singleline" onChange={this.test} placeholder="test" />
        <Pagination current={1} total={20} onChange={this.test} />
      </Container>
    );
  }
}
