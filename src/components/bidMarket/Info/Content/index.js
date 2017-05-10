import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';
import Pager from 'components/common/Pager';

function Content({ areaInfo, uiStore }) {
  if (!areaInfo.length) {
    return null;
  }
  const areaInfoList = () => {
    return areaInfo.map((item, key) => {
      return (
        <div className= {`${styles['bid-market-col']} ${styles['bid-market-col-area-info']}`} key={`areaInfo${key}`}>
          <div className={styles['bid-market-col-bg']}>
            <div className={`clearfix ${styles['bidMarket-bulletin']}`}>
              <div className={styles['bidMarket-bulletin-title']}>
                <span className={styles['bulletin-main-title']}>中标公告</span>
                <span className={styles['bulletin-sub-title']}>
                  { item.city ? item.province + '-' + item.city : item.province }
                </span>
              </div>
              <div className={`clearfix ${styles['bulletin-name']}`}>
                <span className={styles['bulletin-name-title']}>项目名称：</span>
                <a className={styles['bulletin-url']}
                  target="_blank"
                  title={item.title}>
                  {item.title}
                </a>
              </div>
              <div className={styles['bulletin-money']}>
                中标金额：
                {item.amount ? `${item.amount}${item.unit}（${item.currency}）` : '－' }
              </div>
              <div className={styles['bulletin-text1']}>
                中标单位：{item.winningCompany ? item.winningCompany : '－'}
              </div>
              <div className={styles['bulletin-text1']}>
                中标单位身份：{item.roleName ? item.roleName : '－'}
              </div>
              <div className={styles['bulletin-text1']}>
                公告日期：{item.publishedDate ? item.publishedDate : '－'}
              </div>
              <div className={styles['bulletin-bottom-border']}></div>
              <div className={styles['bulletin-content-item']}>
                <div className={`clearfix ${styles['bulletin-text2']}`}>
                  <span>招标单位：</span>
                  <span title={item.purchaser}>
                    { item.purchaser ? item.purchaser : '－' }
                  </span>
                </div>
                <div className={styles['bulletin-text2']}>
                  招标单位电话：
                  { item.purchaserContactPhone ? item.purchaserContactPhone : '－' }
                </div>
              </div>
              <div className={styles['bulletin-content-item']}>
                <div className={styles['bulletin-text2']}>
                  招标代理机构：{item.agent ? item.agent : '－'}
                </div>
                <div className={styles['bulletin-text2']}>
                  招标代理机构联系电话：
                  { item.agentContactPhone ? item.agentContactPhone : '－' }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="clearfix">
        {areaInfoList()}
      </div>
      <Pager
        tData={areaInfo}
        module="bidMarketInfo"
        uiStore={uiStore}
        type="large" />
    </div>
  );
}

Content.propTypes = {
  areaInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
export default loadingComp({ mapDataToProps: props => ({
  loading: props.infoLoading,
  module: '招投标信息',
  error: props.areaInfo.length === 0
})})(inject('uiStore')(observer(Content)));
