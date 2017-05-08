import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Summary({mapKey, valueData, unit, title}) {
  const objParse = (data) => {
    let str;
    if (mapKey && mapKey.action === 'total') {
      str = 0;
      Object.keys(data).forEach((item) => {
        str += data[item];
      });
      return str > 0 ? `共 ${str} 条` : '暂无信息';
    }
    str = '';
    let emptyFlag = true;
    Object.keys(data).forEach((item) => {
      if (!mapKey[item]) return false;
      if (typeof data[item] === 'boolean' && data[item]) {
        emptyFlag = false;
      }
      if (typeof data[item] === 'number' && data[item] > 0) {
        emptyFlag = false;
      }
      str += mapKey[item] + (data[item] === true ? '，' : `（${data[item]}），`);
      if (typeof data[item] === 'boolean' && data[item] === false) {
        str = str.replace(`${mapKey[item]}（${data[item]}），`, '');
      }
    });
    const returnStr = emptyFlag ? '暂无信息' : str.substring(0, str.length - 1);
    return !str ? '暂无信息' : returnStr;
  };
  return (
    <div className={styles.part}>
      <p className={styles.title} key="summary-title">{title}</p>
      <div className={styles.info} key="summary-value">
        {
          valueData ?
            <p className={styles.infos}>{valueData.type === 'number' ? `${valueData.data > 0 ? '共 ' + valueData.data + ' ' + (unit || '条') : '暂无信息'}` : objParse(valueData.data)}</p>
            : '暂无信息'
        }
      </div>
    </div>
  );
}

Summary.propTypes = {
  unit: PropTypes.string,
  mapKey: PropTypes.object,
  valueData: PropTypes.object,
  title: PropTypes.string,
};
export default observer(Summary);
