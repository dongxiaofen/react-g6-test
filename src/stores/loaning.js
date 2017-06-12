import { observable, action, computed } from 'mobx';
import { companyHomeApi } from 'api';
import bannerStore from './banner';

class LoaningStore {
  @observable isLoading = true;
  @observable isMount = false;
  // 盈利能力指标数据
  @observable profitDataList = {
    '2015': {
      'XSJLL': 3.45,
      'XSMLL': 12.34,
      'YYJLL': 23.45,
      'ZCJLL': 12.34,
      'CBFYJLL': 12.34,
      'ZYYWLRL': 2.0
    }, '2016': { 'XSJLL': 3.45, 'XSMLL': 12.34, 'YYJLL': 23.45, 'ZCJLL': 12.34, 'CBFYJLL': 12.34, 'ZYYWLRL': 2.0 }
  };
  // 营运能力指标数据
  @observable operationDataList = {
    '2015': {
      'GSGM': 1234,
      'CWFYZB': 3.45,
      'GLFYZB': 12.34,
      'XSFYZB': 23.45,
      'ZZCYSRB': 12.34
    }, '2016': { 'GSGM': 1234, 'CWFYZB': 3.45, 'GLFYZB': 12.34, 'XSFYZB': 23.45, 'ZZCYSRB': 12.34 }
  };
  // 成长能力指标数据
  @observable upDataList = {
    '2015': {
      'XSZZL': 3.45,
      'ZCZZL': 12.34,
      'JLRZZL': 12.34,
      'YYLRZZL': 23.45,
      'ZYYWSRBDL': 12.34
    },
    '2016': { 'XSZZL': 3.45, 'ZCZZL': 12.34, 'JLRZZL': 12.34, 'YYLRZZL': 23.45, 'ZYYWSRBDL': 12.34 }
  };
  @observable loading = false;
  @observable loadingId = -1;
  @observable listData = [];
  // 六芒星data
  @observable sixStarData = {
    'result': {
      'law': {
        'name': '法务相关',
        'basis': ['公司涉及的诉讼', '失信被执行信息', '关联公司涉诉情况', '关联公司失信被执行信息'],
        'score': '97',
        'comparation': null,
        'description': '无失信被执行记录;无被银行等金融机构起诉次数记录;无金融借款纠纷'
      },
      'team': {
        'name': '团队相关',
        'basis': ['团队人数规模', '员工平均薪资', '法人被曝光的负面新闻', '招聘职位分析', '法人或者高管出行行为'],
        'score': '64',
        'comparation': null,
        'description': '18年内未发生拖欠工资相关的新闻;18年内未发生法人跑路相关的新闻;18年内未发生经营风险相关的新闻'
      },
      'allInfo': {
        'name': '综合评分',
        'basis': ['综合考虑经营状况,行业,创新能力,团队,社会影响力,法务信息.'],
        'score': '56',
        'comparation': null,
        'description': '综合考虑经营状况,行业,创新能力,团队,社会影响力,法务信息.'
      },
      'industry': {
        'name': '行业相关',
        'basis': ['最新有利或者不利行业政策', '企业业务范围', '关联公司业务范围'],
        'score': '21',
        'comparation': null,
        'description': '近期有利政策的数量较少;近期不利政策的数量较多'
      },
      'influence': {
        'name': '社会影响力',
        'basis': ['新闻曝光率', '公司招聘口碑', '关联网络图分析'],
        'score': '33',
        'comparation': null,
        'description': '无新闻曝光'
      },
      'operation': {
        'name': '经营状况',
        'basis': ['经营年限', '注册资本', '招投标信息'],
        'score': '54',
        'comparation': null,
        'description': '经营年限较长;注册资本较多;无中标'
      },
      'creativity': {
        'name': '创新能力',
        'basis': ['商标和专利数量', '平均每年发布的商标和专利数量', '企业员工学历'],
        'score': '26',
        'comparation': null,
        'description': '无商标;无专利'
      }
    }
  };
  // 六芒星loading
  @observable detailData = {
    activeIndex: 0,
    page: 1,
    tabTop: computed(function tabTop() {
      return 0 - (this.page - 1) * 8 * 60;
    }),
    info: {},
    detail: {},
    html: '',
    orgData: {},
  }

  @action.bound getReportModule() {
    this.isMount = true;
  }

  // 获取营收能力信息
  @action.bound getProfitEvalList() {
    companyHomeApi.getProfitEvalList(bannerStore.profitEvalReportId).then((response) => {
      if (response.code === '') {
        this.profitDataList = response.profitDataList;
      }
    }).catch((err) => {
      console.log('getProfitEvalList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 营运能力指标数据
  @action.bound getOperationDataList() {
    companyHomeApi.getProfitEvalList(bannerStore.operationReportId).then((response) => {
      if (response.code === '') {
        this.getOperationDataList = response.result;
      }
    }).catch((err) => {
      console.log('getProfitEvalList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 成长能力指标数据
  @action.bound getUpDataList() {
    companyHomeApi.getUpDataList(bannerStore.growingReportId).then((response) => {
      if (response.code === '') {
        this.upDataList = response.upDataList;
      }
    }).catch((err) => {
      console.log('getUpDataList.....errr = ' + err);
      this.loading = false;
    });
  }

  // 获取六芒星Data
  @action.bound getCompanyScore() {
    if (window.reportSourceCancel === undefined) {
      window.reportSourceCancel = [];
    }
    // 打开loading
    this.loading = true;
    // 获取列表数据
    companyHomeApi.getCompanyScore(bannerStore.companyScoreReportId)
                  .then(action('six list', (resp) => {
                    this.sixStarData = resp.data.result;
                    // 关闭loading
                    this.loading = false;
                  }))
                  .catch(action('six error', (err) => {
                    console.log(err.response, '=====six error');
                    // 关闭loading
                    this.loading = false;
                    this.sixStarData = { error: 'error' };
                  }));
  }

  // 重置营收能力数据
  @action.bound resetProfitEvalStore() {
    this.profitDatat = [];
  }

  // 重置营收能力数据
  @action.bound resetSixStarStore() {
    this.sixStarData = '';
  }
}
export default new LoaningStore();
