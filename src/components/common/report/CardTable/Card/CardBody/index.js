import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import config from 'dict/reportModule';

function CardBody({ meta, cData, isExpanded }) {
  const getValue = (item, value) => {
    let output = '';
    if (item.handleClick) {
      output = <span onClick={item.handleClick.bind(null, value, cData)} className={styles.valueClick}>{value}</span>;
    } else if (item.modifyText) {
      output = <span className={styles.value}>{item.modifyText(value)}</span>;
    } else if (item.modifyBlock) {
      output = <span className={styles.value}>{item.modifyBlock(cData)}</span>;
    } else {
      output = <span className={styles.value}>{value ? value : '--'}</span>;
    }
    return output;
  };

  const getCardBody = () => {
    const output = [];
    meta.body.map((item, idx) => {
      if (isExpanded || !item.hide) {
        output.push(
          <Col key={item.key + idx} width={item.width} className={styles.col} >
            <span className={styles.key}>{config[meta.dict][item.key]}: </span>
            {getValue(item, cData[item.key])}
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
  meta: PropTypes.object.isRequired,
  cData: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired
};
export default observer(CardBody);
