import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Loading from './Loading';
import Result from './Result';

function RiskFeaturesResult({reportAxisStore}) {
  return (
    <div className={styles.box}>
      {reportAxisStore.riskLoading ? <Loading /> : <Result data={reportAxisStore} />}
      {/* {reportAxisStore.riskLoading ? <Loading /> : <Loading />} */}
    </div>
  );
}

RiskFeaturesResult.propTypes = {
  reportAxisStore: PropTypes.object,
};
export default observer(RiskFeaturesResult);
