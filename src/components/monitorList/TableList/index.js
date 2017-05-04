import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import ItemTr from './ItemTr';
import MainTr from './MainTr';
import RelTr from './RelTr';
import AddTr from './AddTr';
import Pager from 'components/common/Pager';
import styles from './index.less';
function TableList({monitorListStore}) {
  const mainData = monitorListStore.mainList.content;
  const relData = monitorListStore.relationList;
  const relDataStatus = monitorListStore.relationListStatus;
  const createList = () => {
    const output = [];
    let item;
    let monitorId;
    mainData.forEach((mainItem, mainIdx) => {
      item = [];
      monitorId = mainItem.monitorId;
      const relDataItem = relData.get(monitorId);
      const relDataItemStatus = relDataStatus.get(monitorId);
      item.push(
        <MainTr
          key={'mTr' + monitorId}
          data={mainItem}
          index={mainIdx}
          relation="main"
          monitorListStore={monitorListStore}
          />
      );
      if (relDataItemStatus === 'show') {
        relDataItem.forEach((relItem, relIdx) => {
          item.push(
            <RelTr
              key={'rTr' + relItem.monitorId}
              mainData={mainItem}
              data={relItem}
              index={relIdx}
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
      <div className={styles.tableList}>
        {createList()}
      </div>
      <Pager module="monitorListPager" />
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.monitorListStore.mainList.content === undefined ? true : false,
    error: props.monitorListStore.mainList.error,
    imgCategory: 13,
    category: 2,
    module: '监控列表',
  }),
})(observer(TableList));
