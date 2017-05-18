import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { Col } from 'components/common/layout';
import assetLocalConfig from 'helpers/assetLocalConfig';

function Card({ data, config, type, viewDetail }) {
  const createContent = () => {
    const output = [];
    config.dataKey.map((item, idx) => {
      const content = item.handle ? item.handle(data.data[item.key], data) : data.data[item.key];
      output.push(
        <div key={idx} className={styles.col}>
          <div className={styles.key}>{assetLocalConfig[type][item.key]}：</div>
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
            <span>{assetLocalConfig[type][config.dateKey]}：</span>
            <span>{modifyDate(config.dateKey, data.data)}</span>
          </div>
          <div
            className={styles.view}
            onClick={viewDetail.bind(this, data)}>
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
  viewDetail: PropTypes.func,
};
export default observer(Card);
