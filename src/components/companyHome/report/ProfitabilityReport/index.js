/**
 * 营收能力分析
 */
import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
// import LoanDemo from 'components/common/report/LoanDemo';

function ProfitabilityReport({profitDataList}) {
  const dataDom = [];
  const data = profitDataList.data;
  let idx = 0;
  let noData = '';
  if (data) {
    Object.keys(data).map(key => {
      noData = key ? '' : (<div className={styles.noData}>暂无数据</div>);
      dataDom.push(
        <tr key={`${idx}profit`}>
          <td>{key}年</td>
          <td>{data[key].XSMLL ? data[key].XSMLL : ''}%</td>
          <td>{data[key].XSJLL ? data[key].XSJLL : ''}%</td>
          <td>{data[key].YYJLL ? data[key].YYJLL : ''}%</td>
          <td>{data[key].CBFYJLL ? data[key].CBFYJLL : ''}%</td>
          <td>{data[key].ZYYWLRL ? data[key].ZYYWLRL : ''}%</td>
          <td>{data[key].ZCJLL ? data[key].ZCJLL : ''}%</td>
          {noData}
        </tr>
      );
      idx++;
    });
  }
  return (
    <div className={styles.box}>
      {/*<LoanDemo type="profit"/>*/}
      <p className={styles.excelTitle}>指标列表
        <span className={styles.timestamp}>（最近分析时间：{this.props.profitDataList.lastTm}）</span>
      </p>
      <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.first}>
            <div className={styles.slash}/>
          </th>
          <th className={styles.two}>销售毛利率</th>
          <th className={styles.three}>销售净利率</th>
          <th className={styles.four}>营业净利率</th>
          <th className={styles.five}>成本费用净利率</th>
          <th className={styles.five}>主营业务利润率</th>
          <th className={styles.five}>资产净利率</th>
        </tr>
        </thead>
        <tbody>
        {dataDom}
        </tbody>
      </table>
      <div>
        <p className={styles.title}>指标解析</p>
        <div className={styles.analysisContent}>
          <div className={styles.titleContent}>
            <p className={styles.definition}>
              <span className={styles.definitionName}>盈利能力：</span>
              指企业获取利润的能力，企业盈利能力越强，企业价值越大，具体指标如下：</p>
          </div>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>销售毛利率=（（营业收入-营业成本）÷营业收入）×100%</span>
          </p>
          <p className={styles.content}>反应企业产品销售的初始获利能力，是企业净利润的起点，没有足够高的毛利率不能形成较大的盈利，
            该指标的优点在于可以对企业某一主要产品或主要业务的盈利状况进行分析，这对于判断企业核心竞争力的变化趋势极有帮助</p>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>销售净利率=（净利润÷营业收入）×100%</span>
          </p>
          <p className={styles.content}>衡量企业在一定时期的销售收入获取的能力，通过分析销售净利率的升降变动，可以促使企业在扩大销售的同时，注意改进经营管理，提高盈利水平</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>营业净利率=（营业利润÷营业收入）×100%</span>
          </p>
          <p className={styles.content}>比率越高企业获利能力越大</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>成本费用净利率=（利润总额÷成本费用总额）×100%</span>
          </p>
          <p className={styles.content}>反应企业生产经营过程中发生的耗费与获得的收益之间的关系，比率越高，企业为获取收益而付出的代价越小，企业的获利能力越强</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>主营业务利润率=（主营业务利润÷主营业务收入）×100%</span>
          </p>
          <p className={styles.content}>反应主营业务（其他业务所占比例一般较小）收益在企业整理收益中的比重，比率越高，公司主营业务越突出，生产经营相对稳定</p>
        </div>
      </div>
    </div>
  );
}

ProfitabilityReport.propTypes = {
  profitDataList: PropTypes.object,
};
export default observer(ProfitabilityReport);
