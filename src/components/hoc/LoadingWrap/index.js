import React from 'react';
import { observer } from 'mobx-react';
// import Spin from 'antd/lib/spin';
import styles from './index.less';
import {Wave} from 'better-react-spinkit';
import placeholder from 'imgs/placeholder.png';
function hoc({mapDataToProps}) {
  return (WrappedComponent) => {
    function LoadingWrap(props) {
      const loading = mapDataToProps(props).loading;
      return (
        loading ?
        <div className={styles.box}>
          <img src={placeholder} className={styles.img} />
          <div className={styles.loading}>
            <Wave />
          </div>
        </div> :
        <WrappedComponent {...props} />
      );
    }
    return observer(LoadingWrap);
  };
}
export default hoc;
