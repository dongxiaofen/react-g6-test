import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';

function Result({apiTestStore}) {
  return (
    <div className={styles.result}>
      <pre>
        {JSON.stringify(apiTestStore.testResult.data, null, 4)}
      </pre>
    </div>
  );
}

Result.propTypes = {
  apiTestStore: PropTypes.object,
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
})(inject('apiTestStore')(observer(Result)));
