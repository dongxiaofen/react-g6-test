import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import styles from './index.less';
// import noneDataImage from 'imgs/tax/noData.png';
import noneDataImageStop from 'imgs/tax/tax_check_example.png';

function NoneData({}) {
  return (
    <div className={styles.none_dataImage_Stop}>
      <img src={noneDataImageStop} alt="noneDataImage_Stop"/>
    </div>
  );
  // return (
  //   <div className={styles.noneData}>
  //     <img src={noneDataImage} alt="noneData" />
  //     <p>尚未进行企业经营核查，请添加</p>
  //   </div>
  // );
}

NoneData.propTypes = {
  foo: PropTypes.string,
};
export default inject('taxCheckStore')(observer(NoneData));
