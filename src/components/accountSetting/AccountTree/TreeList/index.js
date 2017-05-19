import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import styles from './index.less';
function TreeList({accountSettingStore, uiStore, clientStore}) {
  const moduleData = accountSettingStore.tree;
  const data = moduleData.data.content;
  const searchInput = moduleData.searchInput.trim();
  const userEmail = clientStore.userInfo.email;
  const getUserData = (uId, level) => {
    uiStore.resetAccountPager();
    accountSettingStore.changeValue('tabs.activeKey', '消费记录');
    accountSettingStore.getUserInfo(uId);
    // accountSettingStore.getReportAndMonitor(uId);
    // accountSettingStore.getProvince(uId);
    // accountSettingStore.getIndustry(uId);
    // accountSettingStore.getScale(uId);
    accountSettingStore.getConsume(uId);
    if (userEmail !== moduleData.data.content[moduleData.activeIndex].email) {
      accountSettingStore.getAlertCorp(uId);
    }
    if (level === 0) {
      accountSettingStore.getRecharge(uId);
      accountSettingStore.getSummary(uId);
    }
    accountSettingStore.getLoginRecord(uId);
  };
  const extend = (idx, level, uId) => {
    const extendVal = data[idx].extend;
    if (level !== 0) {
      accountSettingStore.changeValue(`tree.data.content[${idx}].extend`, !extendVal);
    }
    if (moduleData.activeIndex !== idx) {
      accountSettingStore.changeValue(`tree.activeIndex`, idx);
      accountSettingStore.changeValue(`tree.activeId`, uId);
      getUserData(uId, level);
    }
  };
  const showNodeDetail = (level, uId) => {
    accountSettingStore.changeValue(`tree.activeId`, uId);
    console.log(data.findIndex(item => item.id === uId), '--log');
    accountSettingStore.changeValue(`tree.activeIndex`, data.findIndex(item => item.id === uId));
    getUserData(uId, level);
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
  const createTreeWithFilter = () => {
    const output = [];
    const pattern = new RegExp(searchInput);
    const filterData = data.filter(item => {
      return pattern.test(item.contact) || pattern.test(item.email);
    });
    if (filterData.length === 0) {
      output.push(
        <div
          key="noResult"
          className={styles.noResultInfo}
          >
          未搜索到相关用户
        </div>
      );
    }
    filterData.forEach((item, idx) => {
      const itemCss = item.id === moduleData.activeId ? styles.itemActive : styles.item;
      output.push(
        <div
          key={idx}
          className={itemCss}
          onClick={showNodeDetail.bind(null, item.level, item.id)}
          >
          <i className={styles.icon}></i>
          <span className={styles.treeName}>{item.contact}</span>
          <span className={styles.treeEmail}>{`(${item.email})`}</span>
        </div>
      );
    });
    return output;
  };
  const createTree = () => {
    const output = [];
    data.forEach((item, idx) => {
      const level = item.level;
      const padding = level > 1 ? (level - 1) * 23 : 0;
      const display = level < 2 || judgeByPId(item.parentUserId) ? 'block' : 'none';
      const itemCss = item.id === moduleData.activeId ? styles.itemActive : styles.item;
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
        searchInput !== ''
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
    category: 0,
    height: 200,
  }),
})(observer(TreeList));
