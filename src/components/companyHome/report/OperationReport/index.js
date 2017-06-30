import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import styles from './index.less';

function OperationReport({operationDataList}) {
  const data = operationDataList.data;
  const dataDom = [];
  let idx = 0;
  let noData = '';
  if (data) {
    Object.keys(data).map(key => {
      noData = key ? '' : (<div className={styles.noData}>暂无数据</div>);
      dataDom.push(
        <tr key={`${idx}operation`}>
          <td>{key}年</td>
          <td>{data[key].CWFYZB}%</td>
          <td>{data[key].GLFYZB}%</td>
          <td>{data[key].XSFYZB}%</td>
          {noData}
        </tr>
      );
      idx++;
    });
  }
  return (
    <div>
      <p className={styles.excelTitle}>指标列表
        <span className={styles.timestamp}>（最近分析时间：{this.props.operationDataList.lastTm}）</span>
      </p>
      <table className={styles.table}>
        <thead>
        <tr>
          <th className={styles.first}>
            <div className={styles.slash}/>
          </th>
          <th className={styles.two}>财务费用率</th>
          <th className={styles.three}>管理费用率</th>
          <th className={styles.four}>销售费用率</th>
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
              <span className={styles.definitionName}>营运能力：</span>
              是指企业充分利用现有资源创造社会财富的能力,它可以用来评价企业对其拥有资源的利用程度和营运活动能力。
              其实质是要以尽可能少的资源,尽可能短的周转时间,产生出尽可能多的产品,创造出尽可能多的销售收入，具体指标如下：
            </p>
          </div>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>财务费用率=（财务费用÷销售收入）×100%</span>
          </p>
          <p className={styles.content}>
            分析企业的财务负担，调整筹资渠道，改善资金结构，提高盈利水平</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>管理费用率=（管理费用÷销售收入）×100%</span>
          </p>
          <p className={styles.content}>影响企业盈利能力的重要因素，反映企业经营管理水平，管理费用率越高，企业利润被组织、管理性费用消耗得太多，必须加强管理费用控制才能提高盈利水平</p>
          <p className={styles.line}/>
          <p className={styles.formula}>
            <span className={styles.point}/>
            <span className={styles.formulaFonts}>销售费用率=（销售费用÷销售收入）×100%</span>
          </p>
          <p className={styles.content}>体现企业为取得单位收入所花费的单位销售费用，或者销售费用占据了营业收入的比例，在销售额一定的情况下，销售费用越低，企业效益越好</p>
        </div>
      </div>
    </div>
  );
}

OperationReport.propTypes = {
  loaningStore: PropTypes.object,
};
export default observer(OperationReport);
