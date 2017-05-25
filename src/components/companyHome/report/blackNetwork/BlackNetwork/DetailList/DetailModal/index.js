import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import {Row, Col} from 'components/common/layout';
import KeyValue from 'components/common/AlertCard/BaseModule/KeyValue';
import DICT from 'dict/reportModule';

function DetailModal({blackNetworkStore}) {
  const detailModalData = blackNetworkStore.detailModalData;
  return (
    <div className={`clearfix ${styles.box}`}>
      <Row>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.regDate} theValue={detailModalData.regDate} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.publishDate} theValue={detailModalData.publishDate} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.caseCode} theValue={detailModalData.caseCode} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.gistId} theValue={detailModalData.gistId} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.gistUnit} theValue={detailModalData.gistUnit} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.courtName} theValue={detailModalData.courtName} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.areaName} theValue={detailModalData.areaName} />
        </Col>
        <Col width="6">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.performance} theValue={detailModalData.performance} />
        </Col>
        <Col width="12">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.disruptTypeName} theValue={detailModalData.disruptTypeName} />
        </Col>
        <Col width="12">
          <KeyValue keyClass="greyKey" theKey={DICT.dishonestyList.duty} theValue={detailModalData.duty} />
        </Col>
      </Row>
    </div>
  );
}

DetailModal.propTypes = {
  foo: PropTypes.string,
};
export default inject('blackNetworkStore')(observer(DetailModal));
