import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function Result({interfaceTestStore}) {
  return (
    <div className={styles.result}>
      <pre>
        {JSON.stringify(interfaceTestStore.testResult.data, null, 4)}
      </pre>
    </div>
  );
}

Result.propTypes = {
  interfaceTestStore: PropTypes.object,
};

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 0,
    height: 130
  }),
})(inject('interfaceTestStore')(observer(Result)));
