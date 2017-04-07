import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import Button from 'components/lib/button';
import styles from './index.less';
@observer
export default class MonitorList extends Component {
  test = (evt) => {
    console.log(evt.target);
  }
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <Button className={styles.test} onClick={this.test} loading>test</Button>
      </Container>
    );
  }
}
