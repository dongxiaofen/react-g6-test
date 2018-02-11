import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import Button from 'components/lib/button';
// import appliedPic from 'imgs/interface/apply.png';
import styles from './index.less';

const ListItem = ({data, routing}) => {
  const gotoDocPage = () => {
    // console.log('gotoDocPage');
    routing.push({
      pathname: '/v2/detail',
      query: {id: data.id, name: data.name, c1Name: data.classification}
    });
  };
  return (
    <div className={styles['list-item']}>
      <div className={data.applied > 0 ? styles.applied : styles.unapplied}>
        <div className={styles.imgIcon}></div>
        {/*<img src={appliedPic} alt=""/>*/}
        <span>{`${data.applied > 0 ? '已' : '未'}申请`}</span>
      </div>
      <div className={styles['left-cont']}>
        <h3 className={styles.name} onClick={gotoDocPage}>{data.name}</h3>
        <div className={styles.discript} title={data.description}>{data.description}</div>
        <div className={styles.classify}>分类: {data.classification}</div>
      </div>
      <div className={styles['right-btn']}>
        <Button btnType="primary" className={styles.vsbtn} onClick={gotoDocPage}>查看文档</Button>
      </div>
    </div>
  );
};
ListItem.propTypes = {
  data: PropTypes.object,
  // uiStore: PropTypes.object,
};
export default inject('routing')(observer(ListItem));
