import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Loading from './Loading';
import Result from './Result';

function RiskFeaturesResult({riskFeaturesStore}) {
  return (
    <div className={styles.box}>
      {riskFeaturesStore.riskLoading ? <Loading /> : <Result data={riskFeaturesStore} />}
    </div>
  );
}

RiskFeaturesResult.propTypes = {
  riskFeaturesStore: PropTypes.object,
};
export default observer(RiskFeaturesResult);
