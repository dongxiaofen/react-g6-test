import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';


function PdfTable({ config, items, dict, decimal }) {
  const createTable = () => {
    const thead = [];
    const tbody = [];
    const thCon = [];
    config.forEach(hItem => {
      thCon.push(<th>{config[dict][hItem.key]}</th>);
    });
    thead.push(<tr>{thCon}</tr>);
    items.forEach(tbItem => {
      const trCon = [];
      config.forEach(hItem => {
        let value = tbItem[hItem.key];
        if (value === undefined || value === '' || value === null) {
          value = '无';
        }
        // 是否需要保留小数
        if (decimal === 'true') {
          let valueNew = '';
          // 判断是否为数字
          if (!isNaN(value)) {
            // 将值转换为数字类型
            valueNew = (value - 0).toFixed(2);
          } else {
            valueNew = value;
          }
          trCon.push(<td style={{width: hItem.width * 10 + '%'}}>{hItem.handle ? hItem.handle(valueNew) : valueNew}</td>);
        } else {
          trCon.push(<td style={{width: hItem.width * 10 + '%'}}>{hItem.handle ? hItem.handle(value) : value}</td>);
        }
      });
      tbody.push(<tr>{trCon}</tr>);
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
  dict: PropTypes.string,
};
export default observer(PdfTable);
