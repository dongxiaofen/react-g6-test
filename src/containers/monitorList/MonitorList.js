import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from 'components/common/layout';
import Title from 'components/monitorList/Title';
import SearchBar from 'components/monitorList/SearchBar';
import TypeFilter from 'components/monitorList/TypeFilter';
import TimeSort from 'components/monitorList/TimeSort';
import Counter from 'components/monitorList/Counter';
import TableList from 'components/monitorList/TableList';
import PauseInfo from 'components/monitorList/PauseInfo';
import AddRelation from 'components/common/AddRelation';
@inject('monitorListStore', 'uiStore')
@observer
export default class MonitorList extends Component {
  static propTypes = {
    monitorListStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.monitorListStore.getMainCount();
    this.props.monitorListStore.getMainList();
  }
  render() {
    return (
      <Container>
        <Title>监控列表</Title>
        <SearchBar {...this.props} />
        <TypeFilter {...this.props} />
        <TimeSort {...this.props} />
        <Counter {...this.props} />
        <TableList {...this.props} />
        <PauseInfo {...this.props} />
        <AddRelation useForm="monitorList" {...this.props} />
      </Container>
    );
  }
}
