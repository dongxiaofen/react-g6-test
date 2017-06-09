import React, { Component} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import { batchReport } from 'components/hoc';
import Enterprise from 'components/companyHome/report/investment/Enterprise';
@inject('routing', 'investmentStore')
@batchReport('investmentStore')
@observer
export default class EntinvItem extends Component {
  render() {
    return (
      <div>
        <Tabs tab="企业对外投资任职">
          <TabPane tab="企业对外投资任职" key="企业对外投资任职">
            <Enterprise {...this.props} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
