import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { batchNav } from 'components/hoc';
import TestBody from 'components/interface/test';
@batchNav()
@inject('routing', 'interfaceTestStore')
@observer
export default class Test extends Component {
  static propTypes = {
    routing: PropTypes.object,
    interfaceTestStore: PropTypes.object,
  };
  componentDidMount() {
    const id = this.props.routing.location.query.id;
    if (id) {
      // 单个接口测试
      this.props.interfaceTestStore.updateValue('id', id);
      this.props.interfaceTestStore.getInfoDetail(id);
      this.props.interfaceTestStore.getInterfaceType('single');
    } else {
      // 集成接口测试
      this.props.interfaceTestStore.getfiltedApiList();
      this.props.interfaceTestStore.getInterfaceType('all');
    }
    this.props.interfaceTestStore.getApiKey();
  }
  componentWillUnmount() {
    this.props.interfaceTestStore.resetData();
  }
  render() {
    const pageType = this.props.routing.location.query.id ? 'single' : 'all';
    return (
      <div>
        <TestBody pageType={pageType}/>
      </div>
    );
  }
}
