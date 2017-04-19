import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Trow from './Trow';
import styles from './index.less';

function Tbody({meta, tData}) {
  return (
    <tbody className={styles.tbody}>
      {
        tData.map((rData, idx) => {
          return <Trow key={rData[meta[0].key] + idx} rData={rData} meta={meta} />;
        })
      }
    </tbody>
  );
}

Tbody.propTypes = {
  meta: PropTypes.array.isRequired,
  tData: PropTypes.object.isRequired
};
export default observer(Tbody);
