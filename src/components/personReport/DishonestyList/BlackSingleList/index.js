import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import moment from 'moment';

function BlackSingleList({listData, index}) {
  const getValue = (value, minSize) => {
    if (!(value === 'null' || value.length === 0) ) {
      if (minSize && value.length > minSize) {
        const val = value.substr(0, minSize) + '...';
        return (
          <Popover placement="top" trigger="hover" content={value}>
            <span>{val}</span>
          </Popover>
        );
      }
      return value;
    }
    return '--';
  };
  return (
    <div className={styles.singleList}>
      <div className={styles.leftCount}>
        <span>{index}</span>
      </div>
      <div className={styles.pull30}>
        <table className={styles.dishonestyListBox}>
          <tbody>
          <tr>
            <td className={styles.staticWidth}><span className={styles.tips}>公布日期：</span>{getValue(moment(listData.postTime).format('YYYY-MM-DD'))}</td>
            <td><span className={styles.tips}>案件字号：</span>{getValue(listData.caseNO)}</td>
            <td className={styles.staticWidth}><span className={styles.tips}>作出执行依据单位：</span>{getValue(listData.executableUnit, 7)}</td>
          </tr>
          <tr>
            <td className={styles.staticWidth}><span className={styles.tips}>立案日期：</span>{getValue(moment(listData.recordTime).format('YYYY-MM-DD'))}</td>
            <td><span className={styles.tips}>执行依据文号：</span>{getValue(listData.exeCid)}</td>
            <td className={styles.staticWidth}><span className={styles.tips}>执行法院：</span>{getValue(listData.court, 11)}</td>
          </tr>
          <tr>
            <td className={styles.staticWidth}><span className={styles.tips}>被执行履行情况：</span>{getValue(listData.implementationStatus)}</td>
            <td><span className={styles.tips}>失信被执行人行为具体情形：</span>{getValue(listData.specificCircumstances, 25)}</td>
            <td className={styles.staticWidth}><span className={styles.tips}>省份：</span>{getValue(listData.province)}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

BlackSingleList.propTypes = {
  listData: PropTypes.object,
  index: PropTypes.number,
};
export default observer(BlackSingleList);
