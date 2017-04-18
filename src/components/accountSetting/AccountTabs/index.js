import React from 'react';
import { observer } from 'mobx-react';
import Tabs from 'components/lib/tabs';
const TabPane = Tabs.TabPane;
function AccountTabs() {
  return (
    <Tabs>
      <TabPane tab="业务统计">业务统计</TabPane>
      <TabPane tab="消费记录">消费记录</TabPane>
      <TabPane tab="充值记录">充值记录</TabPane>
      <TabPane tab="消费汇总">消费汇总</TabPane>
    </Tabs>
  );
}

export default observer(AccountTabs);
