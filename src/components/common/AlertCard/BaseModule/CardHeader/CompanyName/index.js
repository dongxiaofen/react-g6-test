import React from 'react';
import { observer } from 'mobx-react';
import Popover from 'antd/lib/popover';
import styles from '../index.less';
function CompanyName({item, companyName}) {
  const createComName = () => {
    const showCompanyArray = item.mainMonitorCompanyName.split(',');
    let showRelationshipArray = [];
    const showCompanyObj = [];
    if (item.relatedMonitorId) {
      // 判断关系是否存在
      if (item.relationship) {
        showRelationshipArray = item.relationship.split(',');
        showCompanyArray.map((coArray, coIdx)=> {
          showRelationshipArray.map((reArray, reIdx)=> {
            if (coIdx === reIdx) {
              showCompanyObj.push(
                <p key={`${reIdx} - ${coIdx}}`}>[主] {coArray} - {reArray}</p>
              );
            }
          });
        });
      }else {
        showCompanyArray.map((coArray, idx)=> {
          showCompanyObj.push(
            <p key={`company${idx}`}>[主] {coArray}</p>
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
    if (!item.relatedMonitorId) {
      showCompanyName.push(
        <span onClick={this.viewReport.bind(null, item.get('mainMonitorId'), 'MAIN')} className={styles.companyName}>
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
  return (
    <div>
      {createComName()}
    </div>
  );
}
export default observer(CompanyName);
