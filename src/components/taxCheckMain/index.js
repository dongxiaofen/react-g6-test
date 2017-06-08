import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import TaxCheckList from './TaxCheckList';

function TaxCheckMain({}) {
  return (
    <div className={styles.box}>
      <TaxCheckList />
    </div>
  );
}

TaxCheckMain.propTypes = {
  foo: PropTypes.string,
};
export default observer(TaxCheckMain);
