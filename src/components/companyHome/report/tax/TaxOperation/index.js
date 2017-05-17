import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import Popover from 'antd/lib/popover';
import TaxOperationList from './TaxOperationList';

function TaxOperation({taxStore}) {
  const textAll = (
    <div className={styles.all}>
      <div>营运能力指标说明</div>
      <ul>
        <li>
          总费用=销售费用+管理费用+财务费用
        </li>
        <li>
          总资产与收入比=总资产 / 销售收入×100%（税务申报无总资产项，则无该数据）
        </li>
        <li>
          财务费用率=财务费用 / 销售收入×100%
        </li>
        <li>
          管理费用率=管理费用 / 销售收入×100%
        </li>
        <li>
          销售费用率=销售费用 / 销售收入×100%
        </li>
      </ul>
    </div>
  );
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <div className={styles.titleText}>
          营运能力指标
        </div>
        <Popover placement="rightTop" content={textAll}>
          <i className={styles.icon}></i>
        </Popover>
      </div>
      <TaxOperationList taxStore={taxStore} />
    </div>
  );
}

TaxOperation.propTypes = {
  taxStore: PropTypes.object,
};
export default observer(TaxOperation);
