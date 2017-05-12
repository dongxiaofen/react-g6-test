import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function ReportLoader({
  searchCompanyStore,
  }) {
  // 判断选择哪张报告
  const reportType = searchCompanyStore.reportType;
  return (
    <div className={`${styles.box}`}>
      <div className={`${styles.boxConWrap}`}>
        <div className={`${styles.boxCon}`}>
          {/* <div className={`${styles.topBox}`}>
            <div className={`${styles.topCon}`}>
              工商 法务
            </div>
            <div className={`${styles.topDown}`}></div>
          </div> */}
          <div onClick={searchCompanyStore.selectReportType.bind(this, 'free')} className={`${reportType === 'free' ? styles.boxBtnActive : styles.boxBtn}`}>
            <span>快速查询报告</span>
            <i></i>
          </div>
        </div>
        <div className={`${styles.boxCon}`}>
          {/* <div className={`${styles.topBox}`}>
            <div className={`${styles.topCon}`}>
              报告 核查 关联
            </div>
            <div className={`${styles.topDown}`}></div>
          </div> */}
          <div onClick={searchCompanyStore.selectReportType.bind(this, 'report')} className={`${reportType === 'report' ? styles.boxBtnActive : styles.boxBtn}`}>
            <span>高级查询报告</span>
            <i></i>
          </div>
        </div>
        <div className={`${styles.boxCon}`}>
          {/* <div className={`${styles.topBox}`}>
            <div className={`${styles.topCon}`}>
              报告 税务 分析
            </div>
            <div className={`${styles.topDown}`}></div>
          </div> */}
          <div onClick={searchCompanyStore.selectReportType.bind(this, 'analysis')} className={`${reportType === 'analysis' ? styles.boxBtnActive : styles.boxBtn}`}>
            <span>深度分析报告</span>
            <i></i>
          </div>
        </div>
      </div>
      <div className={`${reportType === 'free' ? styles.textActive : styles.text}`}>
        已选择快速查询报告<span>（包含企业基本信息、企业风险信息）</span>
      </div>
      <div className={`${reportType === 'report' ? styles.textActive : styles.text}`}>
        已选择高级查询报告<span>（包含快速查询报告数据，另有关联网络、上市、新闻、团队、经营数据）</span>
      </div>
      <div className={`${reportType === 'analysis' ? styles.textActive : styles.text}`}>
        已选择深度分析报告<span>（包含高级查询报告数据，另有企业税务分析、综合信息分析、预警分析）</span>
      </div>
    </div>
  );
}

ReportLoader.propTypes = {
  searchCompanyStore: PropTypes.object,
  modalStore: PropTypes.object,
};
export default inject('searchCompanyStore', 'modalStore', 'messageStore')(observer(ReportLoader));
