import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import MyapiMain from 'components/v2/myapi';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('myApiStore')
@observer
export default class MyApi extends Component {
  static propTypes = {
    myApiStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.myApiStore.getMyInterface();
  }
  // componentWillUnmount() {
  //   this.props.myApiStore.resetData();
  // }
  render() {
    return (
      <MainContBox>
        <MyapiMain data={{loading: this.props.myApiStore.myInterface.data === undefined, error: this.props.myApiStore.myInterface.error}}/>
      </MainContBox>
    );
  }
}
