import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Checkbox from 'antd/lib/checkbox';

function Company({ruleStore}) {
  // 公司列表数据
  const companyListData = ruleStore.companyData;
  let companyListDom = [];
  const selectData = ruleStore.companySelectData;
  if (companyListData && companyListData.length > 0) {
    companyListData.map((obj, idx)=>{
      // 判断是否应该勾选
      let type = false;
      if (selectData && selectData.length > 0) {
        selectData.map((item)=>{
          if (obj.monitorId === item.monitorId) {
            type = true;
          }
        });
      }
      companyListDom.push(
        <div
          key={`${idx}company`}
          className={styles.leftSingle}>
          <div className={styles.leftSingleText}>
            {obj.companyName}
          </div>
          <div className={styles.chk}>
            <Checkbox
              checked={type}
              onChange={ruleStore.onChangeCompany.bind(this, obj)}>
              请选择
            </Checkbox>
          </div>
        </div>
      );
    });
  } else {
    companyListDom = (
      <div className={styles.leftSingle}>
        <div className={styles.leftSingleText}>
          搜索结果无数据
        </div>
      </div>
    );
  }
  // 选中公司数据
  const companySelectData = ruleStore.companySelectData;
  const companySelectDom = [];
  if (companySelectData && companySelectData.length > 0) {
    companySelectData.map((obj, idx)=>{
      companySelectDom.push(
        <div
          key={`${idx}select`}
          className={styles.rightSingle}>
          <div className={styles.rightSingleText}>
            {obj.companyName}
          </div>
          <i
            onClick={ruleStore.cancelSelectCompany.bind(null, obj)}
            className={styles.close}></i>
        </div>
      );
    });
  }
  return (
    <div className={ruleStore.selectRange === 'company' ? styles.box : styles.hidden}>
      <div className={styles.left}>
        <div className={styles.title}>
          添加企业列表（可多选）
          <span className={ruleStore.submitType === true && ruleStore.companySelectData.length < 1 ? '' : styles.hidden}>应用企业必选</span>
        </div>
        <div className={styles.leftContent}>
          <div className={styles.searchWrap}>
            <i></i>
            <input
              onChange={ruleStore.changeCompanyName.bind(this)}
              onKeyUp={ruleStore.handleEnter.bind(this)}
              value={ruleStore.searchCompanyName}
              placeholder="输入企业名进行搜索" />
          </div>
          <div className={styles.leftList}>
            {companyListDom}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          已选择应用企业
        </div>
        <div className={styles.rightContent}>
          <div className={styles.rightList}>
            {companySelectDom}
          </div>
        </div>
      </div>
    </div>
  );
}

Company.propTypes = {
  ruleStore: PropTypes.object,
};
export default observer(Company);
