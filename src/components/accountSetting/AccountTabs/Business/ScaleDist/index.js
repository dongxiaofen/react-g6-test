import React from 'react';
import { observer } from 'mobx-react';
import { loadingComp } from 'components/hoc';
import Chart from 'components/common/Charts/ResizeChart';
import styles from './index.less';
function ScaleDist({accountSettingStore}) {
  const data = accountSettingStore.tabs.business.scale.data;
  const generateItem = ({name, color, typeKey}) => {
    return {
      name: name,
      value: data[typeKey + 'Company'],
      monitor: data[typeKey + 'Monitor'],
      analysisReport: data[typeKey + 'AnalysisReport'],
      report: data[typeKey + 'Report'],
      itemStyle: {
        normal: {
          color: color,
        }
      },
    };
  };
  const seriesConf = [
    {name: '大型企业', color: '#3483E8', typeKey: 'large'},
    {name: '大中型企业', color: '#43BF77', typeKey: 'largeAndMiddle'},
    {name: '中型企业', color: '#9BCB65', typeKey: 'middle'},
    {name: '小型企业', color: '#FEBD3D', typeKey: 'small'},
    {name: '微型企业', color: '#E25252', typeKey: 'mini'},
  ];
  const seriesData = seriesConf.map(item => {
    return generateItem(item);
  });
  const scaleDistOption = {
    tooltip: {
      backgroundColor: '#ffffff',
      padding: [0, 0],
      formatter: (ticket) => {
        const str = `
        <div style="box-shadow: 0 0 7px #ddd; padding: 15px 20px; background-color: #fff">
          <p style="text-align: center;">
            <a style="color:${ticket.color};">
              ${ticket.name} 共${ticket.value}家企业
            </a>
          </p>
        </div>`;
        return str;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            show: false,
          }
        },
        data: seriesData,
      }
    ]
  };
  const labelConf = [
    {name: '大型企业', desc: '注册资金1000万以上', color: '#3483e9'},
    {name: '大中型企业', desc: '注册资金500-1000万', color: '#43bf77'},
    {name: '中型企业', desc: '注册资金200-500万', color: '#9bcb65'},
    {name: '小型企业', desc: '注册资金50-200万', color: '#ffbd3d'},
    {name: '微型企业', desc: '注册资金50万以下', color: '#e25252'},
  ];
  const createLabel = () => {
    return labelConf.map(item => {
      return (
        <div className={styles.labelItem} key={item.name}>
          <div className={styles.labelRow}>
            <span className={styles.labelIcon} style={{backgroundColor: item.color}}></span>
            <span className={styles.labelName}>{item.name}</span>
          </div>
          <p className={styles.labelDesc}>{item.desc}</p>
        </div>
      );
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.labelBox}>
        {createLabel()}
      </div>
      <Chart
        chartId="scaleDist"
        height="500"
        option={scaleDistOption} />
    </div>
  );
}
export default loadingComp({
  mapDataToProps: props => ({
    loading: props.accountSettingStore.tabs.business.scale.data === undefined ? true : false,
    error: props.accountSettingStore.tabs.business.scale.error,
    height: 500,
    errCategory: 1,
    category: 0,
  }),
})(observer(ScaleDist));
