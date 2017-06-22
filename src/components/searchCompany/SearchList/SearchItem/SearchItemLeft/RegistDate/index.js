import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function RegistDate({itemData}) {
  let date = '';
  if (itemData.regDate) {
    date = (
      <div className={`${styles.date}`}>
        成立时间：{itemData.regDate}
      </div>
    );
  }
  return (
    <div className={`${styles.dateWrap}`}>
      {date}
    </div>
  );
}

RegistDate.propTypes = {
  itemData: PropTypes.object
};

export default observer(RegistDate);
