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
@inject('monitorListStore', 'uiStore', 'routing')
@observer
export default class MonitorList extends Component {
  static propTypes = {
    monitorListStore: PropTypes.object,
    routing: PropTypes.object,
    uiStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.monitorListStore.getMainCount();
    this.props.monitorListStore.getMainList();
  }
  componentWillUnmount() {
    this.props.uiStore.updateUiStore('monitorList', {
      searchInput: '',
      sortDirection: {
        start_tm: 'DESC',
        expire_dt: 'DESC',
        latestTs: 'DESC',
      },
      params: {
        companyName: '',
        sort: 'start_tm,DESC',
        monitorStatus: '',
      }
    });
    this.props.uiStore.updateUiStore('monitorListPager', {
      index: 1,
      size: 10,
      totalElements: 0,
    });
  }
  render() {
    return (
      <Container>
        <Title {...this.props} />
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
