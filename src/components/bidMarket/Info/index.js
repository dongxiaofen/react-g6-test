import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import { Row, Col } from 'components/common/layout';

import Content from './Content';
function Info({ areaInfo, infoLoading, params, getBidMarketDetail }) {
  return (
    <div>
      <Row>
        <Col>
          <h4 className={styles.infoTitle}>
            {params.province ? params.province : '全国'}招投标信息
            <span className={styles.infoTitleSub}>（最近部分信息）</span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Content
          areaInfo={areaInfo}
          infoLoading={infoLoading}
          getBidMarketDetail={getBidMarketDetail}/>
      </Row>
    </div>
  );
}

Info.propTypes = {
  areaInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  params: PropTypes.object,
  infoLoading: PropTypes.bool,
  getBidMarketDetail: PropTypes.func,
};
export default observer(Info);
