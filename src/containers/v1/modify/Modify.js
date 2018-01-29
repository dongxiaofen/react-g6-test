import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ModifyMain from 'components/v1/modify';
import MainContBox from 'components/common/MainContBox';
import { batchNav } from 'components/hoc';

@batchNav()
@observer
export default class Modify extends Component {
  render() {
    return (
      <MainContBox>
        <ModifyMain />
      </MainContBox>
    );
  }
}
