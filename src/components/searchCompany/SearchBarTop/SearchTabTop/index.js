import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function SearchTabTop({
  searchTypeConfig,
  searchType,
  searchTabClick}) {
  // tab配置
  const stConfig = searchTypeConfig;
  // tab组
  const tabDom = [];
  // 循环tab并push
  Object.keys(stConfig).map((key)=>{
    // const buttonStyle = searchType === key ? styles.buttonActive : styles.button;
    if (searchType !== key) {
      tabDom.push(
        <a
          key={key}
          onClick={searchTabClick.bind(this, key)}>
          {stConfig[key]}
        </a>
      );
    }
  });
  return (
    <div className={styles.searchTabWrap}>
      <div title={searchTypeConfig[searchType]} className={styles.searchTabActive}>
        <div className={styles.searchTabActiveCon}>
          {searchTypeConfig[searchType]}
        </div>
        <i></i>
      </div>
      <div className={styles.searchTab}>
        {tabDom}
      </div>
    </div>
  );
}

SearchTabTop.propTypes = {
  searchTypeConfig: PropTypes.object,
  searchType: PropTypes.string,
  searchTabClick: PropTypes.func
};
export default observer(SearchTabTop);
