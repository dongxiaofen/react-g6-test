import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';
import styles from './index.less';

import Select from 'components/lib/Select';
import Row from 'components/common/layout/Row';
import Col from 'components/common/layout/Col';

const Option = Select.Option;
const { RangePicker } = DatePicker;
function disabledDate(current) {
  return current && current.valueOf() > Date.now();
}

function SwitchData({ msStore, params }) {
  const cancelFun = () => {
    msStore.cancel.forEach((cancel) => {
      if (cancel) {
        cancel();
      }
    });
  };

  const changeData = (_params) => {
    msStore.getChangeData(_params);
    msStore.setParams(_params);
  };

  const companyTypeOnchange = (val) => {
    const msStoreParams = msStore.params;
    cancelFun();
    changeData({
      begin: msStoreParams.begin,
      end: msStoreParams.end,
      type: val
    });
  };

  const dateOnChange = (dateString, dateTime) => {
    const msStoreParams = msStore.params;
    cancelFun();
    changeData({
      begin: dateTime[0],
      end: dateTime[1],
      type: msStoreParams.type
    });
  };
  return (
    <Row>
      <Col width="12">
        <div className={`clearfix ${ styles.swichData }`}>
          <div className={`clearfix ${ styles.swichDataItem }`}>
            <div className={styles.swichDataTile}>时段：</div>
            <div className={styles.swichDataDateRange}>
              <RangePicker
                defaultValue={[moment(params.begin), moment(params.end)]}
                allowClear={false}
                format={'YYYY-MM-DD'}
                disabledDate={disabledDate}
                onChange={dateOnChange} />
            </div>
          </div>
          <div className={`clearfix ${ styles.swichDataItem }`}>
            <div className={styles.swichDataTile}>范围：</div>
            <div className={styles.swichDataSelect}>
              <Select onChange={companyTypeOnchange}>
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
      </Col>
    </Row>
  );
}

SwitchData.propTypes = {
  monitorStatisticsStore: PropTypes.object,
};
export default observer(SwitchData);
