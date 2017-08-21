import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import Tabs from 'antd/lib/tabs';
const TabPane = Tabs.TabPane;
import ActiveRules from './ActiveRules';
import HitRules from './HitRules';
import styles from './index.less';

function Rules({accountProfileStore}) {
  const erroeModule = (code) => {
    if (code === 404210) {
      return '子账号最新预警企业（无子账号）';
    } else if (code === 404211) {
      return '子账号最新预警账号（有子账号，未创建）';
    } else if (code === 404231) {
      return '子账号最新预警账号（有子账号，未创建）';
    }
    return '暂无信息';
  };
  const keyWords = (code) => {
    if (code === 404210) {
      return '账号中心';
    } else if (code === 404211) {
      return '';
    }else if (code === 404231) {
      return '';
    }
    return '';
  };
  const path = (code) => {
    if (code === 404210) {
      return '/accountSetting';
    } else if (code === 404211) {
      return '';
    } else if (code === 404231) {
      return '';
    }
    return '';
  };
  const hitRuleConfig = {
    data: accountProfileStore.subNewestRuleData.data && accountProfileStore.subNewestRuleData.data.length > 0 ? accountProfileStore.subNewestRuleData.data : [],
    isLoading: accountProfileStore.subNewestRuleIsLoading,
    error: !accountProfileStore.subNewestRuleData.data || accountProfileStore.subNewestRuleData.length === 0,
    errorWords: keyWords(accountProfileStore.subNewestRuleData.errorCode),
    module: erroeModule(accountProfileStore.subNewestRuleData.errorCode),
    path: path(accountProfileStore.subNewestRuleData.errorCode),
  };
  const activeConfig = {
    data: accountProfileStore.subFrequentRuleData.data && accountProfileStore.subFrequentRuleData.data.length > 0 ? accountProfileStore.subFrequentRuleData.data : [],
    isLoading: accountProfileStore.subFrequentRuleIsloading,
    error: !accountProfileStore.subFrequentRuleData.data || accountProfileStore.subFrequentRuleData.length === 0,
    errorWords: keyWords(accountProfileStore.subFrequentRuleData.errorCode),
    module: erroeModule(accountProfileStore.subFrequentRuleData.errorCode),
    path: path(accountProfileStore.subFrequentRuleData.errorCode),
  };
  return (
    <div className={styles.rules_box}>
      <Tabs defaultActiveKey="1" tabBarStyle={{paddingTop: '15px', paddingLeft: '18px', marginBottom: 0}}>
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
