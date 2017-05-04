import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import config from 'dict/reportModule';


function PdfTable({ dataConfig, items, dict, decimal }) {
  console.info(items);
  const createTable = () => {
    const thead = [];
    const tbody = [];
    const thCon = [];
    dataConfig.forEach((hItem) => {
      thCon.push(<th key={`${hItem.key}hiemvalue`}>{config[dict][hItem.key]}</th>);
    });
    thead.push(<tr key={`{hIndex}hiemvalue200`}>{thCon}</tr>);
    items.forEach((tbItem, index) => {
      const trCon = [];
      dataConfig.forEach(hItem => {
        let value = tbItem[hItem.key];
        if (value === undefined || value === '' || value === null) {
          value = '无';
        }
        // 是否需要保留小数
        if (decimal) {
          let valueNew = '';
          // 判断是否为数字
          if (!isNaN(value)) {
            // 将值转换为数字类型
            valueNew = (value - 0).toFixed(2);
          } else {
            valueNew = value;
          }
          trCon.push(<td key={`${hItem.key}hiemvaluetd1`} style={{width: hItem.width * 10 + '%'}}>{hItem.handle ? hItem.handle(valueNew) : valueNew}</td>);
        } else {
          trCon.push(<td key={`${hItem.key}hiemvaluetd2`} style={{width: hItem.width * 10 + '%'}}>{hItem.handle ? hItem.handle(value) : value}</td>);
        }
      });
      tbody.push(<tr key={`${index}hiemvaluetr`}>{trCon}</tr>);
    });
    return (
      <table className={styles.table}>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  };
  return (
    <div className={styles.wrap}>
      {createTable()}
    </div>
  );
}

PdfTable.propTypes = {
  dataConfig: PropTypes.array,
  items: PropTypes.object,
  dict: PropTypes.string,
};
export default observer(PdfTable);
