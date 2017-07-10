import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';
// import LoanDemo from 'components/common/report/LoanDemo';

function GrowingReport({upDataList}) {
  const data = upDataList.data;
  const dataDom = [];
  let idx = 0;
  if (data) {
    Object.keys(data).map(key => {
      let item = (
        <tr key={`${idx}up`}>
          <td>{key}年</td>
          <td colSpan={5} className={styles.noData}>暂无数据</td>
        </tr>
      );
      if (data[key]) {
        item = (
          <tr key={`${idx}up`}>
            <td>{key}年</td>
            <td>{data[key] && (data[key].XSZZL || data[key].XSZZL === 0) ? data[key].XSZZL : ''}%</td>
            <td>{data[key] && (data[key].JLRZZL || data[key].JLRZZL === 0) ? data[key].JLRZZL : ''}%</td>
            <td>{data[key] && (data[key].YYLRZZL || data[key].YYLRZZL === 0) ? data[key].YYLRZZL : ''}%</td>
            <td>{data[key] && (data[key].ZYYWSRBDL || data[key].ZYYWSRBDL === 0) ? data[key].ZYYWSRBDL : ''}%</td>
          </tr>
        );
      }
      dataDom.push(item);
      idx++;
    });
  }
  return (
    <div className={styles.box}>
      <p className={styles.excelTitle}>指标列表
        <span className={styles.timestamp}>（最近分析时间：{this.props.upDataList.lastTm}）</span>
      </p>
      <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.first}>
            <div className={styles.slash}/>
          </th>
          <th className={styles.three}>销售增长率</th>
          <th className={styles.four}>净利润增长率</th>
          <th className={styles.five}>营业利润增长率</th>
          <th className={styles.five}>主营业务收入变动率</th>
        </tr>
        </thead>
        <tbody>
        {dataDom}
        </tbody>
      </table>
      {/*<LoanDemo type="growth"/>*/}
      <div>
        <p className={styles.title}>指标解析</p>
        <div className={styles.analysisContent}>
          <div className={styles.titleContent}>
            <p className={styles.definition}>
              <span className={styles.definitionName}>企业成长能力：</span>
              是指企业未来发展趋势与发展速度，包括企业规模的扩大，利润和所有者权益的增加，具体指标如下：</p>
          </div>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>销售增长率</span>
          </p>
          <p className={styles.content}>
            衡量企业经营状况和市场占有能力，预测企业经营业务拓展趋势的重要指标，也是企业扩张增量资本和存量资本的重要前提</p>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>净利润增长率</span>
          </p>
          <p className={styles.content}>净利润增长率越大，代表企业盈利能力越强</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>营业利润增长率</span>
          </p>
          <p className={styles.content}>反映企业营业利润的增长变动情况，营业利润越高，说明企业商品销售额提供的营业利润越多，企业的营业能力越强</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>主营业务收入变动率</span>
          </p>
          <p className={styles.content}>反映企业经营稳定性与增长情况（注：对于年度数据，基期指上期；对于月度（季度）数据基期指上一年相同月度（季度）)</p>
        </div>
      </div>
    </div>
  );
}

GrowingReport.propTypes = {
  upDataList: PropTypes.object,
};
export default observer(GrowingReport);
