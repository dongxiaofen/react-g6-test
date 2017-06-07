import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import { Checkbox } from 'antd';
import DemoSlider from '../DemoSlider';
import lockImg from 'imgs/companyHome/leftBar/lock.png';
import Button from 'components/lib/button';

function CreateLoanRep({companyHomeStore}) {
  const judegeStatus = (key)=>{
    if (key === 'SCORE') {
      return false;
    }
    return false;
  };
  const choiceOption = (idx, evt)=> {
    companyHomeStore.updateLoanOption(idx, evt.target.checked);
  };
  const createOper = ()=> {
    const options = companyHomeStore.loanOption;
    const output = [];
    options.map((optItem, idx)=>{
      if (judegeStatus(optItem.value)) {
        output.push(
          <p className={styles.operaText} key={`option${idx}`}>
            {optItem.label}
            <i className={styles.icon}></i>
          </p>
        );
      } else {
        output.push(
          <div className={styles.checkBox} key={`option${idx}`}>
            <Checkbox checked={optItem.checked} onChange={choiceOption.bind(null, idx)}>{optItem.label}</Checkbox>
          </div>
        );
      }
    });
    return output;
  };
  const imgs = [lockImg, lockImg, lockImg, lockImg];
  const navs = ['多维综合分析', '盈利能力分析', '营运能力分析', '发展能力分析'];
  return (
    <div className={styles.createLoanRep}>
      <div>
        <p className={styles.title}>请选择所需贷中分析信息</p>
        <div className={`${styles.operation} clearfix`}>{createOper()}</div>
      </div>
      <hr className={styles.line}/>
      <DemoSlider imgs={imgs} navs={navs}/>
      <div style={{margin: 'auto', width: '280px'}}>
        <Button btnType="primary" className={styles.confirm}>确定</Button>
      </div>
    </div>
  );
}

CreateLoanRep.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore')(observer(CreateLoanRep));
