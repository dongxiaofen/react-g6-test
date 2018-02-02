import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ApiTestCont from 'components/v2/apiTest';
import { batchNav } from 'components/hoc';
// import styles from './Introduce.less';
@batchNav()
@inject('apiTestStore', 'routing')
@observer
export default class ApiTest extends Component {
  static propTypes = {
    apiTestStore: PropTypes.object,
    routing: PropTypes.object,
  };
  componentDidMount() {
    const c1Name = this.props.routing.location.query.c1Name || '';
    const c2Id = this.props.routing.location.query.c2Id || '';
    const classificationId = this.props.routing.location.query.classificationId || '';

    this.props.apiTestStore.getAssortmentC1();
    this.props.apiTestStore.getApiKey();
    if (classificationId) {
      this.props.apiTestStore.updateValue('classificationId', classificationId);
      this.props.apiTestStore.updateValue('c2Id', c2Id);
      this.props.apiTestStore.updateValue('c1Name', c1Name);
      this.props.apiTestStore.updateValue('activeC2Id', c2Id);
      this.props.apiTestStore.updateValue('activeApiId', classificationId);
      this.props.apiTestStore.getApiList();
      this.props.apiTestStore.getApiInfo();
    }
  }
  componentWillUnmount() {
    this.props.apiTestStore.resetData();
  }
  render() {
    return (
      <ApiTestCont />
    );
  }
}
