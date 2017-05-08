import React from 'react';
import styles from './index.less';
import SubCompany from './SubCompany';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
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
  const hasMainEvents = ()=> {
    let flag = false;
    for (const item of config) {
      if (companyData[item.key] > 0) {
        flag = true;
        break;
      }
    }
    return flag;
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
    if (subCompanyData.length > -1) {
      const extendStatus = riskHeadlinesStore.subCompLoading.get(monitorId);
      if (extendStatus) {
        return (
          <div className={styles.loading}>
            <AnimateLoading animateCategory={1}/>
          </div>
        );
      }
      return (<span><i className="fa fa-angle-down" aria-hidden="true"></i>展开</span>);
    }
    return <span><i className="fa fa-angle-down" aria-hidden="true"></i>收起</span>;
  };
  const hasEvents = hasMainEvents();
  return (
    <div className={styles.card}>
      <div className={`${styles.companyInfo} clearfix`}>
        {
          hasEvents ? <p className={cssComName} onClick={clickCompany}>{companyData.companyName}</p>
        : <p className={styles.companyNorm}>{companyData.companyName}</p>
        }
        <div>{createLable()}</div>
        {
          companyData.relatedCompanyCount > 0 ?
          <div className={styles.subInfo}>
            <div onClick={extendSubCompany} className={cssName}>
              {viewText()}
            </div>
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
            activeComMonId ={companyList.active} />
        </div> : ''
      }
    </div>
  );
}
export default observer(CompanyCard);
