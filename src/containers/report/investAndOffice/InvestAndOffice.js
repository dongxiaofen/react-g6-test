import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Enterprise from 'components/companyHome/report/investAndOffice/Enterprise';
import Investment from 'components/companyHome/report/investAndOffice/Investment';
import Office from 'components/companyHome/report/investAndOffice/Office';

@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer
export default class InvestAndOffice extends Component {
  static propTypes = {
    corpDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  render() {
    const corpDetailStore = this.props.corpDetailStore;
    const isLoading = corpDetailStore.isLoading;
    return (
      <Tabs defaultActiveKey="企业对外投资任职">
        <TabPane tab="企业对外投资任职" key="企业对外投资任职">
          <Enterprise entinvItemList={corpDetailStore.entinvItemList} isLoading={isLoading} />
        </TabPane>
        <TabPane tab="法人对外投资任职" key="法人对外投资任职">
          <Investment frinvList={corpDetailStore.frinvList} isLoading={isLoading} />
          <Office frPositionList={corpDetailStore.frPositionList} isLoading={isLoading} />
        </TabPane>
        <TabPane tab="董监高对外投资任职" key="董监高对外投资任职">
          董监高对外投资任职
        </TabPane>
      </Tabs>
    );
  }
}
