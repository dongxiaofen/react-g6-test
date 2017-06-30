import React, { Component } from 'react';
import { observer } from 'mobx-react';
import AssetManageAnalyBody from 'components/companyHome/report/AssetManageAnaly';

@observer
export default class AssetManageAnaly extends Component {
  render() {
    return (
      <AssetManageAnalyBody />
    );
  }
}
