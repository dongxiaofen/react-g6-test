import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import TestInfo from './testInfo';
// import TestDetail from './testDetail';
import Result from './result';
import ContBox from './contBox';
import FilterCont from './filter';
// import Button from 'components/lib/button';
import styles from './index.less';

function TestBody({apiTestStore}) {
  const infoData = {
    loading: apiTestStore.isInfoLoading,
    error: apiTestStore.apiInfo.error,
  };
  const resultData = {
    loading: apiTestStore.isResultLoading,
    error: apiTestStore.testResult.error
  };
  return (
    <div>
      <div className={styles['info-cont']}>
        <FilterCont />
         <TestInfo data={infoData} />
      </div>
      <div className={styles.result}>
        {/* <TestDetail data={infoData}/> */}
        <ContBox title="返回结果">
          <Result data={resultData}/>
        </ContBox>
      </div>
    </div>
  );
}

TestBody.propTypes = {
  apiTestStore: PropTypes.object,
};
export default inject('apiTestStore')(observer(TestBody));
