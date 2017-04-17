import React from 'react';
import styles from './index.less';
import SubCompany from './SubCompany';
// import AnimateLoading from 'components/common/Hoc/ajaxIntercept/AnimateLoading';
import {observer} from 'mobx-react';
function CompanyCard({riskHeadlinesStore, companyData}) {
  const companyList = riskHeadlinesStore.companyList;
  const subCompanyList = riskHeadlinesStore.subCompanyList;
  const filterParams = riskHeadlinesStore.filterParams;
  const config = [
    {key: 'corpCount', value: '工商'},
    {key: 'legalCount', value: '法务'},
    {key: 'newsCount', value: '新闻'},
    {key: 'operationCount', value: '经营'},
    {key: 'teamCount', value: '团队'},
    {key: 'stockCount', value: '上市'},
  ];
  const createLable = ()=>{
    const output = [];
    config.forEach((item)=>{
      if (companyData[item.key] > 0) {
        output.push(<span className={styles.label} key={item.key}>{`${item.value}${companyData[item.key]}`}</span>);
      }
    });
    return output;
  };
  const monitorId = companyData.monitorId;
  const clickCompany = ()=> {
    riskHeadlinesStore.riskUpdateValue('companyList', 'active', monitorId);
    riskHeadlinesStore.riskUpdateValue('events', 'companyType', 'MAIN');
    riskHeadlinesStore.getCompanyInfo(monitorId, filterParams);
  };
  const extendSubCompany = ()=> {
    const data = subCompanyList.get(companyData.monitorId) || [];
    if (data.length < 1) {
      riskHeadlinesStore.getSubCompanyList(monitorId, riskHeadlinesStore.filterParams);
    } else {
      riskHeadlinesStore.setMapValue('subCompanyList', `${companyData.monitorId}`, []);
    }
  };
  const cssComName = companyList.active === companyData.monitorId ? styles.companyNameAct : styles.companyName;
  const subCompanyData = subCompanyList.get(companyData.monitorId) || [];
  const cssName = subCompanyData.length > 0 ? styles.up : styles.extend;
  const viewText = () => {
    if (subCompanyData.length < 1) {
      // const extendStatus = riskHeadlinesStore.subCompany.extend[monitorId];
      const extendStatus = false;
      return extendStatus ? <div className={styles.loading}></div> : <span><i className="fa fa-angle-down" aria-hidden="true"></i>展开</span>;
    }
    return <span><i className="fa fa-angle-down" aria-hidden="true"></i>收起</span>;
  };
  return (
    <div className={styles.card}>
      <div className={`${styles.companyInfo} clearfix`}>
        <p className={cssComName} onClick={clickCompany}>{companyData.companyName}</p>
        <div>{createLable()}</div>
        {
          companyData.relatedCompanyCount > 0 ?
          <div className={styles.subInfo}>
            <p onClick={extendSubCompany} className={cssName}>
              {viewText()}
            </p>
            <p className={styles.relateInfo}>
              该企业共<span className={styles.number}>{companyData.relatedCompanyCount}</span>家关联公司发生<span className={styles.number}>{companyData.relatedEventCount}</span>条信息
            </p>
          </div>
          : ''
        }
      </div>
      {
        subCompanyData.length > 0 ?
        <div className={styles.subCompany}>
           <SubCompany
            data={subCompanyData}
            riskHeadlinesStore={riskHeadlinesStore}
            activeComMonId ={companyList.active}
            />
        </div> : ''
      }
    </div>
  );
}
export default observer(CompanyCard);
