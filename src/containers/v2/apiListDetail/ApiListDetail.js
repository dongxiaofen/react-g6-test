import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ListDetail from 'components/v2/apiListDetail';
import { batchNav } from 'components/hoc';
// import styles from './Introduce.less';
@batchNav()
@inject('apiListDetailStore', 'routing')
@observer
export default class ApiListDetail extends Component {
  static propTypes = {
    apiListDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  componentDidMount() {
    const id = this.props.routing.location.query.id;
    const name = this.props.routing.location.query.name;
    this.props.apiListDetailStore.updateValue('classificationId', id);
    this.props.apiListDetailStore.updateValue('classificationName', name);
    this.props.apiListDetailStore.getApiList();
    this.props.apiListDetailStore.getErrorCode();
  }
  componentWillUnmount() {
    this.props.apiListDetailStore.resetData();
  }
  render() {
    return (
      <ListDetail />
    );
  }
}
