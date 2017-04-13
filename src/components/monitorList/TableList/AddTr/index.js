import React from 'react';
import styles from './index.less';
function AddTr({data}) {
  const cssName = data.status ? styles.newCreateBtn : styles.disableBtn;
  const title = data.status ? '' : '只有监控中的企业才能新增关联监控';
  const addRelation = () => {
    console.log('---');
  };
  return (
    <div className={styles.wrapper}>
      <div
        className={cssName}
        title={title}
        onClick={addRelation}
        >
        <i className="fa fa-plus"></i>新增关联监控
      </div>
    </div>
  );
}
export default AddTr;
