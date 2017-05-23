import React, {PropTypes} from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';
import moment from 'moment';

import styles from './index.less';
import assignor from 'components/assetTransaction/assignor';
import DateCheck from 'components/assetTransaction/DateCheck';

const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
function SwitchData({ assetTransactionStore }) {
  const params = toJS(assetTransactionStore.distributionParams);
  const distributionStaticKey = assetTransactionStore.distributionStaticKey;
  const setParams = assetTransactionStore.setDistributionParams;
  const getAreaDistribution = assetTransactionStore.getAreaDistribution;
  const getAreaDistributionDetail = assetTransactionStore.getAreaDistributionDetail;

  const assetsRadioOptions = [
    { label: '交易资产总额', value: 'transactionTotal' },
    { label: '交易笔数', value: 'transactionSum' },
    { label: '拍卖资产总额', value: 'auctionTotal', disabled: !!params.type },
    { label: '拍卖笔数', value: 'auctionSum', disabled: !!params.type }
  ];

  const assignorRadioOptions = assignor.map((item) => {
    if (distributionStaticKey === 'auctionTotal' || distributionStaticKey === 'auctionSum') {
      item.disabled = true;
    } else {
      item.disabled = false;
    }
    return item;
  });

  const disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  };

  const setDistributionStaticKey = (evt) => {
    assetTransactionStore.setDistributionStaticKey(evt.target.value);
  };

  const setAssignor = (evt) => {
    params.type = evt.target.value;
    setParams(params);
    getAreaDistribution(params);
  };

  const dateOnChange = (dateString, dateTime) => {
    params.startDate = dateTime[0];
    params.endDate = dateTime[1];
    setParams(params);
    getAreaDistribution(params);
    getAreaDistributionDetail(params);
  };

  const checkChange = (value) => {
    params.startDate = value[0];
    params.endDate = value[1];
    setParams(params);
    getAreaDistribution(params);
    getAreaDistributionDetail(params);
  };

  return (
    <div className="clearfix">
      <div className="clearfix">
        <span className={styles.title}>时段</span>
        <div className={styles.content}>
          <RangePicker
            style={{ width: 205 }}
            format="YYYY-MM-DD"
            allowClear={false}
            value={[moment(params.startDate), moment(params.endDate)]}
            onChange={dateOnChange}
            disabledDate={disabledDate} />
        </div>
        <div className={styles.dateCheck}>
          <DateCheck checkChange={checkChange} />
        </div>
      </div>
      <div className={`clearfix ${styles.radioBox}`}>
        <span className={styles.title}>
          资产统计
        </span>
        <div className={styles.content}>
          <RadioGroup
            value={distributionStaticKey}
            options={assetsRadioOptions}
            onChange={setDistributionStaticKey} />
        </div>
      </div>
      <div className={`clearfix ${styles.radioBox}`}>
        <span className={styles.title}>
          转让机构
        </span>
        <div className={styles.content}>
          <RadioGroup
            value={params.type}
            options={assignorRadioOptions}
            onChange={setAssignor} />
        </div>
      </div>
    </div>
  );
}

SwitchData.propTypes = {
  assetTransactionStore: PropTypes.object,
};
export default inject('assetTransactionStore')(observer(SwitchData));
