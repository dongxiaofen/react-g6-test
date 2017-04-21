import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';

function FeedBack({searchCompanyStore}) {
  return (
    <div className={styles.box}>
      请确认您输入的<span>{searchCompanyStore.searchKeyFilter}</span>关键词为企业全称，提交关键词后，系统将尽快为您改善搜索结果请<span>1小时</span>之后再试
    </div>
  );
}

FeedBack.propTypes = {
  searchCompanyStore: PropTypes.object,
};
export default inject('searchCompanyStore')(observer(FeedBack));
