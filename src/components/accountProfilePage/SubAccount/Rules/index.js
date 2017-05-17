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
          <div className={styles.hit_rules}>
            <HitRules data={accountProfileStore.subNewestRuleData} />
          </div>
        </TabPane>
        <TabPane tab="近期最活跃规则" key="2">
          <div className={styles.active_rules}>
            <ActiveRules data={accountProfileStore.subFrequentRuleData} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

Rules.propTypes = {
  accountProfileStore: PropTypes.object,
};
export default inject('accountProfileStore')(observer(Rules));
