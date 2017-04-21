import React from 'react';
import { observer } from 'mobx-react';
import styles from '../index.less';
import Popover from 'antd/lib/popover';
function Grade({itemData}) {
  let gradeCss = '';
  let grade = '';
  const createGradeList = ()=>{
    const gradeConfig = {'HIGH': '高', 'MIDDLE': '中', 'LOW': '低'};
    const styleConfig = {'HIGH': 'big', 'MIDDLE': 'middle', 'LOW': 'small'}; // 样式映射
    let styleImportance = '';
    const showGradeList = [];
    if (itemData.ruleSimpleResponses.length > 0) {
      itemData.ruleSimpleResponses.map((obj, resIdx)=>{
        const importance = gradeConfig[obj.eventImportance];
        if (resIdx === 0) {
          styleImportance = obj.eventImportance;
          grade = `事件重要性：${importance}`;
        }
        showGradeList.push(
          <div key={`grade${resIdx}`}>
            <span className={styles.gradeNumber}>{(resIdx - 0) + 1}</span>
            <span>&nbsp;&nbsp;重要性：{importance}&nbsp;&nbsp;</span>
            <span>触发规则：[{obj.version}]{obj.ruleName}</span>
          </div>
        );
      });
      gradeCss = styleConfig[styleImportance];
      return showGradeList;
    }
  };
  return (
    <Popover placement="top" trigger="hover" content={createGradeList()}>
      <span className={styles.grades + ' ' + styles[gradeCss]}>{grade}</span>
    </Popover>
  );
}
export default observer(Grade);
