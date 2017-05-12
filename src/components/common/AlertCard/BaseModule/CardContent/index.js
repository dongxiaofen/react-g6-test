import React from 'react';
import { observer } from 'mobx-react';
import styles from '../index.less';
import {Col, Row} from 'components/common/layout';
import KeyValue from '../KeyValue';
import DICT from 'dict/reportModule';
function CardContent({data, show, contentHtml, isModal}) {
  const content = ()=>{
    const output = [];
    const config = isModal || show ? data.viewConfig : data.hideConfig;
    config.forEach((item, idx) => {
      let value = data.items.content[item.key];
      if (item.handleBlock) {
        value = item.handleBlock(data.items);
      } else if (item.handle) {
        value = item.handle(data.items.content[item.key]);
      }
      output.push(
        <Col key={idx} width={item.width} className={styles.col}>
          <KeyValue
            theKey={DICT[data.dict][item.key]}
            theValue={value} />
        </Col>
      );
    });
    return output;
  };
  return (
    <div className={styles.content}>
      <Row className={styles.row}>
        {content()}
      </Row>
      <Row>
        {show && contentHtml && contentHtml()}
      </Row>
    </div>
  );
}
export default observer(CardContent);
