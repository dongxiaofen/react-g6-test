import React from 'react';
import { observer } from 'mobx-react';
import Pager from 'components/common/Pager';
import styles from './index.less';
function AccountTable({headData, bodyData, module}) {
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
      <Pager module={module} type="small" />
    </div>
  );
}
export default observer(AccountTable);
