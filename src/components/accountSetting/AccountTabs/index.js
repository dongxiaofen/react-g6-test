import React from 'react';
import { observer } from 'mobx-react';
import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
import Business from './Business';
import Consume from './Consume';
import Recharge from './Recharge';
import Summary from './Summary';
function AccountTabs(props) {
  return (
    <Tabs>
      <TabPane tab="业务统计">
        <Business {...props} />
      </TabPane>
      <TabPane tab="消费记录">
        <Consume {...props} />
      </TabPane>
      <TabPane tab="充值记录">
        <Recharge {...props} />
      </TabPane>
      <TabPane tab="消费汇总">
        <Summary {...props} />
      </TabPane>
    </Tabs>
  );
}

export default observer(AccountTabs);
