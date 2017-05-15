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
  const activeIndex = props.accountSettingStore.tree.activeIndex;
  const data = props.accountSettingStore.tree.data.content;
  const none = !data || data[activeIndex].parentUserId;
  const activeKey = props.accountSettingStore.tabs.activeKey;
  const tabConf = [
    {name: '业务统计', comp: Business, none: false},
    {name: '消费记录', comp: Consume, none: false},
    {name: '充值记录', comp: Recharge, none: none},
    {name: '消费汇总', comp: Summary, none: none},
    {name: '登录记录', comp: LoginRecord, none: false},
  ];
  const changeTabs = (key) => {
    props.accountSettingStore.changeValue('tabs.activeKey', key);
  };
  return (
    <Tabs activeKey={activeKey} onChange={changeTabs}>
      {
        tabConf.map(item => {
          if (!item.none) {
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
