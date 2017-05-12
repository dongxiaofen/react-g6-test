import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Row, Col} from 'components/common/layout';
import styles from './index.less';
import RuleName from './RuleName';
import RuleBasis from './RuleBasis';
import RuleRange from './RuleRange';
import RuleCompany from './RuleCompany';
import RuleResult from './RuleResult';
import RuleTime from './RuleTime';
import RuleSwitch from './RuleSwitch';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';

function RuleItem({ruleList, switchLoading, itemData, changeRuleStatus, setItemData, uiStore, modalStore}) {
  const list = [];
  if (ruleList && ruleList.length > 0) {
    ruleList.map((obj, idx)=>{
      // 判断是系统规则还是用户自定义规则
      let range = (<RuleRange data={obj} />);
      if (obj.rule.companyNames && obj.rule.companyNames.length > 0) {
        range = (<RuleCompany data={obj} />);
      }
      list.push(
        <div
          key={`${idx}${obj.createTs}`} className={styles.single}>
          <Row>
            <Col width="10">
              <div className={styles.left}>
                <RuleName data={obj} />
                <RuleBasis data={obj} />
                {range}
                <RuleResult data={obj} />
              </div>
            </Col>
            <Col width="2">
              <div className={styles.right}>
                <RuleTime data={obj} />
                <RuleSwitch
                  data={obj}
                  changeRuleStatus={changeRuleStatus}
                  setItemData={setItemData}
                  itemData={itemData}
                  switchLoading={switchLoading}
                  modalStore={modalStore} />
              </div>
            </Col>
          </Row>
        </div>
      );
    });
  }
  return (
    <div className={styles.box}>
      {list}
      <div className={styles.page}>
        <Pager tData={ruleList} module="ruleListPager"
               uiStore={uiStore} type="large"/>
      </div>
    </div>
  );
}

RuleItem.propTypes = {
  ruleList: PropTypes.object,
  switchLoading: PropTypes.bool,
  loading: PropTypes.bool,
  itemData: PropTypes.object,
  changeRuleStatus: PropTypes.func,
  setItemData: PropTypes.func,
  uiStore: PropTypes.object,
  modalStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loading === true ? true : false,
    imgCategory: 14,
    category: 2,
    module: '预警列表',
  }),
})(observer(RuleItem));
