import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchTabTop({
  searchTypeConfig,
  searchType,
  searchTabClick,
  searchTabMouseDown,
  searchTabStatus}) {
  // tab配置
  const stConfig = searchTypeConfig;
  // tab组
  const tabDom = [];
  // 循环tab并push
  Object.keys(stConfig).map((key)=>{
    // const buttonStyle = searchType === key ? styles.buttonActive : styles.button;
    let active = styles.tab;
    if (searchType === key) {
      active = styles.active;
    }
    tabDom.push(
      <a
        className={active}
        key={key}
        onMouseDown={searchTabMouseDown.bind(this, key)}>
        {stConfig[key]}
      </a>
    );
  });
  // 下拉是否收起
  let searchTab = styles.searchTab;
  let searchTabWrap = styles.searchTabWrap;
  if (searchTabStatus) {
    searchTab = styles.searchTabShow;
    searchTabWrap = styles.searchTabWrapShow;
  }
  return (
    <div
      tabIndex="0"
      onMouseOver={searchTabClick.bind(this, true, 'top')}
      onMouseOut={searchTabClick.bind(this, false, 'top')}
      className={searchTabWrap}>
      <div
        title={searchTypeConfig[searchType]} className={styles.searchTabActive}>
        <div className={styles.searchTabActiveCon}>
          {searchTypeConfig[searchType]}
        </div>
        <i></i>
      </div>
      <div className={searchTab}>
        {tabDom}
      </div>
    </div>
  );
}

SearchTabTop.propTypes = {
  searchTypeConfig: PropTypes.object,
  searchType: PropTypes.string,
  searchTabStatus: PropTypes.bool,
  searchTabClick: PropTypes.func,
  searchTabMouseDown: PropTypes.func,
};
export default observer(SearchTabTop);
