import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchTab({
  searchTypeConfig,
  searchType,
  searchTabClick}) {
  // tab配置
  const stConfig = searchTypeConfig;
  // tab组
  const tabDom = [];
  // 循环tab并push
  Object.keys(stConfig).map((key)=>{
    const buttonStyle = searchType === key ? styles.buttonActive : styles.button;
    tabDom.push(
      <a key={key} onClick={searchTabClick.bind(this, key)} className={buttonStyle}>{stConfig[key]}</a>
    );
  });
  return (
    <div className={styles.searchTabWrap}>
      {tabDom}
    </div>
  );
}

SearchTab.propTypes = {
  searchTypeConfig: PropTypes.object,
  searchType: PropTypes.string,
  searchTabClick: PropTypes.func
};
export default observer(SearchTab);
