import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
import {browserHistory} from 'react-router';

import noDataChart from 'imgs/loading/noDataChart.png';
function ErrorText({module, error, errCategory = 0, height, errorWords, path}) {
  const dict = {
    '基本信息': '暂无信息，可能存在时间相对滞后或工商未公示的情况',
    '税务信息': '暂无税务公示信息',
    '工商行政处罚': '暂无信息，可能存在时间相对滞后或工商未公示的情况',
    '土地转让信息': '暂无信息，可能存在时间相对滞后或中国土地市场网未公示的情况',
    '动产融资信息': '暂无信息，可能存在时间相对滞后或中国人民银行征信中心动产融资统一登记系统未公示的情况',
    '成立时间': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '公司电话': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '公司邮箱': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '公司地址': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '注册信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '股东信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '主要人员': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '分支机构': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '变更分析': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '变更信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '企业基本信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '网站或网店信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '股东及出资信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '企业资产状况信息(单位：万元)': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '股权变更信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '修改记录': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '法务统计图': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '法务统计表': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '法院公告': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '开庭公告': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '判决文书': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '被执行人信息': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '失信被执行人信息': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '老赖记录': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '涉诉资产': '暂无信息，可能存在时间相对滞后或法院未公示情况，仅供参考',
    '纳税信用': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '经营异常信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '抽查检查信息': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '违法记录': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '企业对外投资': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '董监高对外投资': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '法人对外投资': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '法人对外任职': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '股权质押': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '股权转让': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '股权冻结': '暂无信息，可能存在时间相对滞后或工商未公示情况，仅供参考',
    '纳税公告': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '关联图': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '风险关联图': '没有查询到相关风险信息',
    '关联时序图': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '商标': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '专利信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '公司标签': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '公司描述': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '运营信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    'App产品': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '其他产品': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '产业链': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '时间轴': '暂无信息，可能存在时间滞后或未公开的情况，仅供参考',
    '时间轴事件': '暂无信息，可能存在时间滞后或未公开的情况，仅供参考',
    '新闻分析': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '新闻内容': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '招聘职位详情': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '行业对比': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '近期招聘职位': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '详情': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '分析': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '近期相关行业报告': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '反馈详情': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '招聘分析': '暂无信息，可能存在时间滞后或未公开的情况，仅供参考',
    '员工背景': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '招投标信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '招聘信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '近期招聘信息': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '新增招聘地点/岗位': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '趋势分析': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '流通股东': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '公司概况': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '高管': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '十大股东': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '公告列表': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计地区分布': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计地区排行': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计地区变化趋势': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计地区企业地区分布': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计行业统计': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计行业变化趋势': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计头条趋势分析': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '监控统计头条类型分析': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '高级查询报告列表': '抱歉，没有找到相关的结果',
    '深度分析报告列表': '抱歉，没有找到相关的结果',
    '收藏列表': '抱歉，没有找到相关的结果',
    '监控列表': '抱歉，没有找到相关的结果',
    '企业预警列表': '抱歉，没有找到相关的结果',
    '预警列表': '暂无预警设置',
    '现勘列表': '还没有该公司的现勘记录，可以通过手机端添加~',
    '盈利能力指标': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '成长能力指标': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '营运能力指标': '暂无信息，可能存在时间相对滞后或未公示情况，仅供参考',
    '我的账号最新预警企业（已创建）': '您监控的企业尚未触发预警，如需查看预警规则，请访问预警设置',
    '我的账号最新预警企业（未创建）': '您还未创建监控，请前往搜索进行创建',
    '我的账号预警企业排名（已创建）': '您监控的企业尚未触发预警，如需查看预警规则，请访问预警设置',
    '我的账号预警企业排名（未创建）': '您还未创建监控，请前往搜索进行创建',
    '我的账号综合评分最低企业（未创建）': '您还未创建分析，请前往搜索进行创建',
    '子账号最新预警企业（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号最新预警企业（有子账号，未创建）': '您下属子账号未创建监控',
    '子账号最新预警企业（有子账号，已创建）': '您下属子账号的监控企业未触发预警',

    '子账号预警企业排名（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号预警企业排名（有子账号，未创建）': '您下属子账号未创建监控',
    '子账号预警企业排名（有子账号，已创建）': '您下属子账号的监控企业未触发预警',

    '子账号综合评分最低企业（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号综合评分最低企业（有子账号）': '您下属子账号未创建分析',

    '子账号最新预警账号（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号最新预警账号（有子账号，未创建）': '您下属子账号未创建监控',
    '子账号最新预警账号（有子账号，已创建）': '您下属子账号的监控企业未触发预警',

    '子账号最新命中预警（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号最新命中预警（有子账号，未创建）': '您下属子账号未创建监控',
    '子账号最新命中预警（有子账号，已创建）': '您下属子账号的监控企业未触发预警',

    '子账号近期最活跃规则（无子账号）': '您未创建子账号，请前往账号中心创建',
    '子账号近期最活跃规则（有子账号，未设置规则）': '您下属子账号无预警规则',
    '子账号近期最活跃规则（有子账号，已设置规则）': '您下属子账号的预警规则未被触发',
  };
  const jumpPage = () => {
    browserHistory.push(path);
  };
  const linkText = () => {
    const errorTips = dict[module] || error.message || '暂无信息';
    const linkUrl = <span className={styles.errorWords} onClick={jumpPage.bind(this)}>{errorWords}</span>;
    const frontText = errorTips.slice(0, errorTips.indexOf(errorWords));
    const endText = errorTips.slice(errorTips.indexOf(errorWords) + errorWords.length, errorTips.length + 1);
    return (
      <span>
        <span>{frontText}</span>
        {linkUrl}
         <span>{endText}</span>
        </span>
    );
  };
  switch (errCategory) {
    case 0:
      return (
        <div className={styles.msgBox}>
          <div className={`clearfix ${styles.msgItem}`}>
            <div className={styles.msgImg}></div>
            <div className={styles.msgText}>
              {dict[module] || error.message || '暂无信息'}
            </div>
          </div>
        </div>
      );
    case 1:
      const imgStyleHeght = height ? {height: height} : {};
      return (
        <div className={styles.noDataImgBox} style={imgStyleHeght}>
          <div className={styles.noDataContent}>
            <div className={`clearfix ${styles.noDataBox}`}>
              <div className={styles.noDataImg}>
                <img src={noDataChart}/>
              </div>
              <div className={styles.noDataText}>
                {dict[module] || error.message || '暂无信息'}
              </div>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={styles.noDataList}>
          <div className={styles.imageBox}></div>
          <div className={styles.tips}>
            {dict[module] || error.message || '暂无信息'}
          </div>
        </div>
      );
    case 3:
      return (
        <div className={styles.msgBox_noColor}>
          <div className={`clearfix ${styles.msgItem}`}>
            <div className={styles.msgImg}></div>
            <div className={styles.msgText}>
              { linkText() }
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className={styles.noDataList}>
          <div className={styles.imageBoxNowRecord}></div>
          <div className={styles.tipsNowRecord}>
            {dict[module] || error.message || '暂无信息'}
          </div>
        </div>
      );
    default:
      break;
  }
}
ErrorText.propTypes = {
  module: PropTypes.string,
  errCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  path: PropTypes.string,
  errorWords: PropTypes.string,
};
export default observer(ErrorText);
