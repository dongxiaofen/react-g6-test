import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { Row, Col } from 'components/common/layout';
import config from 'dict/reportModule';

function CardBody({ meta, cData, isExpanded }) {
  const getValue = (item, value) => {
    let output = '';
    if (item.modifyText) {
      output = item.modifyText(value);
    } else if (item.modifyBlock) {
      output = item.modifyBlock(cData);
    } else {
      output = value ? value : '--';
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
            <span className={styles.value}>{getValue(item, cData[item.key])}</span>
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
