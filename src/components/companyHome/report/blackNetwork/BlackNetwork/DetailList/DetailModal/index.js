import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import {Row, Col} from 'components/common/layout';
import KeyValue from 'components/common/AlertCard/BaseModule/KeyValue';
import DICT from 'dict/reportModule';

function DetailModal({blackNetworkStore}) {
  const detailModalData = blackNetworkStore.detailModalData;
  console.log();
  return (
    <div className={`clearfix ${styles.box}`}>
      <Row>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.regDate} theValue={detailModalData.regDate} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.publishDate} theValue={detailModalData.publishDate} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.caseCode} theValue={detailModalData.caseCode} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.gistId} theValue={detailModalData.gistId} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.gistUnit} theValue={detailModalData.gistUnit} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.courtName} theValue={detailModalData.courtName} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.areaName} theValue={detailModalData.areaName} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.performance} theValue={detailModalData.performance} />
        </Col>
        <Col width="12">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.disruptTypeName} theValue={detailModalData.disruptTypeName} />
        </Col>
        <Col width="12">
          <KeyValue keyClass="greyKey" theKey={DICT.courtDishonesty.duty} theValue={detailModalData.duty} />
        </Col>
      </Row>
    </div>
  );
}

DetailModal.propTypes = {
  foo: PropTypes.string,
};
export default inject('blackNetworkStore')(observer(DetailModal));
