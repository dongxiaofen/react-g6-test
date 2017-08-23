import React, {PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import { loadingComp } from 'components/hoc';
import {shieldInfo} from 'helpers/infoShield';
import { runInAction } from 'mobx';
import openPic from 'imgs/open.png';
import styles from './index.less';

function SafeCont({accountStore}) {
  const handleKeyShow = (idx) => {
    const isOpen = !!accountStore.safeDataOpen[idx];
    runInAction('open-close', () => {
      accountStore.safeDataOpen[idx] = !isOpen;
    });
  };
  const createSafeCont = () => {
    const arr = [{key: 'apikey', title: 'APIKEY'}, {key: 'sharedSecret', title: '私钥'}];
    const data = accountStore.safeData.data;
    const dataOpen = accountStore.safeDataOpen;
    return arr.map(({key, title}, idx) => {
      return (
        <div key={key} className={styles['safe-info']}>
          <div className={styles.title}>{title}:</div>
          <div className={styles['key-box']}>
            <span>{!!dataOpen[idx] ? data[key] : shieldInfo(data[key])}</span>
            <span className={styles.copy}>复制</span>
          </div>
          <div className={styles['key-handle']} onClick={handleKeyShow.bind(this, idx)}>
            <img src={openPic} />
            {!!dataOpen[idx] ? '隐藏key' : '显示key'}
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {createSafeCont()}
    </div>
  );
}

SafeCont.propTypes = {
  accountStore: PropTypes.object,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.data.loading,
    error: props.data.error,
    imgCategory: 13,
    category: 0,
    errCategory: 2,
    height: 400
  }),
})(inject('accountStore')(observer(SafeCont)));
