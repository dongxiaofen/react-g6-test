import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import LoanDemo from 'components/common/report/LoanDemo';

function CashFlowAnaly({}) {
  return (
    <div>
      <LoanDemo type="new"/>
        <div>
          <p className={styles.title}>指标解析</p>
          <div className={styles.analysisContent}>
            <div className={styles.titleContent}>
              <p className={styles.definition}>
                <span className={styles.definitionName}>现金流分析：</span>
                对企业一定时期的现金和现金等价物的流入和流出的数量进行分析</p>
            </div>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>债务保障率=（经营活动净现金净流量÷负债总额）×100%</span>
            </p>
            <p className={styles.content}>以本期经营活动所产生的净现金流量来衡量偿还全部负债的能力，比率越大，偿债能力越强。</p>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>销售现金比率=（经营活动现金流量净额÷销售收入）×100%</span>
            </p>
            <p className={styles.content}>反映每元销售收入得到的现金流量净额，其数值越大越好，表明企业的收入质量越好，资金利用效果越好。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>全部资产现金回收率=（营业净现金流入÷全部资产）×100%</span>
            </p>
            <p className={styles.content}>反映企业运用全部资产获取现金的能力。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>现金到期债务比=（营业现金净流量÷本期到期的债务）×100%，营业现金流量=税后净利+折旧</span>
            </p>
            <p className={styles.content}>反映了企业可用现金流量偿付到期债务的能力，该比率越高，企业资金流动性越好，企业到期偿还债务的能力就越强。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>现金流动负债比=（经营现金净流量÷流动负债）×100%</span>
            </p>
            <p className={styles.content}>反映企业当期偿付短期负债的能力。一般该指标大于1，表示企业流动负债的偿还有可靠保证。该指标越大，表明企业经营活动产生的现金净流量越多，越能保障企业按期偿还到期债务，但也并不是越大越好，该指标过大则表明企业流动资金利用不充分，盈利能力不强。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>现金债务总额比=（经营活动现金净流量÷总额与债务总额）×100%。</span>
            </p>
            <p className={styles.content}>衡量企业承担债务和评估企业中长期偿债能力的重要指标，同时它也是预测企业破产的可靠指标。这一比率越高，企业承担债务的能力越强，破产的可能性越小。这一比率越低，企业财务灵活性越差，破产的可能性越大。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>现金满足投资比率=[经营活动现金净流量÷（资本支出+存货增加+现金股利）]×100</span>
            </p>
            <p className={styles.content}>反映经营活动现金满足主要现金需求的程度，用于衡量企业维持或扩大生产经营规模的能力，比率越大，资金自给率越高。</p>
              <p className={styles.line} />
              <p className={styles.formula}>
                <span className={styles.point} />
                <span className={styles.formulaFonts}>现金营运指数=（经营现金流量÷经营所得现金）×100</span>
              </p>
              <p className={styles.content}>反映企业经营活动现金流量与企业经营所得现金（经营现金毛流量）的比值，理想的现金营运指数应为1。</p>
          </div>
        </div>
    </div>
  );
}

CashFlowAnaly.propTypes = {
  foo: PropTypes.string,
};
export default observer(CashFlowAnaly);
