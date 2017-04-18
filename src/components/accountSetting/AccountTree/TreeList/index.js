import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function TreeList({accountSettingStore}) {
  const data = accountSettingStore.tree.data.content;
  const searchInput = accountSettingStore.tree.searchInput;
  const activeIndex = accountSettingStore.tree.activeIndex;
  const createTreeWithFilter = () => {
    console.log(data);
    return 'createTreeWithFilter';
  };
  const getUserData = (uId) => {
    console.log(uId);
  };
  const extend = (idx, level, uId) => {
    const extendVal = accountSettingStore.tree.data.content[idx].extend;
    if (level !== 0) {
      accountSettingStore.changeValue(`tree.data.content[${idx}].extend`, !extendVal);
    }
    if (!extendVal) {
      getUserData(uId);
    }
    accountSettingStore.changeValue(`tree.activeIndex`, idx);
  };
  const judgeByPId = (pId) => {
    if (!pId) {
      return true;
    }
    for (let idx = 0; idx < data.length; idx++) {
      if (data[idx].id === pId) {
        const nextPId = data[idx].parentUserId;
        const nextExtend = data[idx].extend;
        if (nextPId && nextExtend) {
          return judgeByPId(nextPId);
        }
        return nextExtend;
      }
    }
    return true;
  };
  const createTree = () => {
    const output = [];
    data.forEach((item, idx) => {
      const level = item.level;
      const padding = level > 1 ? (level - 1) * 23 : 0;
      const display = level < 2 || judgeByPId(item.parentUserId) ? 'block' : 'none';
      const itemCss = idx === activeIndex ? styles.itemActive : styles.item;
      let icon;
      if (level === 0) {
        icon = <i className={styles.userIcon}></i>;
      } else {
        if (item.childUserId.length > 0) {
          icon = <i className={styles.arrowIcon}></i>;
        } else {
          icon = <i className={styles.icon}></i>;
        }
      }
      output.push(
        <div
          key={idx}
          style={{display: display, paddingLeft: padding}}
          className={itemCss}
          onClick={extend.bind(null, idx, level, item.id)}
          >
          {icon}
          <span className={styles.treeName}>{item.contact}</span>
          <span className={styles.treeEmail}>{`（${item.email}）`}</span>
        </div>
      );
    });
    return output;
  };
  return (
    <div className={styles.wrapper}>
      {
        searchInput.trim() !== ''
        ?
        createTreeWithFilter()
        :
        createTree()
      }
    </div>
  );
}

export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tree.data.content === undefined ? true : false,
    error: props.accountSettingStore.tree.data.error,
    category: 2,
  }),
})(observer(TreeList));
