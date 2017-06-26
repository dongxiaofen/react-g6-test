import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Row, Col} from 'components/common/layout';
import styles from './index.less';
import RuleName from './RuleName';
import RuleBasis from './RuleBasis';
import RuleRange from './RuleRange';
import RuleCompany from './RuleCompany';
import RuleKeyWords from './RuleKeyWords';
import RuleResult from './RuleResult';
import RuleTime from './RuleTime';
import RuleSwitch from './RuleSwitch';
import RuleShare from './RuleShare';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';

function RuleItem({ruleList, switchLoading, switchLoading2, ruleType, itemData, changeRuleStatus, changeRuleShare, setItemData, uiStore, modalStore, setShowCompanyId, showCompanyId, setShowKeyWordId, showKeyWordId}) {
  const list = [];
  if (ruleList && ruleList.length > 0) {
    ruleList.map((obj, idx)=>{
      // 公司数量
      let companyNumber = '';
      if (obj.rule.companyNames && obj.rule.companyNames.length > 0) {
        companyNumber = obj.rule.companyNames.length;
      }
      // 关键词数量
      let keywordsNumber = '';
      if (obj.rule.keywords && obj.rule.keywords.length > 0) {
        keywordsNumber = obj.rule.keywords.length;
      }
      // 公司判断是否需要展开
      const showCompany = showCompanyId.indexOf(obj.rule.id) > -1 ? true : false;
      const showCompanyStyle = companyNumber > 0 ? styles.showCompany : styles.downCompany;
      // 关键字判断是否需要展开
      const showKeyWord = showKeyWordId.indexOf(obj.rule.id) > -1 ? true : false;
      const showKeyWordStyle = keywordsNumber > 0 ? styles.showKeyWord : styles.downKeyWord;
      const sinShow = showCompany && keywordsNumber < 1 ? styles.sinShow : '';
      list.push(
        <div
          key={`${idx}${obj.createTs}`} className={styles.single}>
          <div className={styles.singleContent}>
            <Row>
              <Col width="10">
                <div className={styles.left}>
                  <div className={styles.content}>
                    <RuleName data={obj} />
                    <RuleResult data={obj} />
                  </div>
                  <div className={styles.content2}>
                    <RuleBasis data={obj} />
                  </div>
                  {/* 判断是否显示应用企业范围 */}
                  {obj.rule.companyNames && obj.rule.companyNames.length > 0 ? '' : <div className={`${styles.content3} ${companyNumber < 1 && keywordsNumber < 1 ? styles.rangeStyle : ''}`}>
                    <RuleRange data={obj} />
                  </div>}
                </div>
              </Col>
              <Col width="2">
                <div className={styles.right}>
                  <div className={styles.rightContent}>
                    {ruleType ? '' : <div className={styles.opens}>
                      <RuleSwitch
                        data={obj}
                        changeRuleStatus={changeRuleStatus}
                        setItemData={setItemData}
                        itemData={itemData}
                        switchLoading={switchLoading}
                        modalStore={modalStore} />
                    </div>}
                    {ruleType ? '' : <div className={styles.share}>
                      <RuleShare
                        data={obj}
                        changeRuleShare={changeRuleShare}
                        setItemData={setItemData}
                        itemData={itemData}
                        switchLoading2={switchLoading2}
                        modalStore={modalStore} />
                    </div>}
                    <div className={styles.time}>
                      <RuleTime data={obj} />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.toggleWrap}>
            {/* 判断companyNames */}
            <div className={companyNumber > 0 ? styles.toggleCon : styles.hidden}>
              <div className={`${showCompany ? styles.count1Show : styles.count1Down} ${showKeyWordStyle} ${sinShow}`}>
                <div className={styles.riskLabel} onClick={setShowCompanyId.bind(this, obj.rule.id)}>
                  <span>应用企业: {companyNumber}家</span>
                  <i className={showCompany ? styles.show : styles.down}></i>
                </div>
              </div>
              <RuleCompany data={obj} showCompanyId={showCompanyId} />
            </div>
            {/* 判断keywords */}
            <div className={keywordsNumber > 0 ? styles.toggleCon : styles.hidden}>
              <div className={`${showKeyWord ? styles.count2Show : styles.count2Down} ${showCompanyStyle}`}>
                <div className={styles.riskLabel} onClick={setShowKeyWordId.bind(this, obj.rule.id)}>
                  <span>关键词: {keywordsNumber}个</span>
                  <i className={showKeyWord ? styles.show : styles.down}></i>
                </div>
              </div>
              <RuleKeyWords data={obj} showKeyWordId={showKeyWordId} />
            </div>
          </div>
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
  switchLoading2: PropTypes.bool,
  ruleType: PropTypes.bool,
  loading: PropTypes.bool,
  itemData: PropTypes.object,
  changeRuleStatus: PropTypes.func,
  changeRuleShare: PropTypes.func,
  setItemData: PropTypes.func,
  uiStore: PropTypes.object,
  modalStore: PropTypes.object,
  setShowCompanyId: PropTypes.func,
  showCompanyId: PropTypes.object,
  setShowKeyWordId: PropTypes.func,
  showKeyWordId: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.loading === true ? true : false,
    imgCategory: 14,
    category: 2,
    module: '规则列表',
    errCategory: 2,
    error: props.ruleList.length === 0,
  }),
})(observer(RuleItem));
