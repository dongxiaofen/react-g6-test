import React, {PropTypes} from 'react';
import styles from './index.less';
import pdfHocTitle from '../PdfHocTitle';


function PdfTitle({ module, subModule}) {
  return (
    <div className={styles.wrap}>
      <span className={styles.module}>{module}</span>
      <span className={styles.moduleArrow}></span>
      <span className={styles.subModule}>{subModule}</span>
    </div>
  );
}

PdfTitle.propTypes = {
  module: PropTypes.string,
  subModule: PropTypes.string,
};

export default pdfHocTitle({
  pdfTitleProps: props => ({
    module: props.module,
    subModule: props.subModule,
    pdfModule: props.pdfModule,
    whetherFn: props.whetherFn,
    whetherKeysArray: props.whetherKeysArray
  })
})(PdfTitle);
