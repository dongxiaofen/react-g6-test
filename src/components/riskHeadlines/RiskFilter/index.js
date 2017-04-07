import React from 'react';
import DatePicker from 'antd/lib/date-picker';
const RangePicker = DatePicker.RangePicker;
import styles from './index.less';
// import {Checkbox, Input} from 'components/lib';
function RiskFilter({riskHeadlinesStore}) {
  const disabledDate = (current)=> {
    return current && current.getTime() > Date.now();
  };
  // const getDimGroupType = (list) => {
  //   const dimGroupType = [];
  //   list.forEach((item)=>{
  //     if (item.checked === 1) {
  //       dimGroupType.push(item.enumKey);
  //     }
  //   });
  //   return dimGroupType;
  // };
  // const getCompanyList = (params, newFilterCig) => {
  //   const filterCig = newFilterCig || filterConfig.toJS();
  //   params.dimGroupType = getDimGroupType(filterCig);
  //   commonBoundAC.updateValue(['filterParams', 'dimGroupType'], params.dimGroupType, 'RISK_UPDATE_VALUE');
  //   riskheadlinesBoundAC.getCompanyList(params);
  // };
  const changeDate = (dateString, dateTime)=> {
    riskHeadlinesStore.riskUpdateValue('filterParams', 'from', dateTime[0]);
    riskHeadlinesStore.riskUpdateValue('filterParams', 'to', dateTime[1]);
    // const params = filterParams.toJS();
    // params.from = dateTime[0];
    // params.to = dateTime[1];
    // getCompanyList(params);
  };
  // const updateCompanyName = (evt) => {
  //   commonBoundAC.updateValue(['filterParams', 'companyName'], evt.target.value, 'RISK_UPDATE_VALUE');
  // };
  // const filterByComName = (evt) => {
  //   if (evt.keyCode !== 13) {
  //     return false;
  //   }
  //   const params = filterParams.toJS();
  //   getCompanyList(params);
  // };
  // const checkFilter = (idx, evt)=> {
  //   const checked = evt.target.checked ? 1 : 0;
  //   commonBoundAC.updateValue(['filterConfig', idx, 'checked'], checked, 'RISK_UPDATE_VALUE');
  //   const filterCig = filterConfig.toJS();
  //   filterCig[idx].checked = checked;
  //   const params = filterParams.toJS();
  //   getCompanyList(params, filterCig);
  // };
  // const createCheckBox = (filterCig)=> {
  //   const output = [];
  //   filterCig.toArray().forEach((item, idx)=>{
  //     const disabled = filterParams.getIn(['dimGroupType']).size <= 1 && item.get('checked') === 1 ? -1 : 0;
  //     output.push(
  //       <div key={item.get('enumKey')} className={styles.checkBox}>
  //         <Checkbox
  //           defaultChecked={item.get('checked')}
  //           id={`messageFilter${idx}`}
  //           checked={item.get('checked')}
  //           disabled={disabled}
  //           onChange={checkFilter.bind(null, idx)}
  //           label={`${item.get('name')}`}
  //           textCss={styles.text}
  //           title={disabled === -1 ? '维度类型至少保留一个' : ''}/>
  //       </div>
  //     );
  //   });
  //   return output;
  // };
  let riskFilter;
  const getRangePicker = ()=> {
    if (!riskFilter) {
      riskFilter = document.getElementById('riskRangePicker');
    }
    return riskFilter;
  };
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>每日监控</h2>
      <div className={`${styles.row} clearfix`}>
        <span className={styles.label}>时间筛选</span>
        <div className={styles.date} id="riskRangePicker">
           <RangePicker
            style={{width: 205}}
            defaultValue={[riskHeadlinesStore.filterParams.from, riskHeadlinesStore.filterParams.to]}
            disabledDate={disabledDate}
            format="yyyy-MM-dd"
            onChange={changeDate.bind(this)}
            getCalendarContainer={getRangePicker}/>
        </div>
      </div>
      <div className={`${styles.row} clearfix`}>
        <span className={styles.label}>公司搜索</span>
        <div className={styles.item}>
          {/* <Input
            placeholder="输入企业名称，回车搜索"
            cssName={styles.searchInput}
            value={filterParams.get('companyName')}
            onChange={updateCompanyName}
            onKeyUp={filterByComName}/>*/}
        </div>
      </div>
      <div className={`${styles.row} clearfix`}>
        <span className={styles.label} id="type">维度类型</span>
        {/* <div className={styles.item}>
          {createCheckBox(filterConfig)}
        </div>*/}
      </div>
    </div>
  );
}
export default RiskFilter;
