import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function LegendBar({}) {
//   const swithLayout = () => {
//     switchLayout();
//   };
  return (
    <div className={styles.box}>
      {/* <a onClick={swithLayout}>切换</a> */}
      legend
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default observer(LegendBar);
