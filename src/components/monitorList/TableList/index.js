import React from 'react';
import { observer } from 'mobx-react';
import ItemTr from './ItemTr';
import MainTr from './MainTr';
import RelTr from './RelTr';
import AddTr from './AddTr';
import Pager from './Pager';
import styles from './index.less';
function TableList({monitorListStore}) {
  const mainData = monitorListStore.mainList.content;
  const relData = monitorListStore.relationList;
  const relDataStatus = monitorListStore.relationListStatus;
  const createList = () => {
    const output = [];
    let item;
    let monitorId;
    mainData.forEach((mainItem) => {
      item = [];
      monitorId = mainItem.monitorId;
      const relDataItem = relData.get(monitorId);
      const relDataItemStatus = relDataStatus.get(monitorId);
      item.push(
        <MainTr
          key={'mTr' + monitorId}
          data={mainItem}
          relation="main"
          monitorListStore={monitorListStore}
          />
      );
      if (relDataItemStatus === 'show') {
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
        item.push(
          <AddTr
            key={'addTr' + monitorId}
            data={mainItem}
            monitorListStore={monitorListStore}
            />
        );
      }
      output.push(
        <ItemTr
          key={'item' + monitorId}
          data={mainItem}
          monitorListStore={monitorListStore}
          >
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
