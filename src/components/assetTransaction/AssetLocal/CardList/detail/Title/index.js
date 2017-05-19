import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import assetLocalConfig from 'helpers/assetLocalConfig';

function Title({ assetTransactionStore }) {
  const modifyMoney = (value) => {
    return `${(value / 10000).toFixed(2)}万元`;
  };
  const modifyRightNum = (value) => {
    return `${value}笔`;
  };
  const modifyDate = (dateKey, data) => {
    const dateKeys = dateKey.split('/');
    const date = dateKeys[1] ? `${data[dateKeys[0]]}~${data[dateKeys[1]]}` : data[dateKeys[0]];
    return date;
  };
  const createContent = (assetConfig, data, type) => {
    const output = [];
    assetConfig.dataKey.forEach((item, idx) => {
      output.push(
        <div key={idx} className={styles.col}>
          <span className={styles.text}>{assetLocalConfig[type][item.key]}：</span>
          <span className={styles.text}>{item.handle ? item.handle(data[item.key], data) : data[item.key]}</span>
        </div>
      );
    });
    return output;
  };
  const assetType = {
    '交易资产': 'tradingAssets',
    '招商资产': 'investAssets',
    '拍卖资产': 'saleAssets'
  };
  const keyConfig = {
    'tradingAssets': {
      dataKey: [
        { key: 'assetTotal', handle: modifyMoney },
        { key: 'creditorRightsNum', handle: modifyRightNum },
        { key: 'assignor' },
        { key: 'assignee' },
      ],
      dateKey: 'releaseDate'
    },
    'saleAssets': {
      dataKey: [
        { key: 'startPrice', handle: modifyMoney },
        { key: 'evaluatedPrice', handle: modifyMoney },
        { key: 'handledDepartment' },
        { key: 'auctionRounds' },
      ],
      dateKey: 'startDate/endDate'
    },
    'investAssets': {
      dataKey: [
        { key: 'assetTotal', handle: modifyMoney },
        { key: 'creditorRightsNum', handle: modifyRightNum },
        { key: 'assignor' },
      ],
      dateKey: 'releaseDate'
    }
  };
  const assetLocalDetail = assetTransactionStore.assetLocalDetail;
  const type = assetType[assetLocalDetail.type];
  const assetConfig = keyConfig[type];
  return (
    <div className={`${styles.wrap}`}>
      <div className={`clearfix ${styles.header}`}>
        <div className={styles.titleInfo}>
          <span className={styles.type}>{assetLocalDetail.type}</span>
          <span className={styles.line}>|</span>
          <span className={styles.title}>{assetLocalDetail.title}</span>
        </div>
        <div className={styles.date}>
          <div className={styles.date}>
            <span>{assetLocalConfig[type][assetConfig.dateKey]}：</span>
            <span>{modifyDate(assetConfig.dateKey, assetLocalDetail)}</span>
          </div>
        </div>
      </div>
      <div className="clearfix">
        {createContent(assetConfig, assetLocalDetail, type)}
      </div>
    </div>
  );
}

Title.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(Title));
