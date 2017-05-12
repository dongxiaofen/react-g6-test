import React from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
function AddTr({data, index, addRelationStore}) {
  const cssName = data.status === 'MONITOR' ? styles.newCreateBtn : styles.disableBtn;
  const title = data.status === 'MONITOR' ? '' : '只有监控中的企业才能新增关联监控';
  const addRelation = () => {
    if (data.status === 'MONITOR') {
      addRelationStore.changeParams({monitorId: data.monitorId});
      addRelationStore.changeParams({index});
    }
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
export default inject('addRelationStore')(observer(AddTr));
