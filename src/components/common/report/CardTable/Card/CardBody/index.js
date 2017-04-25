import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import config from 'dict/reportModule';

function CardBody({ meta, cData, isExpanded }) {
  const getCardBody = () => {
    const output = [];
    meta.body.map((item, idx) => {
      if (isExpanded || !item.hide) {
        output.push(
          <Col key={item.key + idx} width={item.width} className={styles.col} >
            <span className={styles.key}>{config[meta.dict][item.key]}: </span>
            <span className={styles.value}>{cData[item.key]}</span>
          </Col>
        );
      }
    });
    return output;
  };
  return (
    <Row>
      {getCardBody()}
    </Row>
  );
}

CardBody.propTypes = {
  foo: PropTypes.string,
};
export default observer(CardBody);
