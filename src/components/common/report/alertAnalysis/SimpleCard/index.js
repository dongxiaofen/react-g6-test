import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import {Col, Row} from 'components/common/layout';
import DICT from 'dict/reportModule';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';

function SimpleCard({meta, dataStore}) {
  const {item, body, dict} = meta;
  const createContent = ()=> {
    const output = [];
    if (!item) {
      return output;
    }
    body.forEach((config) => {
      let value = item[config.key];
      if (config.modifyBlock) {
        value = config.modifyBlock(item[config.key]);
      }
      if (config.keyType === 'detail' && dataStore) {
        if (!dataStore.detailData.html) {
          value = <AnimateLoading />;
        } else if (dataStore.detailData.html !== '--') {
          value = <div className={styles.htmlBox} dangerouslySetInnerHTML={{__html: dataStore.detailData.html}} ></div>;
        }
      } else if (config.keyType === 'date') {
        if (value) {
          value = value.slice(0, 10);
        }
      }
      value = value && value.toString().trim() || '--';
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
export default inject('alertAnalysisStore')(observer(SimpleCard));
