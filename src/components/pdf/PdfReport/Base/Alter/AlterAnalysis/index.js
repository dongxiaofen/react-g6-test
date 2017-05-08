import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import PdfNotFound from 'components/common/pdf/PdfNotFound';
import SecondTitle from 'components/common/pdf/SecondTitle';

function AlterAnalysis({moduleData}) {
  if (moduleData === null || moduleData.length === 0) {
    return (
      <div>
        <SecondTitle module="变更分析"/>
        <PdfNotFound />
      </div>
    );
  }
  const data = [];
  moduleData.map((obj, index)=> {
    data.push(
      <div key={`${index}alterAnalysis`} className={styles.single} id={index}>
          <span className={styles.name}>
            {obj.name.replace(':', '') + ':'}&nbsp;
          </span>
        <span className={styles.value}>
            {obj.value}
          </span>
      </div>
    );
  });
  return (
    <div>
      <SecondTitle module="变更分析" />
      <div className={styles.wrap}>
        {data}
      </div>
    </div>
  );
}

AlterAnalysis.propTypes = {
  moduleData: PropTypes.object,
};
export default observer(AlterAnalysis);
