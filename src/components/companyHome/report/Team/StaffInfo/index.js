import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import { Row, Col } from 'components/common/layout';

function RecruitmentInfo({ teamStore }) {
  console.log(teamStore);
  return (
    <div>
      <Row>
        <Col width="6">
          this is staff
        </Col>
        <Col width="6">
          this is staff
        </Col>
      </Row>
    </div>
  );
}

RecruitmentInfo.propTypes = {
  teamStore: PropTypes.object,
};
export default observer(RecruitmentInfo);
