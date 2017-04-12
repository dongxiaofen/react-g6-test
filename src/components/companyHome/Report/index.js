import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { Container, Row, Col } from 'components/common/Layout';
import LeftBar from './LeftBar';
function Report({companyHomeStore}) {
  return (
    <div className={styles.contentWrap}>
      <Container id="reportContainer">
        <Row>
          <Col width="2">
            <LeftBar
              companyHomeStore={companyHomeStore}
              {...this.props.location.query} />
          </Col>
          <Col width="10">
            <div id="tabContentWrap" className={styles.tabContentWrap}>
              111
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Report.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(Report));
