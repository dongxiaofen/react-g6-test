import React from 'react';
import { observer } from 'mobx-react';
import ItemTr from './ItemTr';
import MainTr from './MainTr';
import RelTr from './RelTr';
import Pager from './Pager';
import styles from './index.less';
function TableList({monitorListStore}) {
  const mainData = monitorListStore.mainList.content;
  const relData = monitorListStore.relationList;
  const createList = () => {
    const output = [];
    let item;
    mainData.forEach((mainItem) => {
      item = [];
      const relDataItem = relData.get(mainItem.monitorId);
      item.push(
        <MainTr
          key={'mTr' + mainItem.monitorId}
          data={mainItem}
          relation="main"
          monitorListStore={monitorListStore}
          />
      );
      if (relDataItem) {
        relDataItem.forEach((relItem) => {
          item.push(
            <RelTr
              key={'rTr' + relItem.monitorId}
              data={relItem}
              relation="relation"
              monitorListStore={monitorListStore}
              />
          );
        });
      }
      output.push(
        <ItemTr key={'item' + mainItem.monitorId}>
          {item}
        </ItemTr>
      );
    });
    return output;
  };
  if (mainData === undefined) {
    return null;
  }
  return (
    <div className={styles.wrapper}>
      {createList()}
      <Pager monitorListStore={monitorListStore} />
    </div>
  );
}

export default observer(TableList);
