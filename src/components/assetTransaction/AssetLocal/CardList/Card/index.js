import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { Col } from 'components/common/layout';

function Card({data, config, type}) {
  const keyConfig = {
    tradingAssets: {
      assetTotal: '成交价',
      creditorRightsNum: '债权数量',
      assignor: '转让方',
      assignee: '受让方',
      releaseDate: '成交时间'
    },
    saleAssets: {
      startPrice: '起估价',
      evaluatedPrice: '评估价',
      handledDepartment: '处置单位',
      auctionRounds: '拍卖轮次',
      'startDate/endDate': '竞价起止时间'
    },
    investAssets: {
      assetTotal: '成交价',
      creditorRightsNum: '债权数量',
      releaseDate: '发布时间',
      assignor: '转让方',
    }
  };
  const createContent = () => {
    const output = [];
    config.dataKey.map((item, idx) => {
      const content = item.handle ? item.handle(data.data[item.key], data) : data.data[item.key];
      output.push(
        <div key={idx} className={styles.col}>
          <div className={styles.key}>{keyConfig[type][item.key]}：</div>
          <div className={styles.content} title={content}>
            {content}
          </div>
        </div>
      );
    });
    return output;
  };

  const modifyDate = (dateKey, _data) => {
    const dateKeys = dateKey.split('/');
    const date = dateKeys[1] ? `${_data[dateKeys[0]]}~${_data[dateKeys[1]]}` : _data[dateKeys[0]];
    return date;
  };

  return (
    <Col width="6">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <span className={styles.type}>{data.type}</span>
          <span className={styles.line}>|</span>
          <span className={styles.title}>{data.data.title}</span>
        </div>
        <div className={`clearfix ${styles.cardContent}`}>
          {createContent()}
        </div>
        <div className={styles.separateLine}></div>
        <div className={`clearfix ${styles.footer}`}>
          <div className={styles.date}>
            <span>{keyConfig[type][config.dateKey]}：</span>
            <span>{modifyDate(config.dateKey, data.data)}</span>
          </div>
          <div
            className={styles.view}>
            <i className="fa fa-search"></i>
            <span>查看详情</span>
          </div>
        </div>
      </div>
    </Col>
  );
}

Card.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object,
  type: PropTypes.string,
};
export default observer(Card);
