import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
// import Popover from 'antd/lib/popover';
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
  const componentMap = (moduleKey, moduleData)=>{
    let output;
    switch (moduleKey) {
      case 'CORP_ALTER':
        output = <ScopeAlter data={moduleData} module={module}/>;
        break;
      case 'CORP_ABNORMAL':
        output = <ErrorInfo data={moduleData} module={module} />;
        break;
      case 'CORP_CHECK':
        output = <CheckInfo data={moduleData} module={module} store={store}/>;
        break;
      case 'COURT_NOTICE':
        output = <KTAnnouncement data={moduleData} module={module} store={store}/>;
        break;
      case 'COURT_ANNOUNCEMENT':
        output = <FYAnnouncement data={moduleData} module={module} store={store}/>;
        break;
      case 'EXECUTE':
        output = <ExcuteInfo data={moduleData} module={module} store={store}/>;
        break;
      case 'DISHONESTY':
        output = <DishonestInfo data={moduleData} module={module} store={store}/>;
        break;
      case 'JUDGMENT':
        output = <JudgeDoc data={moduleData} reducerData={reducerData} store={store} module={module}/>;
        break;
      case 'NEWS':
        output = <News data={moduleData} reducerData={reducerData} store={store} module={module}/>;
        break;
      case 'BIDDING':
        output = <Bidding data={moduleData} reducerData={reducerData} store={store} module={module}/>;
        break;
      case 'COURT_LITIGATION':
        output = <LitigationAssets data={moduleData} module={module}/>;
        break;
      case 'TRADEMARK':
        output = <TradeMark data={moduleData} module={module}/>;
        break;
      case 'PATENT':
        output = <Patent data={moduleData} module={module}/>;
        break;
      case 'DIMISSION_INTENTION':
        output = <Dimission data={moduleData} module={module}/>;
        break;
      case 'RECRUITMENT_POST':
        output = <Job data={moduleData} module={module}/>;
        break;
      case 'RECRUITMENT_LOCATION':
        output = <RecLocation data={moduleData} module={module}/>;
        break;
      default:
        output = [];
    }
    if (moduleKey.indexOf('STOCK') === 0) {
      output = <Stock data={moduleData} />;
    }
    return output;
  };
  const createCardList = ()=>{
    const output = [];
    data.forEach((item, idx) => {
      const pattern = item.pattern || 'BIDDING';
      const uniqueKey = index ? index * 10 + idx : idx;
      output.push(
        <div key={uniqueKey} className={styles.singleWrap}>
          <div className={styles.singlePadding}>
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
