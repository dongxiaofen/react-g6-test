import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { loadingComp } from 'components/hoc';

function Content({ type, detail }) {
  const detailData = detail.data;
  const transactionTotal = Number(detailData.transactionTotal); // 交易资产总额
  const transactionSum = Number(detailData.transactionSum); // 交易笔数
  const auctionTotal = Number(detailData.auctionTotal); // 拍卖资产总额
  const auctionSum = Number(detailData.auctionSum); // 拍卖笔数

  const details = [];
  const transactionTotalItem = (
    <li className={ type ? styles.infoWrapDiv2 : styles.infoWrapDiv } key="detailItem0">
      <span>交易资产总额</span>
      <div className={styles.infoCircle}>
        <b>{(transactionTotal / 10000).toFixed(2)}万</b>
        <div>
          {
            transactionTotal
              ? `全国排名${detailData.transactionTotalRanking}`
              : '暂无排名'
          }
        </div>
      </div>
    </li>
  );
  const transactionSumItem = (
    <li className={ type ? styles.infoWrapDiv2 : styles.infoWrapDiv } key="detailItem1">
      <span>交易笔数</span>
      <div className={styles.infoCircle}>
        <b>{transactionSum}笔</b>
        <div>
          {
            transactionSum
              ? `全国排名${detailData.transactionSumRanking}`
              : '暂无排名'
          }
        </div>
      </div>
    </li>
  );
  const auctionTotalItem = (
    <li className={styles.infoWrapDiv} key="detailItem2">
      <span>拍卖资产总额</span>
      <div className={styles.infoCircle}>
        <b>{(auctionTotal / 10000).toFixed(2)}万</b>
        <div>
          {
            auctionTotal
              ? `全国排名${detailData.auctionTotalRanking}`
              : '暂无排名'
          }
        </div>
      </div>
    </li>
  );
  const auctionSumItem = (
    <li className={styles.infoWrapDiv} key="detailItem3">
      <span>拍卖笔数</span>
      <div className={styles.infoCircle}>
        <b>{auctionSum}笔</b>
        <div>
          {
            auctionSum
              ? `全国排名${detailData.auctionSumRanking}`
              : '暂无排名'
          }
        </div>
      </div>
    </li>
  );
  if (!type) {
    details.push(transactionTotalItem);
    details.push(transactionSumItem);
    details.push(auctionTotalItem);
    details.push(auctionSumItem);
  } else {
    details.push(transactionTotalItem);
    details.push(transactionSumItem);
  }
  return (
    <ul className={`clearfix ${styles.infoWrap}`}>
      {details}
    </ul>
  );
}

Content.propTypes = {
  loading: PropTypes.bool,
  type: PropTypes.string,
  detail: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => {
    const detailData = props.detail.data;
    const transactionTotal = Number(detailData.transactionTotal); // 交易资产总额
    const transactionSum = Number(detailData.transactionSum); // 交易笔数
    const auctionTotal = Number(detailData.auctionTotal); // 拍卖资产总额
    const auctionSum = Number(detailData.auctionSum); // 拍卖笔数
    const type = props.type;
    let error;
    if (type) {
      error = !transactionTotal && !transactionSum && !auctionTotal && !auctionSum;
    } else {
      error = !transactionTotal && !transactionSum;
    }
    return {
      loading: props.loading,
      category: 0,
      height: 189,
      error: error,
      errCategory: 1,
    };
  }
})(observer(Content));
