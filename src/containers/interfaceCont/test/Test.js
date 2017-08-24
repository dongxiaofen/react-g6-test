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
      this.props.interfaceTestStore.updateValue('id', id);
      this.props.interfaceTestStore.getInfoDetail(id);
      this.props.interfaceTestStore.getInterfaceType(id);
    }
    this.props.interfaceTestStore.getApiKey();
  }
  componentWillUnmount() {
    this.props.interfaceTestStore.resetData();
  }
  render() {
    return (
      <div>
        <TestBody />
      </div>
    );
  }
}
