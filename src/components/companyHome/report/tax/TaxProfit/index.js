import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import TaxProfitList from './TaxProfitList';

function TaxProfit({taxStore}) {
  const textAll = (
    <div className={styles.all}>
      <div>盈利能力指标说明</div>
      <ul>
        <li>
          净利润=营业利润-实际应纳所得税额
        </li>
        <li>
          主营业务利润=主营业务收入-主营业务成本-营业税金及附加
        </li>
        <li>
          成本费用总额=营业成本+销售费用+管理费用+财务费用
        </li>
        <li>
          销售毛利率=((营业收入-营业成本)÷营业收入)×100%
        </li>
        <li>
          销售净利率=(净利润÷营业收入)×100%
        </li>
        <li>
          营业净利率=(营业利润÷营业收入)×100%
        </li>
        <li>
          成本费用净利率=(利润总额÷成本费用总额)×100%
        </li>
        <li>
          主营业务利润率=（主营业务利润÷主营业务收入）×100%
        </li>
        <li>
          资产净利率=(净利润÷总资产)×100%（税务申报无总资产项，则无该数据）
        </li>
      </ul>
    </div>
  );
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          盈利能力指标
        </div>
        <Popover placement="right" content={textAll}>
          <i className={styles.icon}></i>
        </Popover>
      </div>
      <TaxProfitList taxStore={taxStore} />
    </div>
  );
}

TaxProfit.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxProfit);
