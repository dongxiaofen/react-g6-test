import React from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
function Position({ data }) {
  const routeToSource = (value, item) => {
    return <a href={item.url} target="_blank">{value}</a>;
  };
  const config = [
    {name: '职位名称', key: 'jobTitle'},
    {name: '职位来源', key: 'source', handle: routeToSource},
  ];
  const createTable = () => {
    const thead = [];
    const tbody = [];
    let tr = [];
    config.forEach((item, index) => {
      tr.push(<th key={'th' + index}>{item.name}</th>);
    });
    thead.push(<tr key="thead">{tr}</tr>);
    data.detail.forEach((item, index) => {
      tr = [];
      config.forEach(conf => {
        let tdVal = item[conf.key];
        tdVal = conf.handle ? conf.handle(tdVal, item) : tdVal;
        tr.push(<td key={conf.key}>{tdVal}</td>);
      });
      tbody.push(<tr key={'tbody' + index}>{tr}</tr>);
    });
    return (
      <table className={styles.table}>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  };
  return (
    <div>
      {createTable()}
    </div>
  );
}

export default observer(Position);
