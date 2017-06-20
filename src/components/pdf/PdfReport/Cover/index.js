import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';


function Cover({clientStore, pdfStore}) {
  return (
    <div className={styles.cover}>
      <div className={`${clientStore.envConfig === 'cfca_prod' ? styles.cfca : styles.logo_sc}`}></div>
      <h1>{pdfStore.reportType}</h1>
      <h2>{pdfStore.companyName}</h2>
    </div>
  );
}

Cover.propTypes = {
  foo: PropTypes.string,
};
export default inject('clientStore', 'pdfStore')(observer(Cover));
