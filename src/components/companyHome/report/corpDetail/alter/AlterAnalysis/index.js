import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import AlterAnalysisTab from './AlterAnalysisTab';
import styles from './index.less';

function AlterAnalysis({alterAnalysis, isLoading, errText}) {
  const data = {
    items: alterAnalysis,
    isLoading: isLoading,
    module: errText ? errText : '变更分析',
    error: errText || alterAnalysis.length === 0 ? {message: errText} : false,
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
