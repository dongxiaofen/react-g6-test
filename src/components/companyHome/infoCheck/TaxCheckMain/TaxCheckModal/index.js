import React from 'react';
import { observer, inject } from 'mobx-react';
import Input from 'components/lib/input';
import Select from 'components/lib/Select';
const Option = Select.Option;
import styles from './index.less';

function TaxCheckModal({taxCheckStore}) {
  const selectConf = taxCheckStore.selectConf;
  const yearConf = ['2015', '2014'];
  const taxIndexConf = [
    {label: 'A类营业收入', value: 'R001'},
    {label: 'A类主营业务收入', value: 'R002'},
    {label: 'A类其他业务收入', value: 'R003'},
    {label: 'A类营业成本', value: 'R004'},
    {label: 'A类主营业务成本', value: 'R005'},
    {label: 'A类其他业务成本', value: 'R006'},
    {label: 'A类营业税金及附加信息', value: 'R007'},
    {label: 'A类销售费用', value: 'R008'},
    {label: 'A类管理费用', value: 'R009'},
    {label: 'A类财务费用', value: 'R0010'},
    {label: 'A类资产减值损失', value: 'R0011'},
    {label: 'A类公允价值变动收益', value: 'R0012'},
    {label: 'A类投资收益', value: 'R0013'},
    {label: 'A类营业利润', value: 'R0014'},
    {label: 'A类营业外收入', value: 'R0015'},
    {label: 'A类营业外支出', value: 'R0016'},
    {label: 'A类利润（亏损）总额', value: 'R0017'},
    {label: '应纳税所得额', value: 'R0056'},
    {label: '应纳所得税额', value: 'R0057'},
    {label: '应纳税额', value: 'R0070'},
    {label: '实际应纳所得税额', value: 'R0073'},
    {label: '本年应补所得税额', value: 'R0080'},
    {label: '本年应退所得税额', value: 'R0081'},
  ];
  const addSelectItem = () => {
    taxCheckStore.addSelectItem();
  };
  const deleteSelectItem = (index) => {
    taxCheckStore.deleteSelectItem(index);
  };
  const selectChange = (index, key, value) => {
    taxCheckStore.changeValue(`selectConf[${index}].${key}`, value);
  };
  const inputChange = (index, evt) => {
    taxCheckStore.changeValue(`selectConf[${index}].input`, evt.target.value);
  };
  const checkNumber = (index, evt) => {
    const inputValue = evt.target.value;
    const pattern = /^\d+(.\d+)?$/;
    let msg = '';
    if (!pattern.test(inputValue)) {
      msg = '请输入数字';
    }
    taxCheckStore.changeValue(`selectConf[${index}].msg`, msg);
  };
  const generateTaxOpt = () => {
    return taxIndexConf.map((item, idx) => {
      return <Option key={idx} value={item.value}>{item.label}</Option>;
    });
  };
  const generateYearOpt = () => {
    return yearConf.map((year, idx) => {
      return <Option key={idx} value={year}>{year + '年'}</Option>;
    });
  };
  const generateSelect = () => {
    return selectConf.map((item, idx) => {
      return (
        <div key={idx} className={styles.selectGroup}>
          <span className={styles.yearLabel}>年度</span>
          <Select
            width="80px"
            onChange={selectChange.bind(null, idx, 'year')}
            value={item.year}>
            {generateYearOpt()}
          </Select>
          <span className={styles.taxLabel}>指标</span>
          <Select
            width="170px"
            onChange={selectChange.bind(null, idx, 'taxIndex')}
            value={item.taxIndex}>
            {generateTaxOpt()}
          </Select>
          <span className={styles.inputLabel}>金额（元）</span>
          <Input
            className={item.msg ? styles.inputErrCss : styles.inputCss}
            inputType="singleline"
            onBlur={checkNumber.bind(null, idx)}
            onChange={inputChange.bind(null, idx)}
            value={item.input}
            placeholder="请填写" />
          {taxCheckStore.selectConf.length > 1 && <span className={styles.minusIcon} onClick={deleteSelectItem.bind(null, idx)}></span>}
        </div>
      );
    });
  };
  return (
    <div className={styles.wrap}>
      {generateSelect()}
      {taxCheckStore.selectConf.length < 6 && <button className={styles.addBtn} onClick={addSelectItem}>添加核查项</button>}
    </div>
  );
}

export default inject('taxCheckStore')(observer(TaxCheckModal));
