import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import LoanDemo from 'components/common/report/LoanDemo';

function DebtPayAbilityEval({}) {
  return (
    <div>
      <LoanDemo type="new"/>
        <div>
          <p className={styles.title}>指标解析</p>
          <div className={styles.analysisContent}>
            <div className={styles.titleContent}>
              <p className={styles.definition}>
                <span className={styles.definitionName}>企业偿债能力分析：</span>
                是反映企业财务状况和经营能力的重要标志，包括短期和长期偿债能力分析</p>
            </div>
            <p className={styles.subTitle}>短期偿债能力：</p>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>流动比率=(流动资产÷流动负债)×100%</span>
            </p>
            <p className={styles.content}>衡量企业流动资产在短期债务到期以前，可以变为现金用于偿还负债的能力。一般说来，比率越高，说明企业资产的变现能力越强，短期偿债能力亦越强；反之则弱。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>速动比率=（速动资产÷流动负债）×100%</span>
            </p>
            <p className={styles.content}>衡量企业流动资产中可以立即变现用于偿还流动负债的能力。速动资产包括货币资金、短期投资、应收票据、应收账款及其他应收款，可以在较短时间内变现。而流动资产中存货及1年内到期的非流动资产不应计入。</p>
            <p className={styles.subTitle}>长期偿债能力：</p>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>资产负债率＝（负债总额÷资产总额）×100%</span>
            </p>
            <p className={styles.content}>表示公司总资产中有多少是通过负债筹集的。资产负债率是评价公司负债水平的综合指标，同时也是一项衡量公司利用债权人资金进行经营活动能力的指标，反映债权人发放贷款的安全程度。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>产权比率=（负债总额÷所有者权益总额）×100%</span>
            </p>
            <p className={styles.content}>一般来说，产权比率可反映股东所持股权是否过多（或者是否不够充分）等情况，侧面表明企业借款经营的程度，衡量企业长期偿债能力的指标，也是企业财务结构稳健与否的重要标志。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>有形净值债务率=（企业负债总额÷（股东权益-无形资产净值））×100%，有形净值=股东权益-无形资产净值</span>
            </p>
            <p className={styles.content}>衡量企业的风险程度和对债务的偿还能力；指标越大，风险越大，企业长期偿债能力越弱；反之，风险越小，企业长期偿债能力越强。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>已获利息倍数=上市公司息税前利润÷所需支付债务利息</span>
            </p>
            <p className={styles.content}>分析公司在一定盈利水平下支付债务利息的能力。</p>
          </div>
        </div>
    </div>
  );
}

DebtPayAbilityEval.propTypes = {
  foo: PropTypes.string,
};
export default observer(DebtPayAbilityEval);
