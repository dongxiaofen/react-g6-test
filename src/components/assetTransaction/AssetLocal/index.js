import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import cityName from 'helpers/cityName';
import styles from './index.less';
import Select from 'components/lib/Select';
import CardList from './CardList';

const Option = Select.Option;
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

  assignorSelectList() {
    const assignor = [
      '资产管理公司',
      '投资公司',
      '银行',
      'P2P金融',
      '非金融企业',
      '小额贷款',
      '保理',
      '金融租赁',
      '保险',
      '信托',
      '互联网平台',
      '其他'
    ];
    const output = [];
    output.push(<Option key="assetLocalAssignorSelectKey0" value="">全部</Option>);
    assignor.forEach((item, key) => {
      output.push(
        <Option key={`assetLocalAssignorSelectKey${key + 1}`} value={item}>
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

  typeSelectList() {
    const assetType = [
      // { label: '全部', key: 'sum' },
      { label: '拍卖资产', key: 'auctionSum' },
      { label: '交易资产', key: 'transactionSum' },
      { label: '招商资产', key: 'attractSum' },
    ];
    const output = [];
    output.push(<Option key="assetLocalTypeSelectKey0" value="">全部</Option>);
    assetType.forEach((item, key) => {
      output.push(
        <Option
          key={`assetLocalTypeSelectKey${key + 1}`}
          value={item.label}>
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

  filterHandle = (key, value) => {
    const params = toJS(this.props.assetTransactionStore.assetLocalParams);
    params.index = 1;
    params.size = this.props.uiStore.uiState.assetLocal.size;
    if (key === 'money') {
      const { assetGt, assetLt } = this.modfyMoney(value);
      params.assetGt = assetGt;
      params.assetLt = assetLt;
    } else {
      params[key] = value;
    }
    this.props.assetTransactionStore.getAssetLocal(params);
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
    this.filterHandle(key, value);
  }

  render() {
    const params = this.props.assetTransactionStore.assetLocalParams;
    const assets = params.assetGt || params.assetLt ? `${params.assetGt},${params.assetLt}` : '';
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
            <span className={styles.label}>转让机构</span>
            <div className={styles.select}>
              <Select
                width="120px"
                value={params.assignorType}
                disabledStyle={params.assetType === '拍卖资产' ? true : false}
                onChange={this.changeSelect.bind(this, 'assignorType')}>
                {this.assignorSelectList()}
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
          <div className={`clearfix ${styles.assetLocalSwitchData}`}>
            <span className={styles.label}>资产类型</span>
            <div className={styles.select}>
              <Select
                width="120px"
                value={params.assetType}
                onChange={this.changeSelect.bind(this, 'assetType')}>
                {this.typeSelectList(params)}
              </Select>
            </div>
          </div>
        </div>
        <div className={styles.cardList}>
          <CardList
            assetLocalLoading={this.props.assetTransactionStore.assetLocalLoading}
            assetLocalData={this.props.assetTransactionStore.assetLocalData}
            getAssetLocalDetail={this.props.assetTransactionStore.getAssetLocalDetail}
            openDetailModal={this.props.detailModalStore.openDetailModal} />
        </div>
      </div>
    );
  }
}
