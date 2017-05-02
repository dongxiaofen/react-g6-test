import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import Banner from './Banner';
import PersonBlackList from './PersonBlackList';
import styles from './index.less';

function PersonReportBody({routing, personReportStore}) {
  return (
    <Container>
      <Row>
        <Col width="12">
              <Banner personReportStore={personReportStore} routing={routing} />
        </Col>
      </Row>
      <Row className={styles.marginTop20}>
        <Col width="12">
          <div className={`clearfix ${styles.wrap}`}>
            <div className={styles.boxItem}>
              <PersonBlackList personBlacklist={personReportStore.blacklistData} isLoading={personReportStore.isLoading} />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

PersonReportBody.propTypes = {
  routing: PropTypes.object,
  personReportStore: PropTypes.object,
};
export default observer(PersonReportBody);
