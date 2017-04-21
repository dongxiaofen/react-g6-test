import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'components/lib/tabs';
import Trademark from 'components/companyHome/report/assets/bidding/Trademark';
import Patent from 'components/companyHome/report/assets/bidding/Patent';
import Bidding from 'components/companyHome/report/assets/bidding/Bidding';
import { batchReport } from 'components/hoc';

const TabPane = Tabs.TabPane;
const apiArr = [
  {api: 'patent', pageInfo: ''},
  {api: 'trademark', pageInfo: 'trademarkLists'},
  {api: 'bidding', pageInfo: ''}
];

@inject('routing', 'assetsStore', 'uiStore')
@batchReport('assets', apiArr)
@observer
export default class Assets extends Component {
  static propTypes = {
    assetsStore: PropTypes.object
  };
  render() {
    return (
      <Tabs>
        <TabPane tab="无形资产/招投标">
          <Trademark trademarkInfo={this.props.assetsStore.trademarkData} />
          <Patent />
          <Bidding />
        </TabPane>
      </Tabs>
    );
  }
}
