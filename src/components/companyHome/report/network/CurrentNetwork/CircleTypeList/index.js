import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import TypeList from './TypeList';
import Button from 'components/lib/button';

function CircleTypeList({ networkStore }) {
  return (
    <div className={styles.box}>
      <div className={styles.text}>
        <span className={styles.riskText}><i className={styles.blackPoint}></i>高风险企业</span>
        <span><i className={styles.greyPoint}></i>注销</span>
        <p className={styles.note}>*点击节点查看详细信息</p>
      </div>
      <hr className={styles.hr}/>
      <TypeList typeList={networkStore.typeList} toggleChecked={networkStore.toggleChecked} toggleCheckAll={networkStore.toggleCheckAll} />
      <Button btnType="primary" className={styles.button} onClick={networkStore.showRelation}>查看关系表</Button>
    </div>
  );
}

CircleTypeList.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore')(observer(CircleTypeList));
