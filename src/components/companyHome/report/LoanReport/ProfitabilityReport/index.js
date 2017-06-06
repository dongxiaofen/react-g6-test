import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function ProfitabilityReport({}) {
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
          <td>销售毛利率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>销售净利率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>营业净利率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>成本费用净利率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
        <tr>
          <td>主营业务利润率</td>
          <td>{this.props.report.firstYear}</td>
          <td>{this.props.report.lastYear}</td>
        </tr>
      </table>
      </tbody>
      <div>指标解析</div>
      <p><span>盈利能力</span>指企业获取利润的能力，企业盈利能力越强，企业价值越大，具体指标如下：</p>
      <p>
        <image />
        销售毛利率=（(营业收入-营业成本)÷营业收入)×100%
      </p>
      <p>反应企业产品销售的初始获利能力，是企业净利润的起点，没有足够高的毛利率不能形成较大的盈利，
        该指标的优点在于可以对企业某一主要产品或主要业务的盈利状况进行分析，这对于判断企业核心竞争力的变化趋势极有帮助。</p>
      <p>
        <image />
        销售净利率=(净利润÷营业收入)×100%
      </p>
      <p>衡量企业在一定时期的销售收入获取的能力，通过分析销售净利率的升降变动，可以促使企业在扩大销售的同时，注意改进经营管理，提高盈利水平。</p>
      <p>
        <image />
        营业净利率=(营业利润÷营业收入)×100%
      </p>
      <p>比率越高企业获利能力越大。</p>
      <p>
        <image />
        成本费用净利率=(利润总额÷成本费用总额)×100%
      </p>
      <p>反应企业生产经营过程中发生的耗费与获得的收益之间的关系，比率越高，企业为获取收益而付出的代价越小，企业的获利能力越强。</p>
      <p>
        <image />
        主营业务利润率=（主营业务利润÷主营业务收入）×100%
      </p>
      <p>反应主营业务（其他业务所占比例一般较小）收益在企业整理收益中的比重，比率越高，公司主营业务越突出，生产经营相对稳定。</p>
    </div>
  );
}

ProfitabilityReport.propTypes = {
  foo: PropTypes.string,
};
export default observer(ProfitabilityReport);
