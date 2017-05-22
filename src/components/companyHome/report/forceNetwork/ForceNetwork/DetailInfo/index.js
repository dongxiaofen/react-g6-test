import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';

function DetailInfo({forceNetworkStore}) {
  const isShowInfo = forceNetworkStore.nodeInfo.isShowInfo;
  const detailInfo = forceNetworkStore.nodeInfo.detailInfo;
  const createContent = () => {
    if (detailInfo.basicInfo) {
      if (detailInfo.basicInfo.cateType === 1) {
        return <CompanyInfo forceNetworkStore={forceNetworkStore}/>;
      } else if (detailInfo.basicInfo.cateType === 2) {
        return <PersonInfo forceNetworkStore={forceNetworkStore}/>;
      }
    } else if (detailInfo.error) {
      return <p className={styles.nomess}>暂无信息</p>;
    }
    return <AnimateLoading />;
  };
  return (
    <div className={isShowInfo ? styles.show : styles.hide}>
      <div className="clearfix">
        <i className={`fa fa-times-circle ${styles.close}`} aria-hidden="true"></i>
      </div>
      {createContent()}
    </div>
  );
}

DetailInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('forceNetworkStore')(observer(DetailInfo));
