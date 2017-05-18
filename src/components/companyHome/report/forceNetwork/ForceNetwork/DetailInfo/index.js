import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import CompanyInfo from './CompanyInfo';

function DetailInfo({forceNetworkStore}) {
  const isShowInfo = forceNetworkStore.nodeInfo.isShowInfo;
  const company = forceNetworkStore.nodeInfo.company;
  return (
    <div className={isShowInfo ? styles.show : styles.hide}>
      {
        company.basicInfo ?
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
