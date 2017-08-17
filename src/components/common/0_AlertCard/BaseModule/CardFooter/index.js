import React from 'react';
import { observer } from 'mobx-react';
import styles from '../index.less';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
function CardFooter({data, show, loading, type, viewFunc, viewDetCallback, btnText, modifyDate}) {
  const createLoading = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <AnimateLoading animateCategory={1}/>
        </div>
      );
    }
    return <span>{btnText}</span>;
  };
  const createViewBtn = ()=> {
    const viewText = show ? '收起' : '展开';
    switch (type) {
      case 'double':
        return (
          <div>
            <div className={styles.viewBtn} onClick={viewFunc}>
              <span>{viewText}</span>
            </div>
            {
              show ?
              <div className={`${styles.viewBtn} ${styles.detail}`} onClick={viewDetCallback.bind(null, data.items)}>
                {createLoading()}
              </div>
              : ''
            }
          </div>);
      case 'detail':
        return (
          <div className={`${styles.viewBtn} ${styles.detail}`} onClick={viewDetCallback.bind(null, data.items)}>
            {
              loading ? <div className={styles.loading}><AnimateLoading animateCategory={1}/></div> : <span>{btnText}</span>
            }
          </div>);
      case 'none':
        return <span></span>;
      default:
        return (
          <div className={styles.viewBtn} onClick={viewFunc}>
            <span>{viewText}</span>
          </div>
        );
    }
  };
  return (
    <div className={`${styles.footer} clearfix`}>
      <div className={styles.date}>
        <span>{data.date.label}：</span>{modifyDate(data.date.value)}
      </div>
      {createViewBtn()}
    </div>
  );
}
export default observer(CardFooter);
