import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Container } from 'components/common/Layout';
import Title from 'components/monitorList/Title';
import SearchBar from 'components/monitorList/SearchBar';
import TypeFilter from 'components/monitorList/TypeFilter';
import TimeSort from 'components/monitorList/TimeSort';
import Counter from 'components/monitorList/Counter';
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
        <SearchBar />
        <TypeFilter />
        <TimeSort />
        <Counter />
      </Container>
    );
  }
}
