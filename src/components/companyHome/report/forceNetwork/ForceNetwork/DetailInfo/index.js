import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import CompanyInfo from './CompanyInfo';

function DetailInfo({forceNetworkStore}) {
  const isShowInfo = forceNetworkStore.nodeInfo.isShowInfo;
  const detailInfo = forceNetworkStore.nodeInfo.detailInfo;
  return (
    <div className={isShowInfo ? styles.show : styles.hide}>
      <div className="clearfix">
        <i className={`fa fa-times-circle ${styles.close}`} aria-hidden="true"></i>
      </div>
      {
        detailInfo.basicInfo ?
        <CompanyInfo forceNetworkStore={forceNetworkStore}/>
        : 'loading'
      }
    </div>
  );
}

DetailInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('forceNetworkStore')(observer(DetailInfo));
