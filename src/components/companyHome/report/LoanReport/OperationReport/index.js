import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function OperationReport({}) {
  return (
    <div>
      <p>指标列表</p>
      <tbody>
      <table>
        <tr>
          <td>指标</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>财务费用率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>销售费用率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
      </table>
      </tbody>
      <div>指标解析</div>
      <p><span>营运能力</span>是指企业充分利用现有资源创造社会财富的能力,它可以用来评价企业对其拥有资源的利用程度和营运活动能力。
        其实质是要以尽可能少的资源,尽可能短的周转时间,产生出尽可能多的产品,创造出尽可能多的销售收入，具体指标如下：</p>
      <p><image/>财务费用率=（财务费用÷销售收入)×100%</p>
      <p>分析企业的财务负担，调整筹资渠道，改善资金结构，提高盈利水平。</p>
      <p><image/>管理费用率=（管理费用÷销售收入）×100%</p>
      <p>影响企业盈利能力的重要因素，反映企业经营管理水平，管理费用率越高，企业利润被组织、管理性费用消耗得太多，必须加强管理费用控制才能提高盈利水平。</p>
      <p><image/>销售费用率=（销售费用÷销售收入）×100%</p>
      <p>体现企业为取得单位收入所花费的单位销售费用，或者销售费用占据了营业收入的比例，在销售额一定的情况下，销售费用越低，企业效益越好。</p>
    </div>
  );
}

OperationReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(OperationReport);
