import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { ModuleTitle } from 'components/common/report';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function AlterAnalysis({alterAnalysis}) {
  const alterArray = [];
  if (alterAnalysis && alterAnalysis.length > 0) {
    alterAnalysis.map((obj)=>{
      alterArray.push(
        <span key={obj.name}>{obj.name}</span>
      );
    });
  }
  return (
    <div className={styles.box}>
      <ModuleTitle module="变更分析" />
      {alterArray}
    </div>
  );
}

AlterAnalysis.propTypes = {
  foo: PropTypes.string,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: props.module
  })
})(observer(AlterAnalysis));
// export default observer(AlterAnalysis);
