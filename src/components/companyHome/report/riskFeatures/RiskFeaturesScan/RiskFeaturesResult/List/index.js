import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';
import AnimateLoading from 'components/hoc/LoadingComp/AnimateLoading';

function List({data}) {
  // 获取列表数据
  const clickBtn = (recordIds, index) => {
    data.getScanList(recordIds.join(','), index);
  };
  // 风险数据结果
  let dataList = [];
  const dataListDom = [];
  if (data.result && data.result.detail) {
    dataList = data.result.detail;
  }
  if (dataList.length > 0) {
    dataList.map((obj, idx)=>{
      const detailListDom = [];
      // 判断箭头样式开启或关闭
      let arrow = '';
      // 判断样式是否显示列表
      let listStyle = '';
      let listWrapStyle = '';
      // 结果内容详情list
      if (data.listDataRisk && data.listDataRisk.length > 0) {
        data.listDataRisk.map((value)=>{
          // 判断此条详细数据与此条结果数据是否对应
          if (value.index === idx) {
            arrow = value.status ? styles.arrawTr : '';
            listStyle = value.status ? '' : styles.none;
            listWrapStyle = value.status ? '' : styles.noneWrap;
            // 显示详细数据dom 并判断显示状态
            if (value.data && value.data.length > 0) {
              value.data.map((val, num)=>{
                detailListDom.push(
                  <div key={`${num}detail${idx}`} className={`${styles.list} ${listStyle}`}>
                    <div className={`${styles.listContent1} clearfix`}>
                      <div className={styles.lTitle}>
                        {val.ruleName}
                      </div>
                      <div className={styles.riskNum}>系统预警{val.count}次</div>
                    </div>
                    <div className={`${styles.listContent2} clearfix`}>
                      <div className={styles.detail}>
                        预警依据：{val.description}
                      </div>
                      <div className={styles.time}>
                        预警日期：{val.ruleTime}
                      </div>
                    </div>
                  </div>
                );
              });
            }
          }
        });
      }
      // 结果内容dom
      dataListDom.push(
        <div key={`${idx}list`} className={styles.wrap}>
          <div className={`${styles.totalContent} clearfix`}>
            <div className={styles.left}>
              <div className={`${styles.content1} clearfix`}>
                <div className={styles.title}>风险特征 {idx + 1}</div>
                <div className={styles.explain}>
                  <div className={styles.explainCon}>
                    该风险特征在企业全库中 命中 {obj.totalMatchNum} 次，其中 {obj.riskProbability}% 涉及风险名单
                  </div>
                </div>
              </div>
              <div className={`${styles.content2} clearfix`}>
                <div className={styles.ruleNum}>涉及规则<span>{obj.benchmarkSeqNum}</span>条</div>
                <div className={styles.risk}>风险概率<span>{obj.riskProbability}%</span></div>
              </div>
            </div>
            <div className={styles.right}>
              {data.riskListLoading.indexOf(idx) >= 0 ? <div className={styles.loadWrap}>
                <AnimateLoading animateCategory={1}/>
              </div> : <i onClick={clickBtn.bind(this, obj.keyCompEventId, idx)} className={`${styles.arraw} ${arrow}`}></i>}
            </div>
          </div>
          <div className={`${styles.listWrap} ${listWrapStyle}`}>
            {detailListDom}
          </div>
        </div>
      );
    });
  }
  return (
    <div className={styles.box}>
      {dataListDom}
      {/* <div className={styles.wrap}>
        <div className={`${styles.totalContent} clearfix`}>
          <div className={styles.left}>
            <div className={`${styles.content1} clearfix`}>
              <div className={styles.title}>风险特征 1</div>
              <div className={styles.explain}>
                该风险特征在企业全库中 命中 352 次，其中 90% 涉及风险名单
              </div>
            </div>
            <div className={`${styles.content2} clearfix`}>
              <div className={styles.ruleNum}>涉及规则<span>2</span>条</div>
              <div className={styles.risk}>风险概率<span>2%</span></div>
            </div>
          </div>
          <div className={styles.right}>
            <i className={styles.arraw}></i>
          </div>
        </div>
        <div className={styles.listWrap}>
          <div className={styles.list}>
            <div className={`${styles.listContent1} clearfix`}>
              <div className={styles.lTitle}>
                较大比例企业关联公司所涉及行业为国家开展监管工作的产业
              </div>
              <div className={styles.riskNum}>系统预警15次</div>
            </div>
            <div className={`${styles.listContent2} clearfix`}>
              <div className={styles.detail}>
                预警依据：该企业超过30%比例的关联企业，涉及行业为国家开展监管工作的文件。
              </div>
              <div className={styles.time}>
                预警日期：2017-05-17
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.object,
};
export default observer(List);
