import React from 'react';
import { observer, inject } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import loadingBoxHoc from '../common/loadingBoxHoc';
import styles from './index.less';
function LatestEnterprise({highRiskCorpStore}) {
  const moduleData = highRiskCorpStore.latestEnterprise.data.indus_comp_list;
  const createList = () => {
    const output = [];
    moduleData.map((item, idx) => {
      output.push(
        <div key={idx} className={styles.item}>
          <div className={styles.marginLine}>
            <h4 className={styles.compTitle}>{item.company_name}</h4>
            <span className={styles.rightDate}>{item.law_date}</span>
          </div>
          <div>
            <span className={styles.redLabel}>{item.industry}</span>
            <span className={styles.blackLabel}>{item.source_type}</span>
          </div>
        </div>
      );
    });
    return output;
  };
  return (
    <div className={styles.listBox}>
      {createList()}
    </div>
  );
}
export default inject('highRiskCorpStore')(
  loadingBoxHoc('latestEnterprise')(
    loadingComp({
      mapDataToProps: props => ({
        loading: props.highRiskCorpStore.latestEnterprise.data.indus_comp_list === undefined ? true : false,
        error: props.highRiskCorpStore.latestEnterprise.data.error,
        height: 434,
        errCategory: 1,
        category: 0,
      }),
    })(observer(LatestEnterprise))
  )
);
