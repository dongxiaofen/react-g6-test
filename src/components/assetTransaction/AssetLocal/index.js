import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import Radio from 'antd/lib/radio';

import cityName from 'helpers/cityName';
import assignor from 'components/assetTransaction/assignor';
import styles from './index.less';
import Select from 'components/lib/Select';
import CardList from './CardList';

const Option = Select.Option;
const RadioGroup = Radio.Group;
@inject('assetTransactionStore', 'uiStore', 'detailModalStore')
@observer
export default class AssetLocal extends Component {
  static propTypes = {
    assetTransactionStore: PropTypes.object,
    uiStore: PropTypes.object,
    detailModalStore: PropTypes.object,
  };

  componentDidMount() {
    const params = toJS(this.props.assetTransactionStore.assetLocalParams);
    params.index = 1;
    params.size = this.props.uiStore.uiState.assetLocal.size;
    this.props.assetTransactionStore.getAssetLocal(params);
  }

  areaSelectList() {
    const output = [];
    output.push(<Option key="assetLocalAreaSelectKey0" value="">全国</Option>);
    cityName.forEach((item, key) => {
      output.push(
        <Option key={`assetLocalAreaSelectKey${key + 1}`} value={item}>
          {item}
        </Option>
      );
    });
    return output;
  }

  moneySelectList() {
    const config = [
      { label: '全部', value: '' },
      { label: '10亿以上', value: '1000000000,' },
      { label: '5～10亿', value: '500000000,1000000000' },
      { label: '1～5亿', value: '100000000,500000000' },
      { label: '1千万~1亿', value: '10000000,100000000' },
      { label: '1千万以下', value: ',10000000' },
    ];
    const output = [];
    config.forEach((item, key) => {
      output.push(
        <Option key={`assetLocalMoneySelectKey${key}`} value={item.value}>
          {item.label}
        </Option>
      );
    });
    return output;
  }

  modfyMoney = (value) => {
    const assets = value.split(',');
    const assetGt = assets[0] || '';
    const assetLt = assets[1] || '';
    return { assetGt, assetLt };
  }

  filterHandle = () => {
    const params = toJS(this.props.assetTransactionStore.assetLocalParams);
    const index = this.props.uiStore.uiState.assetLocal.index;
    const assetLocalCancel = this.props.assetTransactionStore.assetLocalCancel;
    if (assetLocalCancel && typeof assetLocalCancel === 'function') {
      assetLocalCancel();
    }
    if (index === 1) {
      this.props.assetTransactionStore.getAssetLocal(params);
    } else {
      this.props.uiStore.updateUiStore('assetLocal.index', 1);
    }
  }

  changeSelect = (key, value) => {
    const setParams = this.props.assetTransactionStore.setAssetLocalParams;
    if (key === 'money') {
      const { assetGt, assetLt } = this.modfyMoney(value);
      setParams('assetGt', assetGt);
      setParams('assetLt', assetLt);
    } else {
      setParams(key, value);
    }
    this.filterHandle();
  }

  radioOnChange = (key, evt) => {
    const setParams = this.props.assetTransactionStore.setAssetLocalParams;
    setParams(key, evt.target.value);
    this.filterHandle();
  };

  assignorRadioDisable() {
    const assetType = this.props.assetTransactionStore.assetLocalParams.assetType;
    if (assetType === '拍卖资产') {
      return true;
    }
    return false;
  }

  render() {
    const params = this.props.assetTransactionStore.assetLocalParams;
    const assets = params.assetGt || params.assetLt ? `${params.assetGt},${params.assetLt}` : '';
    const assetRadioOption = [
      { label: '全部', value: '' },
      { label: '交易资产', value: '交易资产' },
      { label: '招商资产', value: '招商资产' },
      { label: '拍卖资产', value: '拍卖资产', disabled: params.assignorType ? true : false },
    ];
    const assignorRadioOption = assignor.map((item) => {
      item.disabled = this.assignorRadioDisable();
      return item;
    });
    return (
      <div>
        <div className="clearfix">
          <div className={`clearfix ${styles.assetLocalSwitchData}`}>
            <span className={styles.label}>地区</span>
            <div className={styles.select}>
              <Select
                width="120px"
                onChange={this.changeSelect.bind(this, 'region')}
                value={params.region}>
                {this.areaSelectList()}
              </Select>
            </div>
          </div>
          <div className={`clearfix ${styles.assetLocalSwitchData}`}>
            <span className={styles.label}>资产金额</span>
            <div className={styles.select}>
              <Select
                width="120px"
                value={assets.trim()}
                onChange={this.changeSelect.bind(this, 'money')}>
                {this.moneySelectList()}
              </Select>
            </div>
          </div>
        </div>
        <div className={`clearfix ${styles.radiosBox}`}>
          <span className={styles.label}>资产类型</span>
          <div className={styles.radios}>
            <RadioGroup
              options={assetRadioOption}
              value={params.assetType}
              onChange={this.radioOnChange.bind(null, 'assetType')}/>
          </div>
        </div>
        <div className={`clearfix ${styles.radiosBox}`}>
          <span className={styles.label}>转让机构</span>
          <div className={styles.radios}>
            <RadioGroup
              options={assignorRadioOption}
              value={params.assignorType}
              onChange={this.radioOnChange.bind(null, 'assignorType')}/>
          </div>
        </div>
        <div className={styles.cardList}>
          <CardList
            uiStore={this.props.uiStore}
            assetLocalLoading={this.props.assetTransactionStore.assetLocalLoading}
            assetLocalData={this.props.assetTransactionStore.assetLocalData}
            getAssetLocalDetail={this.props.assetTransactionStore.getAssetLocalDetail}
            openDetailModal={this.props.detailModalStore.openDetailModal} />
        </div>
      </div>
    );
  }
}
