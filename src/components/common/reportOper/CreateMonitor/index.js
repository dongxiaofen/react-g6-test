import React, {PropTypes} from 'react';
import { observer, inject} from 'mobx-react';
import styles from './index.less';
import DemoSlider from '../DemoSlider';
import monitorSlider1 from 'imgs/companyHome/monitorSlider1.png';
import Button from 'components/lib/button';
import {Slider} from 'antd';

function CreateMonitor({companyHomeStore, routing}) {
  const imgs = [monitorSlider1];
  const companyName = routing.location.query.companyName;
  const initMarks = ()=> {
    const marks = {};
    for (let idx = 0; idx < 12; idx++) {
      marks[idx] = {};
      marks[idx].style = {color: '#fff'};
    }
    return marks;
  };
  const chnageSlider = (value)=> {
    companyHomeStore.updateValue('monitorTime', value);
  };
  const createMonitor = ()=> {
    companyHomeStore.createMonitorConfirm({companyName, time: companyHomeStore.monitorTimeObj.key});
  };
  return (
    <div className={styles.createMonitor}>
      <div>
        <p className={styles.title}>选择企业加入监控时长</p>
        <div className={`${styles.operation} clearfix`}>
          <p className={styles.subTitle}>监控时长：</p>
          <div className={styles.slider}>
            <Slider min={1} max={12} marks={initMarks()} value={companyHomeStore.monitorTime} onChange={chnageSlider}/>
          </div>
          <p className={styles.lable}>{companyHomeStore.monitorTimeObj.text}</p>
        </div>
      </div>
      <hr className={styles.line}/>
      <DemoSlider imgs={imgs} autoplay={false}/>
      <div style={{margin: 'auto', width: '280px'}}>
        <Button btnType="primary" className={styles.confirm} onClick={createMonitor}>确定</Button>
      </div>
    </div>
  );
}

CreateMonitor.propTypes = {
  foo: PropTypes.string,
};
export default inject('companyHomeStore', 'routing')(observer(CreateMonitor));
