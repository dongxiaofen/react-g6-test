import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import ActiveRules from './ActiveRules';
import HitRules from './HitRules';
import styles from './index.less';

function Rules({accountProfileStore}) {
  const hitRuleConfig = {
    data: accountProfileStore.subNewestRuleData,
    isLoading: accountProfileStore.subNewestRuleIsLoading,
    error: accountProfileStore.subNewestRuleData.length === 0
  };
  const activeConfig = {
    data: accountProfileStore.subFrequentRuleData,
    isLoading: accountProfileStore.subFrequentRuleIsloading,
    error: accountProfileStore.subFrequentRuleData.length === 0
  };
  return (
    <div className={styles.rules_box}>
      <Tabs defaultActiveKey="1" tabBarStyle={{paddingTop: '15px', paddingLeft: '18px', paddingBottom: 0}}>
        <TabPane tab="最新命中预警" key="1">
          <div className={`${hitRuleConfig.isLoading || hitRuleConfig.error ? styles.hit_rules_err : styles.hit_rules }`}>
            <HitRules {...hitRuleConfig} />
          </div>
        </TabPane>
        <TabPane tab="近期最活跃规则" key="2">
          <div className={`${activeConfig.isLoading || activeConfig.error ? styles.active_rules_err : styles.active_rules}`}>
            <ActiveRules {...activeConfig} />
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
