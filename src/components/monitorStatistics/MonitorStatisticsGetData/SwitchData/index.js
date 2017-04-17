import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Select from 'components/lib/Select';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

const Option = Select.Option;
const { RangePicker } = DatePicker;
function disabledDate(current) {
  return current && current.valueOf() > Date.now();
}
function SwitchData({ msStore, params }) {
  console.log(msStore);
  return (
    <div className={`clearfix ${ styles.swichData }`}>
      <div className={`clearfix ${ styles.swichDataItem }`}>
        <div className={styles.swichDataTile}>时段：</div>
        <div className={styles.swichDataDateRange}>
          <RangePicker
            disabledDate={disabledDate}
            defaultValue={[moment(params.begin), moment(params.end)]}
            format={'YYYY-MM-DD'} />
        </div>
      </div>
      <div className={`clearfix ${ styles.swichDataItem }`}>
        <div className={styles.swichDataTile}>范围：</div>
        <div className={styles.swichDataSelect}>
          <Select>
            <Option value="">
              所有企业
            </Option>
            <Option value="MAIN">
              主体企业
            </Option>
            <Option value="ASSOCIATE">
              关联企业
            </Option>
          </Select>
        </div>
      </div>
    </div>
  );
}

SwitchData.propTypes = {
  monitorStatisticsStore: PropTypes.object,
};
export default observer(SwitchData);
