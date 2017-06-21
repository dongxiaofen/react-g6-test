import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import CompanyInfo from './CompanyInfo';
import PersonInfo from './PersonInfo';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';
import Slider from 'antd/lib/slider';

function DetailInfo({forceNetworkStore, handleZoom, resetNetWork}) {
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
  const formatter = (value)=> {
    return `${(value * 100).toFixed(0)}%`;
  };
  const modifyZoom = (value)=> {
    handleZoom(value, forceNetworkStore);
  };
  return (
    <div>
      <div className={`${styles.operWrap} clearfix`}>
        <div className={styles.operation}>
          <i className="fa fa-expand" aria-hidden="true" title="全屏"></i>
          <span className={styles.line}>|</span>
          <i className="fa fa-external-link" aria-hidden="true" title="恢复" onClick={resetNetWork.bind(null, forceNetworkStore)}></i>
          <span className={styles.line}>|</span>
          <i className="fa fa-floppy-o" aria-hidden="true" title="下载"></i>
        </div>
        <div className={styles.slider}>
          <Slider tipFormatter={formatter} min={0.1} max={2.5} step={0.01} onChange={modifyZoom} value={forceNetworkStore.zoomIndex}/>
        </div>
      </div>
      <div className={isShowInfo ? styles.show : styles.hide}>
        <div className="clearfix">
          <i className={`fa fa-times-circle ${styles.close}`} aria-hidden="true"></i>
        </div>
        {createContent()}
      </div>
    </div>
  );
}

DetailInfo.propTypes = {
  foo: PropTypes.string,
};
export default inject('forceNetworkStore')(observer(DetailInfo));
