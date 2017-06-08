import React, { Component, PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Enterprise from 'components/companyHome/report/investAndOffice/Enterprise';
@inject('routing', 'corpDetailStore')
@batchReport('corpDetail')
@observer
export default class EntinvItem extends Component {
  static propTypes = {
    corpDetailStore: PropTypes.object,
    routing: PropTypes.object,
  };
  render() {
    const corpDetailStore = this.props.corpDetailStore;
    const isLoading = corpDetailStore.isLoading;
    return (
      <div>
        <Tabs tab="企业对外投资任职">
          <TabPane tab="企业对外投资任职" key="企业对外投资任职">
            <Enterprise entinvItemList={corpDetailStore.entinvItemList} isLoading={isLoading} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
