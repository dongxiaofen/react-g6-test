import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import noneDataImage from 'imgs/personCheck/personNoData.png';

function NoneData({}) {
  return (
    <div className={styles.noneData}>
      <img src={noneDataImage} alt="noneData" />
      <p>还没有核查结果，请添加核查</p>
    </div>
  );
}

NoneData.propTypes = {
  foo: PropTypes.string,
};
export default observer(NoneData);
