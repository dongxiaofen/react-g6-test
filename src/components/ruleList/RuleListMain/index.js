import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Container, Row, Col} from 'components/common/layout';
import RuleAdd from '../RuleAdd';
// import styles from './index.less';

function RuleListMain({}) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <RuleAdd />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RuleListMain.propTypes = {
  foo: PropTypes.string,
};
export default observer(RuleListMain);
