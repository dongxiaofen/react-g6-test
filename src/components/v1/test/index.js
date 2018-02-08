import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import TestInfo from './testInfo';
import TestDetail from './testDetail';
import Result from './result';
import ContBox from './contBox';
import FilterCont from './filter';
// import Button from 'components/lib/button';
import styles from './index.less';

function TestBody({interfaceTestStore, pageType}) {
  const infoData = {
    loading: interfaceTestStore.interfaceInfo.data === undefined,
    error: interfaceTestStore.interfaceInfo.error,
  };
  const resultData = {
    loading: interfaceTestStore.isResultLoading,
    error: interfaceTestStore.testResult.error
  };
  return (
    <div>
      <div className={styles['info-cont']}>
        {pageType === 'all' ?
          <FilterCont /> : null}
        <TestInfo data={infoData} pageType={pageType} />
      </div>
      <div className={styles.result}>
        <TestDetail data={infoData}/>
        <ContBox title="返回结果">
          <Result data={resultData}/>
        </ContBox>
      </div>
    </div>
  );
}

TestBody.propTypes = {
  interfaceTestStore: PropTypes.object,
};
export default inject('interfaceTestStore')(observer(TestBody));