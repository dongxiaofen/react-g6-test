import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import AlterAnalysisTab from './AlterAnalysisTab';
import styles from './index.less';

function AlterAnalysis({alterAnalysis, isLoading}) {
  const data = {
    items: alterAnalysis,
    isLoading: isLoading,
    module: '变更分析',
    error: alterAnalysis.length === 0
  };
  return (
    <div className={styles.box}>
      <ModuleTitle module="变更分析" />
      <AlterAnalysisTab {...data} />
    </div>
  );
}

AlterAnalysis.propTypes = {
  alterAnalysis: PropTypes.object,
  isLoading: PropTypes.bool,
};
export default observer(AlterAnalysis);
