import React, {PropTypes} from 'react';
import { observer} from 'mobx-react';
import styles from './index.less';

function BaseInfo({data, config}) {
  const createBasicInfo = () => {
    const output = [];
    config.map((item, idx)=>{
      let value = data[item.key];
      if (item.modifyText) {
        value = item.modifyText(value, data);
      }
      output.push(
        <p key={`basicInfo${idx}`} className={styles.baseInfo}>{item.label}：{value || '--'}</p>
      );
    });
    return output;
  };
  return (
    <div>
      {createBasicInfo()}
    </div>
  );
}

BaseInfo.propTypes = {
  foo: PropTypes.string,
};
export default observer(BaseInfo);
