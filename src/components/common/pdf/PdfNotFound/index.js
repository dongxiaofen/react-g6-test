import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function PdfNotFound({}) {
  return (
    <div>

    </div>
  );
}

PdfNotFound.propTypes = {
  foo: PropTypes.string,
};
export default observer(PdfNotFound);
