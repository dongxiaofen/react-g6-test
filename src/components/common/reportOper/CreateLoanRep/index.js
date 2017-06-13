import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import { Checkbox } from 'antd';
import DemoSlider from '../DemoSlider';
import loanSlider1 from 'imgs/companyHome/loanSlider1.png';
import loanSlider2 from 'imgs/companyHome/loanSlider2.png';
import loanSlider3 from 'imgs/companyHome/loanSlider3.png';
import loanSlider4 from 'imgs/companyHome/loanSlider4.png';
import Button from 'components/lib/button';
import { Link } from 'react-router';

function CreateLoanRep({companyHomeStore, routing}) {
  const judegeStatus = (key)=>{
    const reportInfo = companyHomeStore.reportInfo;
    if (reportInfo.dimensions.includes(key)) {
      return true;
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
  const createLoanRep = ()=> {
    const companyName = routing.location.query.companyName;
    companyHomeStore.createLoanRep(companyName);
  };
  const imgs = [loanSlider1, loanSlider2, loanSlider3, loanSlider4];
  const navs = ['多维综合分析', '盈利能力分析', '营运能力分析', '发展能力分析'];
  return (
    <div className={styles.createLoanRep}>
      <div>
        <p className={styles.title}>请选择所需贷中分析信息</p>
        <div className={`${styles.operation} clearfix`}>{createOper()}</div>
      </div>
      <div className="clearfix">
        <Button
          btnType="primary"
          className={styles.confirm}
          onClick={createLoanRep}
          loading={companyHomeStore.loanLoading}>确定</Button>
        <div className={styles.pointText}>
          <i className="fa fa-exclamation-circle"></i>
          确定即视为同意
          《<Link to="/disclaimer" target="_blank">免责声明</Link>》
        </div>
      </div>
      <hr className={styles.line}/>
      <DemoSlider imgs={imgs} navs={navs} autoplay/>
    </div>
  );
}

CreateLoanRep.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing')(observer(CreateLoanRep));
