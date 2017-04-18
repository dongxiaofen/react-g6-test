import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import styles from './index.less';
import Row from 'components/common/layout/Row';
import Col from 'components/common/layout/Col';

function ChangeTrend({ changeTrend }) {
  return (
    <Row>
      <Col>
      
      </Col>
    </Row>
  );
}

ChangeTrend.propTypes = {
  changeTrend: PropTypes.object,
};
export default observer(ChangeTrend);
