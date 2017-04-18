import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Trow from './Trow';
import styles from './index.less';

function Tbody({meta, tData}) {
  return (
    <tbody className={styles.tbody}>
      {
        tData.map((rData, idx) => {
          return <Trow key={rData.shareholderName + idx} rData={rData} meta={meta} />;
        })
      }
    </tbody>
  );
}

Tbody.propTypes = {
  foo: PropTypes.string,
};
export default observer(Tbody);
