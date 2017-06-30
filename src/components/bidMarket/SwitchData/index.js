import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

import styles from './index.less';
import Select from 'components/lib/Select';
import cityName from 'helpers/cityName';

const { RangePicker } = DatePicker;
const Option = Select.Option;
function SwitchData({ from, to, params, cancels, setParams }) {
  const province = params.province;
  const disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  };

  const dateOnChange = (dateString, dateTime) => {
    if (cancels && cancels.length) {
      cancels.forEach((cancel) => {
        cancel();
      });
    }
    const obj = toJS(params);
    obj.from = dateTime[0];
    obj.to = dateTime[1];
    setParams(obj);
  };

  const selectOnChange = (val) => {
    if (cancels && cancels.length) {
      cancels.forEach((cancel) => {
        cancel();
      });
    }
    const obj = toJS(params);
    obj.province = val;
    obj.city = '';
    setParams(obj);
  };

  const selectList = () => {
    const output = [];
    output.push(<Option value="" key="bidMarketSelectKey0">全国</Option>);
    cityName.forEach((item, key) => {
      output.push(
        <Option value={item} key={`bidMarketSelectKey${key + 1}`}>{item}</Option>
      );
    });
    return output;
  };

  return (
    <div className={`clearfix ${styles.switchData}`}>
      <div className={`clearfix ${styles.province}`}>
        <span className={styles.title}>地区：</span>
        <div className={styles.content}>
          <Select
            defaultValue={province}
            value={province}
            onChange={selectOnChange}>
            {selectList()}
          </Select>
        </div>
      </div>
      <div className={`clearfix ${styles.date}`}>
        <span className={styles.title}>时间：</span>
        <div className={styles.content}>
          <RangePicker
            allowClear={false}
            defaultValue={[moment(from), moment(to)]}
            format={'YYYY-MM-DD'}
            onChange={dateOnChange}
            disabledDate={disabledDate} />
        </div>
      </div>
    </div>
  );
}

SwitchData.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  cancels: PropTypes.array,
  params: PropTypes.object,
  setParams: PropTypes.func,
};
export default observer(SwitchData);
