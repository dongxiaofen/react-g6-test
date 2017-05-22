import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function Assess({ assetTransactionStore }) {
  const detail = assetTransactionStore.distributionDetail;
  // const distributionStaticKey = assetTransactionStore.distributionStaticKey;
  const detailData = detail.data;
  const asset80Focus = detail.asset80Focus ? (detail.asset80Focus * 100).toFixed(2) : 0;
  const transactionTotal = Number(detailData.transactionTotal); // 交易资产总额
  const transactionSum = Number(detailData.transactionSum); // 交易笔数
  const auctionTotal = Number(detailData.auctionTotal); // 拍卖资产总额
  const auctionSum = Number(detailData.auctionSum); // 拍卖笔数
  // const details = [];
  const transactionTotalItem = (
    <li className={styles.infoWrapDiv} key="detailItem0">
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
    <li className={styles.infoWrapDiv} key="detailItem1">
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
  return (
    <div className={`clearfix ${styles.wrap}`}>
      <div className={styles.info}>
        <div>
          {detail.region}地区交易评估：
          <span>
            {detail.region} 80% 的资金交易金额，主要集中在前 {asset80Focus}% 笔的交易中。
          </span>
        </div>
      </div>
      <ul className={`clearfix ${styles.infoWrap}`}>
        {transactionTotalItem}
        {transactionSumItem}
        {auctionTotalItem}
        {auctionSumItem}
      </ul>
    </div>
  );
}

Assess.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Assess));
