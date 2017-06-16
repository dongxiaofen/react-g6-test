import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import noneDataImage from 'imgs/personCheck/personNoData.png';

function NoneData({}) {
  return (
    <div className={styles.noneData}>
      <img src={noneDataImage} alt="noneData" />
      <p>尚未进行个人黑名单核查，请添加</p>
    </div>
  );
}

NoneData.propTypes = {
  foo: PropTypes.string,
};
export default observer(NoneData);
