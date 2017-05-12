import React from 'react';
import { observer } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import Business from './Business';
import Consume from './Consume';
import Recharge from './Recharge';
import Summary from './Summary';
import LoginRecord from './LoginRecord';
function AccountTabs(props) {
  const baseInfo = props.accountSettingStore.base.data;
  const access = !baseInfo || baseInfo.parentUserId;
  const tabConf = [
    {name: '业务统计', comp: Business, hide: false},
    {name: '消费记录', comp: Consume, hide: false},
    {name: '充值记录', comp: Recharge, hide: access},
    {name: '消费汇总', comp: Summary, hide: access},
    {name: '登录记录', comp: LoginRecord, hide: false},
  ];
  return (
    <Tabs defaultActiveKey="业务统计">
      {
        tabConf.map(item => {
          if (!item.hide) {
            return (
              <TabPane tab={item.name} key={item.name}>
                <item.comp {...props} />
              </TabPane>
            );
          }
        })
      }
    </Tabs>
  );
}

export default observer(AccountTabs);
