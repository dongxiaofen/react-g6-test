import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import ActiveRules from './ActiveRules';
import HitRules from './HitRules';
import styles from './index.less';

function Rules({accountProfileStore}) {
  return (
    <div className={styles.rules_box}>
      <Tabs defaultActiveKey="1" tabBarStyle={{paddingTop: '15px', paddingLeft: '18px'}}>
        <TabPane tab="最新命中预警" key="1">
          <HitRules data={accountProfileStore.subNewestRuleData} />
        </TabPane>
        <TabPane tab="近期最活跃规则" key="2">
          <ActiveRules data={accountProfileStore.subFrequentRuleData} />
        </TabPane>
      </Tabs>
    </div>
  );
}

Rules.propTypes = {
  foo: PropTypes.string,
};
export default inject('accountProfileStore')(observer(Rules));
