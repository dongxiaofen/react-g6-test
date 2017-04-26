import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';

import { Row, Col } from 'components/common/layout';
import { loadingComp } from 'components/hoc';

import Detail from './Detail';
import Calendar from './Calendar';
function SiteAndJob({ siteAndJob, setSiteAndJob, setSiteAndJobYear }) {
  console.log(siteAndJob, '--------siteAndJob');
  return (
    <div>
      <Row>
        <Col width="8">
          <Detail siteAndJob={siteAndJob} />
        </Col>
        <Col width="4">
          <Calendar
            siteAndJob={siteAndJob}
            setSiteAndJob={setSiteAndJob}
            setSiteAndJobYear={setSiteAndJobYear} />
        </Col>
      </Row>
    </div>
  );
}

SiteAndJob.propTypes = {
  siteAndJob: PropTypes.object,
  setSiteAndJob: PropTypes.func,
  setSiteAndJobYear: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    module: '新增招聘地点/岗位',
    error: props.isEmptyObject(props.siteAndJob.data)
  })
})(observer(SiteAndJob));
