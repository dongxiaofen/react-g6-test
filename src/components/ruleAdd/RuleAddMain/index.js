import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleName from '../RuleName';
import styles from './index.less';

function RuleAddMain({searchCompanyStore}) {
  const {name} = searchCompanyStore;
  return (
    <div className={styles.box}>
      <Container>
        <Row>
          <Col>
            <RuleName name={name} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RuleAddMain.propTypes = {
  ruleStore: PropTypes.object,
};
export default inject('ruleStore')(observer(RuleAddMain));
