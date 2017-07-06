import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import {Row, Col} from 'components/common/layout';
import styles from './index.less';
import CompanyName from './CompanyName';
import ReportType from './ReportType';
import Time from './Time';
import Numbers from './Numbers';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';

function CompanyList({ruleCompanyStore, uiStore}) {
  const {companyList} = ruleCompanyStore;
  const list = [];
  if (companyList && companyList.length > 0) {
    companyList.map((obj, idx)=>{
      list.push(
        <div key={`${idx}list`} className={styles.single}>
          <Row>
            <Col width="7">
              <CompanyName data={obj} />
              <ReportType data={obj} />
            </Col>
            <Col width="2">
              <Time data={obj} />
            </Col>
            <Col width="2">
              <Numbers data={obj} />
            </Col>
            <Col width="1">
              <span className={styles.null}>data</span>
            </Col>
          </Row>
        </div>
      );
    });
  }
  return (
    <div className={styles.box}>
      {list}
      <div className={styles.page}>
        <Pager tData={companyList} module="ruleCompanyListPager"
               uiStore={uiStore} type="large"/>
      </div>
    </div>
  );
}

CompanyList.propTypes = {
  ruleCompanyStore: PropTypes.object,
  uiStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.ruleCompanyStore.loading === true ? true : false,
    imgCategory: 14,
    category: 2,
    module: '企业预警列表',
    errCategory: 2,
    error: props.ruleCompanyStore.companyList.length === 0,
  }),
})(observer(CompanyList));