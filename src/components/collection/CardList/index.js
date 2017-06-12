import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import styles from './index.less';
import Pager from 'components/common/Pager';
import { loadingComp } from 'components/hoc';

function CardList({ collectionStore, uiStore }) {
  const viewCompany = (id, productType) => {
    let url;
    switch (productType) {
      case 'REPORT':
        url = `/companyHome?reportId=${id}`;
        break;
      case 'MONITOR':
        url = `/companyHome?monitorId=${id}`;
        break;
      default:
        break;
    }
    browserHistory.push(url);
  };

  const cancelCollection = (companyName) => {
    collectionStore.cancelCollection(companyName);
  };

  const category = (productType) => {
    switch (productType) {
      case 'REPORT':
        return '查询报告';
      case 'MONITOR':
        return '监控报告';
      default:
        return 'system error';
    }
  };

  const collectionList = () => {
    return collectionStore.resultContent.map((item, key) => {
      const id = item.id;
      const productType = item.productType;
      return (
        <div className={`clearfix ${styles.item}`} key={`collectionKey${key}`}>
          <div className={`clearfix ${styles.baseInfo}`}>
            <div className={styles.nameWrap}>
              <span className={styles.name}
                    onClick={viewCompany.bind(null, id, productType)}>
                {item.companyName}
              </span>
              <span className={styles.category}>{category(item.productType)}</span>
            </div>
            <div className={styles.infoDetail}>
              <span className={styles.detailItem}>{`法人：${item.frName ? item.frName : '无'}`}</span>
              <span
                className={styles.detailItem}
                title={item.address ? item.address : '无'}>
                {`地址：${item.address ? item.address : '无'}`}
              </span>
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
            <div className={styles.dateItem}>
              <div className={styles.timeValue}>{item.latestDt}</div>
              <div className={styles.timeKey}>最近更新日期</div>
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
          type="large" />
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
