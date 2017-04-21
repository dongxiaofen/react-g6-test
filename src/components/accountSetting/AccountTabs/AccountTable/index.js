import React from 'react';
import { observer } from 'mobx-react';
import Pagination from 'components/lib/pagination';
import styles from './index.less';
function AccountTable({headData, bodyData, pageParams, totalElements, pageChange}) {
  const createHead = () => {
    const head = [];
    headData.forEach(item => {
      head.push(
        <th key={item.key}>{item.name}</th>
      );
    });
    return <tr>{head}</tr>;
  };
  const createBody = () => {
    const body = [];
    bodyData.forEach(bodyItem => {
      const trItem = [];
      headData.forEach(headItem => {
        const handle = headItem.handle;
        const value = bodyItem[headItem.key];
        trItem.push(
          <td key={headItem.key}>
            {handle ? handle(value, bodyItem) : value}
          </td>
        );
      });
      body.push(<tr key={bodyItem.seqNum}>{trItem}</tr>);
    });
    return body;
  };
  return (
    <div>
      <table className={styles.accountTable}>
        <thead>
          {createHead()}
        </thead>
        <tbody>
          {createBody()}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          current={pageParams.index}
          pageSize={pageParams.size}
          total={totalElements}
          onChange={pageChange}/>
      </div>
    </div>
  );
}
export default observer(AccountTable);
