import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function PdfNotFound({info = '暂无信息'}) {
  return (
    <div className={styles.wrap}>
      {info}
    </div>
  );
}

PdfNotFound.propTypes = {
  info: PropTypes.string,
};
export default observer(PdfNotFound);
