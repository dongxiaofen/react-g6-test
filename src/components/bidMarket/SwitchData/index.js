import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DatePicker from 'antd/lib/date-picker';

import styles from './index.less';
import Select from 'components/lib/Select';

const { RangePicker } = DatePicker;
const Option = Select.Option;
function SwitchData({}) {
  const disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  };

  return (
    <div className={`clearfix ${styles.switchData}`}>
      <div className={`clearfix ${styles.province}`}>
        <span className={styles.title}>地区：</span>
        <div className={styles.content}>
          <Select>
            <Option value="">全国</Option>
            <Option value="重庆">重庆</Option>
          </Select>
        </div>
      </div>
      <div className={`clearfix ${styles.date}`}>
        <span className={styles.title}>时间：</span>
        <div className={styles.content}>
          <RangePicker
            allowClear={false}
            format={'YYYY-MM-DD'}
            disabledDate={disabledDate} />
        </div>
      </div>
    </div>
  );
}

SwitchData.propTypes = {
  foo: PropTypes.string,
};
export default observer(SwitchData);
