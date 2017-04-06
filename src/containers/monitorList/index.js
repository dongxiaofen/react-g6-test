import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
@observer
export default class MonitorList extends Component {
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
      </Container>
    );
  }
}
