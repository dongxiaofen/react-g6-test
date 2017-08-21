import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Table({dataSource, columns}) {
  const createThead = () => {
    return columns.map((item) => {
      return (<th key={item.key} className={styles['table-th']} width={item.width ? item.width : 'auto'}>{item.title}</th>);
    });
  };
  const createTd = (data, rowIdx) => {
    return columns.map((item, idx) => {
      return (<td key={item.key + idx}>{item.render ? item.render(data[item.dataIndex], data, rowIdx) : data[item.dataIndex]}</td>);
    });
  };
  const createTbody = () => {
    const tbody = [];
    dataSource.map((data, idx) => {
      tbody.push(
        <tr key={data.key ? data.key : idx} className={styles['table-tr']}>{createTd(data, idx)}</tr>
      );
    });
    return tbody;
  };
  return (
    <div className={styles['table-box']}>
      <table className={styles.table}>
        <thead><tr>{createThead()}</tr></thead>
        <tbody>{createTbody()}</tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
};
export default observer(Table);
