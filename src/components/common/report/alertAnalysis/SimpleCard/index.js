import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import {Col, Row} from 'components/common/layout';
import DICT from 'dict/reportModule';

function SimpleCard({meta}) {
  const {item, body, dict} = meta;
  const createContent = ()=> {
    const output = [];
    body.forEach((config) => {
      let value = item[config.key];
      if (config.modifyBlock) {
        value = config.modifyBlock(item[config.key]);
      }
      value = value || '--';
      if (config.blockShow) {
        output.push(
          <Col key={config.key} width={config.width} className={styles.col}>
            <div className={styles.blockKey}>{DICT[dict][config.key]}：</div>
            <div className={styles.blockvalue}>{value}</div>
          </Col>
        );
      } else {
        output.push(
          <Col key={config.key} width={config.width} className={styles.col}>
            <span className={styles.key}>{DICT[dict][config.key]}：</span>
            <span className={styles.value}>{value}</span>
          </Col>
        );
      }
    });
    return output;
  };
  return (
    <Row>
      {createContent()}
    </Row>
  );
}

SimpleCard.propTypes = {
  foo: PropTypes.string,
};
export default observer(SimpleCard);
