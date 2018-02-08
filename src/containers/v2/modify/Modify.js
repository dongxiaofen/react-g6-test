import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import ModifyMain from 'components/v2/modify';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@inject('clientStore')
@observer
export default class Modify extends Component {
  static propTypes = {
    clientStore: PropTypes.object,
  };
  componentDidMount() {
    this.props.clientStore.getUserInfo();
  }
  render() {
    return (
      <MainContBox>
        <ModifyMain />
      </MainContBox>
    );
  }
}
