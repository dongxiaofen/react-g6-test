import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import config from '../../../config/Dict/alertCard.js';
import {
  ScopeAlter,
  ErrorInfo,
  CheckInfo,
  KTAnnouncement,
  FYAnnouncement,
  ExcuteInfo,
  DishonestInfo,
  JudgeDoc,
  News,
  Bidding,
  LitigationAssets,
  TradeMark,
  Patent,
  Dimission,
  Job,
  RecLocation,
  Stock
} from './Module';
function AlertCard({index, data, module, reducerData, store}) {
  const dict = config.cardsConfig;
  const viewReport = (mainMonitorId, type)=>{
    if (type === 'MAIN') {
      location.href = `/companyHome?monitorId=${mainMonitorId}&companyType=${type}`;
    }else {
      store.getMonitorMap(mainMonitorId);
    }
  };
  const typeNameMap = (pattern, firstType, secondType, thirdType, newsType, bidType, altItem, price, caseReason)=>{
    let typeName;
    switch (pattern) {
      case 'CORP_ALTER':
        typeName = `${altItem.replace('变更', '')}变更`;
        break;
      case 'JUDGMENT':
        typeName = `${secondType}-${thirdType}`;
        break;
      case 'NEWS':
        typeName = `${newsType}`;
        break;
      case 'BIDDING':
        typeName = `${secondType}- ${bidType}`;
        break;
      case 'COURT_LITIGATION':
        typeName = `${secondType}${' - 参考价（' + price + '万元）'}`;
        break;
      case 'COURT_NOTICE':
        typeName = `${secondType}${caseReason ? '-' + caseReason : ''}`;
        break;
      default:
        typeName = `${secondType}`;

    }
    return typeName;
  };
  const componentMap = (moduleKey, moduleData)=>{
    let output;
    switch (moduleKey) {
      case 'CORP_ALTER':
        output = <ScopeAlter data={moduleData} />;
        break;
      case 'CORP_ABNORMAL':
        output = <ErrorInfo data={moduleData} />;
        break;
      case 'CORP_CHECK':
        output = <CheckInfo data={moduleData} />;
        break;
      case 'COURT_NOTICE':
        output = <KTAnnouncement data={moduleData} />;
        break;
      case 'COURT_ANNOUNCEMENT':
        output = <FYAnnouncement data={moduleData} />;
        break;
      case 'EXECUTE':
        output = <ExcuteInfo data={moduleData} />;
        break;
      case 'DISHONESTY':
        output = <DishonestInfo data={moduleData} />;
        break;
      case 'JUDGMENT':
        output = <JudgeDoc data={moduleData} reducerData={reducerData} store={store}/>;
        break;
      case 'NEWS':
        output = <News data={moduleData} reducerData={reducerData} store={store}/>;
        break;
      case 'BIDDING':
        output = <Bidding data={moduleData} reducerData={reducerData} store={store}/>;
        break;
      case 'COURT_LITIGATION':
        output = <LitigationAssets data={moduleData} />;
        break;
      case 'TRADEMARK':
        output = <TradeMark data={moduleData} />;
        break;
      case 'PATENT':
        output = <Patent data={moduleData} />;
        break;
      case 'DIMISSION_INTENTION':
        output = <Dimission data={moduleData} />;
        break;
      case 'RECRUITMENT_POST':
        output = <Job data={moduleData} />;
        break;
      case 'RECRUITMENT_LOCATION':
        output = <RecLocation data={moduleData} />;
        break;
      default:
        output = [];
    }
    if (moduleKey.indexOf('STOCK') === 0) {
      output = <Stock data={moduleData} />;
    }
    return output;
  };
  const createComName = (item, companyName) => {
    const showCompanyArray = item.get('mainMonitorCompanyName').split(',');
    let showRelationshipArray = [];
    const showCompanyObj = [];
    if (item.get('relatedMonitorId')) {
      // 判断关系是否存在
      if (item.get('relationship')) {
        showRelationshipArray = item.get('relationship').split(',');
        showCompanyArray.map((coArray, coIdx)=> {
          showRelationshipArray.map((reArray, reIdx)=> {
            if (coIdx === reIdx) {
              showCompanyObj.push(
                <p>[主] {coArray} - {reArray}</p>
              );
            }
          });
        });
      }else {
        showCompanyArray.map((coArray)=> {
          showCompanyObj.push(
            <p>[主] {coArray}</p>
          );
        });
      }
    }
    const showCompanyHover = (
      <div>
        {showCompanyObj}
      </div>
    );
    const showCompanyName = [];
    if (!item.get('relatedMonitorId')) {
      showCompanyName.push(
        <span onClick={viewReport.bind(null, item.get('mainMonitorId'), 'MAIN')} className={styles.companyName}>
          {companyName}
        </span>
      );
    }else {
      showCompanyName.push(
        <Popover placement="right" content={showCompanyHover}>
          <span onClick={this.viewReport.bind(this, item.get('relatedMonitorId'), 'ASSOCIATE')} className={styles.companyName}>{companyName}</span>
        </Popover>
      );
    }
    return showCompanyName;
  };
  const createCardList = ()=>{
    const output = [];
    data.forEach((item, idx) => {
      const pattern = item.pattern || 'BIDDING';
      const firstType = item.dimGroupName;
      const secondType = dict[item.pattern];
      const thirdType = item.dimName;
      const caseReason = item.content.caseReason;
      const newsType = item.get('dimensionGroup') ? item.get('dimensionGroup').split(',')[0] : '';
      const bidType = item.getIn(['content', 'type']);
      const altItem = item.getIn(['content', 'altItem']);
      const rCompanyName = item.get('relatedMonitorCompanyName');
      const price = item.getIn(['content', 'price']);
      const relation = rCompanyName && rCompanyName.length > 0 ? '关联' : '主体';
      const companyName = rCompanyName && rCompanyName.length > 0 ? rCompanyName : item.get('mainMonitorCompanyName');
      const companyType = relation === '关联' ? styles.relatedType : styles.mainType;
      const typeName = typeNameMap(pattern, firstType, secondType, thirdType, newsType, bidType, altItem, price, caseReason);
      // 显示主体公司名(可能有多个)
      // 显示等级
      const grade = [];
      const showGradeHover = [];
      const showGradeList = [];
      let styleImportance = '';
      if (item.get('ruleSimpleResponses').size > 0) {
        item.get('ruleSimpleResponses').map((obj, resIdx)=>{
          let importance = '';
          if (obj.get('eventImportance') === 'HIGH') {
            importance = '高';
          }
          if (obj.get('eventImportance') === 'MIDDLE') {
            importance = '中';
          }
          if (obj.get('eventImportance') === 'LOW') {
            importance = '低';
          }
          if (resIdx === 0) {
            styleImportance = importance;
            grade.push(`事件重要性：${importance}`);
          }
          showGradeList.push(
            <div>
              <span className={styles.gradeNumber}>{(resIdx - 0) + 1}</span>
              <span>&nbsp;&nbsp;重要性：{importance}&nbsp;&nbsp;</span>
              <span>触发规则：[{obj.get('version')}]{obj.get('ruleName')}</span>
            </div>
          );
        });
        if (styleImportance === '高') {
          styleImportance = styles.big;
        }else if (styleImportance === '中') {
          styleImportance = styles.middle;
        }else {
          styleImportance = styles.small;
        }
        showGradeHover.push(
          <Popover placement="top" trigger="hover" content={showGradeList}>
            <span className={styles.grades + ' ' + styleImportance}>{grade}</span>
          </Popover>
        );
      }
      const uniqueKey = index ? index * 10 + idx : idx;
      output.push(
        <div key={uniqueKey} className={styles.singleWrap}>
          <div className={styles.singlePadding}>
            <div className={styles.top}>
              <div className={relation === '主体' ? styles.mainTitle : styles.relationTitle}>
                <span className={styles.typeName}>{typeName}</span>
                {relation === '主体' ? showGradeHover : ''}
              </div>
              {
                module === 'headLine' ? ''
                :
                <div className={styles.nameAndTimeWrap}>
                  <div className={styles.companys}>
                    <span className={companyType}>
                      <span>[</span>
                      <span className={styles.companyType}>{relation}</span>
                      <span>]</span>
                    </span>
                    {createComName(item, companyName)}
                  </div>
                </div>
              }
            </div>
            <div className={styles.componentWrap}>
              {componentMap(pattern, item)}
            </div>
          </div>
        </div>
      );
    });
    return output;
  };
  return (
    <div>
      {createCardList()}
    </div>
  );
}
export default observer(AlertCard);
