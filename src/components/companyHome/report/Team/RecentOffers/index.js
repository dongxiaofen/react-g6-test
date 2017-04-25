import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import { Row, Col } from 'components/common/layout';

function RecentOffers({ recentRecruitment }) {
  console.log(recentRecruitment);
  return (
    <div>
      <Row>
        <Col width="6">
          this is staff
        </Col>
        <Col width="3">
          this is staff
        </Col>
        <Col width="3">
          this is staff
        </Col>
      </Row>
    </div>
  );
}

RecentOffers.propTypes = {
  teamStore: PropTypes.object,
};
export default observer(RecentOffers);
