import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import { loadingComp } from 'components/hoc';

function TabItem({items, yearReportTab, setYearReport}) {
  const itemsArray = [];
  if (items && items.length > 0) {
    items.map((item, idx)=>{
      if (yearReportTab === item.year) {
        console.log(yearReportTab, item.year, '====1');
        itemsArray.push(
          <div
            onClick={setYearReport.bind(this, item.year)}
            key={`${idx}${item.year}`} className={`${styles.yearItem} ${styles.yearItemActive}`}>{item.year}年</div>
        );
      } else {
        if (idx === 0 && yearReportTab.length < 1) {
          console.log(yearReportTab, item.year, '====2');
          itemsArray.push(
            <div
              onClick={setYearReport.bind(this, item.year)}
              key={`${idx}${item.year}`}
              className={`${styles.yearItem} ${styles.yearItemActive}`}>{item.year}年</div>
          );
        } else {
          console.log(yearReportTab, item.year, '====3');
          itemsArray.push(
            <div
              onClick={setYearReport.bind(this, item.year)}
              key={`${idx}${item.year}`}
              className={`${styles.yearItem}`}>{item.year}年</div>
          );
        }
      }
    });
  }
  console.log(items, yearReportTab, setYearReport);
  return (
    <div className={styles.box}>
      {itemsArray}
    </div>
  );
}

TabItem.propTypes = {
  items: PropTypes.object.isRequired,
  // setYearReport: PropTypes.func,
};
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.isLoading,
    category: 0,
    error: props.error,
    errCategory: 1,
    module: props.module
  })
})(observer(TabItem));
