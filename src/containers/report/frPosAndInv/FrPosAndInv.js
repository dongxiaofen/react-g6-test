import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Investment from 'components/companyHome/report/investAndOffice/Investment';
import Office from 'components/companyHome/report/investAndOffice/Office';
@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer

export default class FrPosAndInv extends Component {
  static propTypes = {
    corpDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  render() {
    const corpDetailStore = this.props.corpDetailStore;
    const isLoading = corpDetailStore.isLoading;
    return (
      <div>
        <Tabs tab="法人对外投资任职">
          <TabPane tab="法人对外投资任职" key="法人对外投资任职">
            <Investment frinvList={corpDetailStore.frinvList} isLoading={isLoading} />
            <Office frPositionList={corpDetailStore.frPositionList} isLoading={isLoading} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
