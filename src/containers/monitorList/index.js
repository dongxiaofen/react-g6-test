import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import SearchBar from 'components/monitorList/SearchBar';
import TypeFilter from 'components/monitorList/TypeFilter';
import TimeSort from 'components/monitorList/TimeSort';
import Counter from 'components/monitorList/Counter';
@inject('monitorListStore')
@observer
export default class MonitorList extends Component {
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <SearchBar {...this.props} />
        <TypeFilter {...this.props} />
        <TimeSort {...this.props} />
        <Counter {...this.props} />
      </Container>
    );
  }
}
