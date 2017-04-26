import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

function Calendar({ siteAndJob, setSiteAndJob, setSiteAndJobYear }) {
  const data = siteAndJob.data;
  const year = siteAndJob.year;
  const years = siteAndJob.years;
  const yearIndex = siteAndJob.yearIndex;
  const month = siteAndJob.month;

  const monthOnClick = (calendarData, _month) => {
    setSiteAndJob(calendarData, _month);
  };

  const yearPrevOnClick = (_years, _yearIndex, _data) => {
    if (_yearIndex > 0) {
      setSiteAndJobYear(_years, _yearIndex - 1, _data);
    }
  };
  const yearNextOnClick = (_years, _yearIndex, _data) => {
    const yearsLength = _years.length;
    if (_yearIndex < yearsLength - 1) {
      setSiteAndJobYear(_years, _yearIndex + 1, _data);
    }
  };

  const monthList = (_data, _year, activeMonth) => {
    const output = [];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const calendarData = _data[_year];
    months.map((monthItem, key) => {
      let isHas = false;
      calendarData.map((item) => {
        const monthKey = Number(Object.keys(item)[0]);
        if (monthItem === monthKey) {
          isHas = true;
          let active = '';
          let categoryAlone = <div className={styles['little-round2']}></div>;
          if (!item[monthKey].location.length) {
            categoryAlone = <div className={`${styles['little-round2']} ${styles['little-round2-mln']}`}></div>;
          }
          if (Number(activeMonth) === monthItem) {
            active = styles['date-item-round-active'];
          }
          output.push(
            <div key={key} className={styles['date-content-item']}>
              <div
                onClick={monthOnClick.bind(this, calendarData, monthKey)}
                className={`${styles['date-item-round']} ${styles['date-item-round-isHas']} ${active}`}>
                {monthItem}
              </div>
              <div className={`clearfix ${styles['item-little-round']}`}>
                {
                  item[monthKey].location.length > 0
                    ?
                    <div className={styles['little-round1']}></div>
                    :
                    ''
                }
                {
                  item[monthKey].category.length > 0
                    ?
                    categoryAlone
                    :
                    ''
                }
              </div>
            </div>
          );
        }
      });
      if (!isHas) {
        output.push(
          <div key={key} className={styles['date-content-item']}>
            <div className={styles['date-item-round']}>{monthItem}</div>
          </div>
        );
      }
    });
    return output;
  };

  let leftRightArrow;
  if (years.length === 1) {
    leftRightArrow = '';
  } else if (yearIndex >= years.length - 1) {
    leftRightArrow = (
      <div>
        <div onClick={yearPrevOnClick.bind(this, years, yearIndex, data)} className={styles['angle-left']}>
          <i className="fa fa-angle-left"></i>
        </div>
      </div>
    );
  } else if (yearIndex <= 0) {
    leftRightArrow = (
      <div>
        <div onClick={yearNextOnClick.bind(this, years, yearIndex, data)} className={styles['angle-right']}>
          <i className="fa fa-angle-right"></i>
        </div>
      </div>
    );
  } else {
    leftRightArrow = (
      <div>
        <div onClick={yearPrevOnClick.bind(this, years, yearIndex, data)} className={styles['angle-left']}>
          <i className="fa fa-angle-left"></i>
        </div>
        <div onClick={yearNextOnClick.bind(this, years, yearIndex, data)} className={styles['angle-right']}>
          <i className="fa fa-angle-right"></i>
        </div>
      </div>
    );
  }
  return (
    <div className={styles['addJob-box2-block']}>
      <div className={styles['addJob-date-title']}>
        <span className={styles['date-title-txt']}>{year}</span>
        {leftRightArrow}
      </div>
      <div className={`clearfix ${styles['addJob-date-content']}`}>
        {monthList(data, year, month)}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  siteAndJob: PropTypes.object,
};
export default observer(Calendar);
