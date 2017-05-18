import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';

import styles from './index.less';
import cityName from 'helpers/cityName';
import { Row, Col } from 'components/common/layout';
import DateCheck from 'components/assetTransaction/DateCheck';
import Select from 'components/lib/Select';

import ChartWrap from './ChartWrap';

const Option = Select.Option;
@inject('assetTransactionStore')
@observer
export default class TradeTrend extends Component {
  static propTypes = {
    assetTransactionStore: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      current: '近30天'
    };
  }

  componentDidMount() {
    const params = {
      startDate: moment().subtract(29, 'days').format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      region: ''
    };
    this.props.assetTransactionStore.setTradeTrendParams(params);
    this.props.assetTransactionStore.getAssetTrend(params);
  }

  getValueArry = (type, key, arry) => {
    const output = [];
    arry.forEach((item) => {
      const value = type === 'money' ? (item[key] / 10000.00).toFixed(2) : item[key];
      output.push(value);
    });
    return output;
  }

  changeDate = (dateAry, item) => {
    this.setState({
      current: item,
    });
    const params = toJS(this.props.assetTransactionStore.tradeTrendParams);
    params.startDate = dateAry[0];
    params.endDate = dateAry[1];
    this.filterTrend(params);
  }

  createLocalOpt() {
    const output = [];
    output.push(
      <Option value="" key="tradeTrendSelectKey0">
        全国
      </Option>
    );
    cityName.forEach((item, key) => {
      output.push(
        <Option value={item} key={`tradeTrendSelectKey${key + 1}`}>
          {item}
        </Option>
      );
    });
    return output;
  }

  filterTrend(params) {
    this.props.assetTransactionStore.setTradeTrendParams(params);
    this.props.assetTransactionStore.getAssetTrend(params);
  }

  changeRegion = (region) => {
    const params = toJS(this.props.assetTransactionStore.tradeTrendParams);
    params.region = region;
    this.filterTrend(params);
  }

  createOpton = (type, trend) => {
    const data = trend[type] || [];
    const config = {
      transactionData: {
        money: ['transactionTotalAll', 'transactionTotal'],
        counts: ['transactionSumAll', 'transactionSum'],
        seriesName: ['交易资产总量', '交易笔数总量'],
        label: ['交易资产增量', '交易笔数增量']
      },
      auctionData: {
        money: ['auctionTotalAll', 'auctionTotal'],
        counts: ['auctionSumAll', 'auctionSum'],
        seriesName: ['拍卖资产总量', '拍卖笔数总量'],
        label: ['交易资产增量', '拍卖笔数增量']
      },
    };
    const moneyAry = this.getValueArry('money', config[type].money[0], data);
    const countsAry = this.getValueArry('other', config[type].counts[0], data);
    const option = {
      dataZoom: [
        {
          type: 'slider',
          bottom: 0,
          dataBackground: {
            areaStyle: {
              color: '#eeeeee',
            },
          },
          fillerColor: 'rgba(230, 230, 230, 0.4)',
          handleStyle: {
            color: '#dddddd'
          },
        },
        {
          type: 'inside',
        },
      ],
      color: ['#c23531', '#55979F'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        backgroundColor: '#ffffff',
        padding: [0, 0],
        formatter: (ticket) => {
          const addMonKey = config[type].money[1];
          const countKey = config[type].counts[1];
          const str = `
          <div style="box-shadow: 0 0 7px #dddddd; padding: 15px 20px; background-color: #ffffff">
            <p>
              <a style="color:#000;">
                ${ticket[0].name}
              </a>
            </p>
            <p style="padding-bottom: 3px;">
              <a style="color: #c23531;">
                <span style="padding-right: 15px">${ticket[0].seriesName}</span>
                <span>${ticket[0].value}</span>万元
              </a>
            </p>
            <p style="padding-bottom: 3px;">
              <a style="color: #c23531;">
                <span style="padding-right: 15px">${config[type].label[0]}</span>
                <span>${(data[ticket[0].dataIndex][addMonKey] / 10000.00).toFixed(2)}</span>万元
              </a>
            </p>
            <p>
              <a style="color: #55979F;">
                <span style="padding-right: 15px">${ticket[1].seriesName}</span>
                <span>${ticket[1].value}</span>笔
              </a>
            </p>
            <p>
              <a style="color: #55979F;">
                <span style="padding-right: 15px">${config[type].label[1]}</span>
                <span>${data[ticket[0].dataIndex][countKey]}</span>笔
              </a>
            </p>
          </div>`;
          return str;
        },
      },
      grid: {
        top: '70',
        left: '3%',
        right: '6%',
        bottom: '45',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.getValueArry('other', '_id', data),
        boundaryGap: false,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: ['#f5f5f5']
          }
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#e5e5e5',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#999999',
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#999999',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#999999',
            },
          },
        }
      ],
      series: [
        {
          name: config[type].seriesName[0],
          type: 'line',
          data: moneyAry,
        },
        {
          name: config[type].seriesName[1],
          type: 'line',
          yAxisIndex: 1,
          data: countsAry,
        }
      ]
    };
    return option;
  }

  render() {
    const message = {
      '近7天': '近7天同比：近7天与上月同7天对比； 近7天环比：近7天与上一个7天对比',
      '近30天': '近30天同比：近30天与去年同30天对比； 近30天环比：近30天与上一个30天对比',
      '近一季': '近一季度同比：近一季度与去年同一季度对比； 近一季度环比：近一季度与上一季度对比',
      '近半年': '近半年同比：近半年与去年同一半年对比； 近半年环比：近半年与上一半年对比',
      '近一年': '近一年同比：近一年与上一年对比； 近一年环比：近一年与上一年对比',
    };
    const params = this.props.assetTransactionStore.tradeTrendParams;
    const tradeTrendData = this.props.assetTransactionStore.tradeTrendData;
    const tradeTrendLoading = this.props.assetTransactionStore.tradeTrendLoading;
    const transactionArr = [
      tradeTrendData.transactionTotalYoY,
      tradeTrendData.transactionTotalLR,
      tradeTrendData.transactionSumYoY,
      tradeTrendData.transactionSumLR
    ];
    const auctionArr = [
      tradeTrendData.auctionTotalYoY,
      tradeTrendData.auctionTotalLR,
      tradeTrendData.auctionSumYoY,
      tradeTrendData.auctionSumLR
    ];
    const tradeOpt = this.createOpton('transactionData', tradeTrendData);
    const auctionOpt = this.createOpton('auctionData', tradeTrendData);
    return (
      <div>
        <div className="clearfix">
          <div className={styles.fLeft}>
            <span className={styles.label}>地区</span>
            <div className={styles.fLeft}>
              <Select
                defaultValue={params.region}
                onChange={this.changeRegion}
                value={params.region}>
                {this.createLocalOpt()}
              </Select>
            </div>
          </div>
          <div className={styles.fLeft}>
            <DateCheck checkChange={this.changeDate} />
          </div>
        </div>
        <Row>
          <Col width="6">
            <ChartWrap
              chartId="tradeChart"
              title="交易资产总量走势图"
              subTitle={['交易金额', '交易笔数']}
              message={message[this.state.current]}
              tradeTrendLoading={tradeTrendLoading}
              data={transactionArr}
              chartData={this.props.assetTransactionStore.transactionData}
              option={tradeOpt}
            />
          </Col>
          <Col width="6">
            <ChartWrap
              chartId="auctionChart"
              title="拍卖资产总量走势图"
              subTitle={['拍卖金额', '拍卖笔数']}
              message={message[this.state.current]}
              tradeTrendLoading={tradeTrendLoading}
              data={auctionArr}
              chartData={this.props.assetTransactionStore.auctionData}
              option={auctionOpt} />
          </Col>
        </Row>
      </div>
    );
  }
}
