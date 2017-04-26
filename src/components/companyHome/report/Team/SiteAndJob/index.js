import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import { Row, Col } from 'components/common/layout';
import { loadingComp } from 'components/hoc';

import Detail from './Detail';
import Calendar from './Calendar';
function SiteAndJob({}) {
  return (
    <div>
      <Row>
        <Col width="8">
          <Detail />
        </Col>
        <Col width="4">
          <Calendar />
        </Col>
      </Row>
    </div>
  );
}

SiteAndJob.propTypes = {
  salaryAvgTrend: PropTypes.object,
  leaveTrend: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: () => ({
    loading: false,
    module: '新增招聘地点/岗位',
    error: false
  })
})(observer(SiteAndJob));
