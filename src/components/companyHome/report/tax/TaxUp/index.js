import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import TaxUpList from './TaxUpList';

function TaxUp({taxStore}) {
  const textAll = (
    <div className={styles.all}>
      <div>成长能力指标说明</div>
      <ul>
        <li>
          净利润=营业利润-实际应纳所得税额
        </li>
        <li>
          资产增长率=本年度资产增加额 / 资产年初余额 ×100%（税务申报无总资产项，则无该数据）
        </li>
        <li>
          销售增长率=(本年度R001营业收入-上年度营业收入) / 上年度营业收入×100%
        </li>
        <li>
          净利润增长率=(本年度净利润-上年度净利润) / 上年度净利润×100%
        </li>
        <li>
          营业利润增长率=(本年度营业利润-上年度营业利润) / 上年度营业利润×100%
        </li>
        <li>
          主营业务收入变动率=(本年度主营业务收入-上年度主营业务收入)  / 上年度主营业务收入×100%
        </li>
      </ul>
    </div>
  );
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          成长能力指标
        </div>
        <Popover placement="right" content={textAll}>
          <i className={styles.icon}></i>
        </Popover>
      </div>
      <TaxUpList taxStore={taxStore} />
    </div>
  );
}

TaxUp.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxUp);
