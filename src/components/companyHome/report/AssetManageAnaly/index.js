import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import LoanDemo from 'components/common/report/LoanDemo';

function AssetManageAnaly({}) {
  return (
    <div>
      <LoanDemo type="new"/>
        <div>
          <p className={styles.title}>指标解析</p>
          <div className={styles.analysisContent}>
            <div className={styles.titleContent}>
              <p className={styles.definition}>
                <span className={styles.definitionName}>资产管理能力：</span>
                用于衡量企业进行资产管理的效率，反映企业运用资产的营运能力方面的财务比率</p>
            </div>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>存货周转率=（销售成本÷平均存货余额）×100%，平均存货余额=（期初存货+期末存货）÷2</span>
            </p>
            <p className={styles.content}>反映存货的周转速度，即存货的流动性及存货资金占用量是否合理，促使企业在保证生产经营连续性的同时，提高资金的使用效率，增强企业的短期偿债能力。</p>
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>存货周转天数=取得存货日期-消耗、销售为止日期</span>
            </p>
            <p className={styles.content}>周转天数越少，说明存货变现的速度越快，民间非营利组织资金占用在存货的时间越短，存货管理工作的效率越高。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>应收账款周转率=[赊销收入净额÷(（期初应收账款+期末应收账款）÷2)]×100%</span>
            </p>
            <p className={styles.content}>一般情况下，应收账款周转率越高越好，周转率高，表明收账迅速，账龄较短；资产流动性强，短期偿债能力强；可以减少坏账损失等。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>营业周期=存货周转天数+应收账款周转天数</span>
            </p>
            <p className={styles.content}>营业周期的长短是决定公司流动资产需要量的重要因素。较短的营业周期表明对应收账款和存货的有效管理，一般情况下，营业周期短，说明资金周转速度快;营业周期长，说明资金周转速度慢。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>流动资产周转率=（主营业务收入净额÷平均流动资产总额）×100%</span>
            </p>
            <p className={styles.content}>在一定时期内，流动资产周转次数越多，表明以相同的流动资产完成的周转额越多，流动资产利用的效果越好。流动资产周转率用周转天数表示时，周转一次所需要的天数越少，表明流动资产在经历生产和销售各阶段时占用的时间越短，周转越快。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>总资产周转率=（营业收入净额÷平均资产总额）×100%</span>
            </p>
            <p className={styles.content}>反应综合评价企业全部资产的经营质量和利用效率的重要指标。周转率越大，说明总资产周转越快，反映出销售能力越强。企业可以通过薄利多销的办法，加速资产的周转，带来利润绝对额的增加。</p>
            <p className={styles.line} />
            <p className={styles.formula}>
              <span className={styles.point} />
              <span className={styles.formulaFonts}>总资产周转天数=365÷总资产周转率</span>
            </p>
            <p className={styles.content}>指企业的全部资产周转一次所需要的时间</p>
          </div>
        </div>
    </div>
  );
}

AssetManageAnaly.propTypes = {
  foo: PropTypes.string,
};
export default observer(AssetManageAnaly);
