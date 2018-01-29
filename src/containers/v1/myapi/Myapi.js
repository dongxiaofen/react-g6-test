import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import MyapiMain from 'components/v1/myapi';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('accountStore')
@observer
export default class MyApi extends Component {
  static propTypes = {
    accountStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.accountStore.getMyInterface();
    this.props.accountStore.getInterfaceType();
  }
  render() {
    return (
      <MainContBox>
        <MyapiMain data={{loading: this.props.accountStore.myApi.myInterface.data === undefined, error: this.props.accountStore.myApi.myInterface.error}}/>
      </MainContBox>
    );
  }
}
