import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import styles from './index.less';

function CompanyName({data}) {
  // 公司名
  const name = data.companyName;
  // 分数
  let score = '';
  if (data.score) {
    score = (
      <div className={styles.type}>
        综合分{data.score}
      </div>
    );
  }
  // 跳转监控
  const link = () => {
    browserHistory.push(`/companyHome?monitorId=${data.productId}`);
  };
  return (
    <div className={styles.box}>
      <div onClick={link} className={styles.name}>
        {name}
      </div>
      {score}
    </div>
  );
}

CompanyName.propTypes = {
  data: PropTypes.object,
};
export default observer(CompanyName);
