import React, {PropTypes} from 'react';
import { observer } from 'mobx-react';
import styles from './index.less';

/*
  图片的顺序最好和下面 imgArray 的顺序一样，默认调用的是第一张图片
*/
// reprot
import loadingReportHeader from 'imgs/loading/report/loading_report_header.png';
import loadingReportBanner from 'imgs/loading/report/loading_report_banner.png';
import loadingReportContent from 'imgs/loading/report/loading_report_content.png';
import loadingReportList from 'imgs/loading/report/loading_report_list.png';
// account
import loadingAccountList from 'imgs/loading/account/loading_account_list.png';
import loadingAccountOperate from 'imgs/loading/account/loading_account_operate.png';
// headline
import loadingHeadlineCompanyList from 'imgs/loading/headline/loading_headline_company_list.png';
import loadingHeadlineInfoContent from 'imgs/loading/headline/loading_headline_info_content.png';
import loadingHeadlineInfoTitle from 'imgs/loading/headline/loading_headline_info_title.png';
// homepage
import loadingHomepageStatic from 'imgs/loading/homepage/loading_homepage_static.png';
import loadingHomepageUserinfo from 'imgs/loading/homepage/loading_homepage_userInfo.png';
import loadingHomepageEarlyContent from 'imgs/loading/homepage/loading_homepage_early_content.png';
import loadingHomepageEarlyTitle from 'imgs/loading/homepage/loading_homepage_early_title.png';
// other
import loadingMoniterList from 'imgs/loading/loading_moniter_list.png';
import loadingSearchPage from 'imgs/loading/loading_search_page.png';
import loadingShortSearchPage from 'imgs/loading/loading_shortSearch_page.png';

function ImgLoading({ imgCategory}) {
  const imgArray = [
    loadingReportHeader,
    loadingReportBanner,
    loadingReportContent,
    loadingReportList,
    loadingAccountList,
    loadingAccountOperate,
    loadingHeadlineCompanyList,
    loadingHeadlineInfoContent,
    loadingHeadlineInfoTitle,
    loadingHomepageStatic,
    loadingHomepageUserinfo,
    loadingHomepageEarlyContent,
    loadingHomepageEarlyTitle,
    loadingMoniterList,
    loadingSearchPage,
    loadingShortSearchPage,
  ];
  const imgSrc = imgArray[imgCategory];
  return (
    <div className={styles.box}>
      <img src={imgSrc} className={styles.img} alt="" />
    </div>
  );
}

ImgLoading.propTypes = {
  imgCategory: PropTypes.number,
};
export default observer(ImgLoading);
