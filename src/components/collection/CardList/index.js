import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import styles from './index.less';
import Pager from 'components/common/Pager';
import LinkJump from 'components/common/LinkJump';
import {loadingComp} from 'components/hoc';

function CardList({collectionStore, uiStore}) {
  const cancelCollection = (companyName) => {
    collectionStore.cancelCollection(companyName);
  };
  const handleRegCap = (items) => {
    if (items.capital === '0.0' || items.capital === '0' || items.capital === '' || items.capital === undefined || items.capital < 0.005) {
      return '--';
    }
    return Number(items.capital).toFixed(2) + '万';
  };
  const collectionList = () => {
    return collectionStore.resultContent.map((item, key) => {
      return (
        <div className={`clearfix ${styles.item}`} key={`collectionKey${key}`}>
          <div className={`clearfix ${styles.baseInfo}`}>
            <div className={styles.nameWrap}>
              <LinkJump name={item.companyName} label="公司名称" className={styles.name}>{item.companyName}</LinkJump>
            </div>
            <div className={styles.infoDetail}>
              <span className={styles.detailItem}>{`企业状态：${item.companyStatus ? item.companyStatus : '无'}`}</span>
              <span className={styles.detailItem}>{`法人代表：${item.frName ? item.frName : '无'}`}</span>
              <span className={styles.detailItem}>{`注册资本：${item.capital ? handleRegCap(item) : '无'}`}</span>
              <span className={styles.detailItem}>{`成立日期：${item.regDt ? item.regDt : '无'}`}</span>
            </div>
          </div>
          <div className={styles.cancelBtn}
               onClick={cancelCollection.bind(null, item.companyName)}>
            取消收藏
          </div>
          <div className={`clearfix ${styles.lastModifiedTs}`}>
            <div className={styles.dateItem}>
              <div className={styles.timeValue}>{item.collectionDt}</div>
              <div className={styles.timeKey}>收藏日期</div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="clearfix">
      <div className={styles.cardList}>
        {collectionList()}
      </div>
      <div className={styles.pager}>
        <Pager
          tData={collectionStore.resultContent}
          module="collection"
          uiStore={uiStore}
          type="large"/>
      </div>
    </div>
  );
}

CardList.propTypes = {
  collectionStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.collectionStore.isLoading,
    imgCategory: 14,
    category: 2,
    errCategory: 2,
    module: '收藏列表',
    error: props.collectionStore.resultContent.length === 0,
  })
})(observer(CardList));
