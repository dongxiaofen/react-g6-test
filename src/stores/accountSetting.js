import { observable, action } from 'mobx';
import { accountSettingApi } from 'api';
import pathval from 'pathval';
import Formater from 'helpers/formatTreeData';
import uiStore from './ui';
import clientStore from './client';
import messageStore from './message';
class AccountSettingStore {
  timeMap = {
    ONE_MONTH: '1个月',
    TWO_MONTH: '2个月',
    THREE_MONTH: '3个月',
    FOUR_MONTH: '4个月',
    FIVE_MONTH: '5个月',
    SIX_MONTH: '6个月',
    SEVEN_MONTH: '7个月',
    EIGHT_MONTH: '8个月',
    NINE_MONTH: '9个月',
    ONE_YEAR: '1年',
  };
  consumeTypeMap = {
    REPORT_MAIN: '创建查询报告',
    REPORT_REFRESH: '刷新查询报告',
    REPORT_TO_MONITOR: '查询报告转为监控报告',
    REPORT_TO_DEEP_MONITOR: '查询报告转为深度监控报告',
    MONITOR_MAIN: '创建监控报告',
    MONITOR_MAIN_RENEWAL: '监控报告续费',
    MONITOR_TO_DEEP_MONITOR: '监控报告升级为深度监控报告',
    DEEP_MONITOR_MAIN: '创建深度监控报告',
    DEEP_MONITOR_MAIN_RENEWAL: '深度监控报告续费',
    REPORT_PERSON_CHECK: '个人核查',
    MONITOR_PERSON_CHECK: '个人核查',
    DEEP_MONITOR_PERSON_CHECK: '个人核查',
    MONITOR_TAX_CHECK: '税务核查',
    DEEP_MONITOR_TAX_CHECK: '税务核查',
  };
  // 账号树数据
  @observable tree = {
    searchInput: '',
    activeIndex: 0,
    activeId: -1,
    data: {},
  };
  // 新增账号弹框数据
  @observable addModal = {
    visible: false,
    errorMsg: '',
    loading: false,
    form: {
      email: {
        value: '',
        vdRule: 'vdEmail',
        errorMsg: '',
      },
      password: {
        value: '',
        vdRule: 'vdPwd',
        errorMsg: '',
      },
      confirmPassword: {
        value: '',
        vdRule: 'vdRePwd',
        errorMsg: '',
      },
      contact: {
        value: '',
        vdRule: 'vdName',
        errorMsg: '',
      },
      department: {
        value: '',
        vdRule: '',
        errorMsg: '',
      },
      contactPosition: {
        value: '',
        vdRule: '',
        errorMsg: '',
      },
      phone: {
        value: '',
        vdRule: '',
        errorMsg: '',
      },
      contactEmail: {
        value: '',
        vdRule: '',
        errorMsg: '',
      },
    },
  };
  // 账号基本信息数据
  @observable base = {};
  // 修改密码弹框数据
  @observable pwdModal = {
    visible: false,
    errorMsg: '',
    loading: false,
    form: {
      oldPwd: {
        value: '',
        vdRule: 'vdPwdIsNotEmpty',
        errorMsg: '',
      },
      newPwd: {
        value: '',
        vdRule: 'vdPwd',
        errorMsg: '',
      },
      reNewPwd: {
        value: '',
        vdRule: 'vdRePwd',
        errorMsg: '',
      },
    }
  };
  // 修改用户信息弹框数据
  @observable editModal = {
    visible: false,
    errorMsg: '',
    actName: 'contact',
    loading: false,
    form: {
      contact: {
        value: '',
        vdRule: 'vdName',
        errorMsg: '',
        placeholder: '姓名（必填）',
        title: '修改姓名',
      },
      contactPosition: {
        value: '',
        vdRule: '',
        errorMsg: '',
        placeholder: '职务',
        title: '修改职务',
      },
      department: {
        value: '',
        vdRule: '',
        errorMsg: '',
        placeholder: '部门',
        title: '修改部门',
      },
      phone: {
        value: '',
        vdRule: '',
        errorMsg: '',
        placeholder: '电话',
        title: '修改电话',
      },
      contactEmail: {
        value: '',
        vdRule: '',
        errorMsg: '',
        placeholder: '邮箱',
        title: '修改邮箱',
      },
    }
  };
  // tab栏数据
  @observable tabs = {
    activeKey: '消费记录',
    business: {
      reportAndMonitor: {},
      province: {},
      industry: {},
      scale: {},
    },
    alertCorp: {},
    consume: {},
    recharge: {},
    summary: {},
    loginRecord: {},
  };
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound getErrMsg(err) {
    return pathval.getPathValue(err, 'response.data.message');
  }
  @action.bound getActiveTreeValue(name) {
    if (this.tree.data.content) {
      return this.tree.data.content[this.tree.activeIndex][name];
    }
  }
  @action.bound editInfo(url, name, params) {
    this.editModal.loading = true;
    accountSettingApi.editInfo(url, params)
      .then(action('editInfo_success', () => {
        this.resetEditModal();
        this.base.data[name] = params[name];
        if (name === 'contact') {
          const index = this.tree.activeIndex;
          this.tree.data.content[index][name] = params[name];
        }
        messageStore.openMessage({
          type: 'info',
          content: '修改成功',
        });
      }))
      .catch(action('editInfo_error', err => {
        this.editModal.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: this.getErrMsg(err) || '修改失败',
        });
      }));
  }
  @action.bound changePwd(url, params) {
    this.pwdModal.loading = true;
    accountSettingApi.changePwd(url, params)
      .then(action('changePwd_success', () => {
        this.resetPwdModal();
        messageStore.openMessage({
          type: 'info',
          content: '修改密码成功',
        });
      }))
      .catch(action('changePwd_error', err => {
        this.pwdModal.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: this.getErrMsg(err) || '修改密码失败',
        });
      }));
  }
  @action.bound addNewUser(params) {
    this.addModal.loading = true;
    accountSettingApi.addNewUser(params)
      .then(action('addNewUser_success', () => {
        this.resetAddModal();
        messageStore.openMessage({
          type: 'info',
          content: '新增账号成功',
        });
        this.getTreeList(true);
      }))
      .catch(action('addNewUser_error', err => {
        this.addModal.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: this.getErrMsg(err) || '新增账号失败',
        });
      }));
  }
  @action.bound getTreeList(afterAddUser) {
    if (!afterAddUser) {
      this.resetStore();
    }
    accountSettingApi.getTreeList()
      .then(action('getTreeList_success', resp => {
        if (resp.data && resp.data.length > 0) {
          const treeData = new Formater(resp);
          const userEmail = clientStore.userInfo.email;
          treeData.formatData(null, null, userEmail);
          this.tree.data = {content: treeData.formatResult};
          if (!afterAddUser) {
            const uId = treeData.formatResult[0].id;
            const pId = treeData.formatResult[0].parentUserId;
            this.tree.activeId = uId;
            this.getUserInfo(uId);
            // this.getReportAndMonitor(uId);
            // this.getProvince(uId);
            // this.getIndustry(uId);
            // this.getScale(uId);
            this.getConsume(uId);
            if (!pId) {
              this.getRecharge(uId);
              this.getSummary(uId);
            }
            this.getLoginRecord(uId);
          }
        } else {
          this.tree.data = {error: {message: '暂无账号信息'}, content: []};
        }
      }))
      .catch(action('getTreeList_error', err => {
        this.tree.data = {error: err.response.data, content: []};
        this.base = {error: err.response.data, data: {}};
        this.tabs.business.reportAndMonitor = {error: err.response.data, data: []};
        this.tabs.business.province = {error: err.response.data, content: []};
        this.tabs.business.industry = {error: err.response.data, content: []};
        this.tabs.business.scale = {error: err.response.data, data: {}};
        this.tabs.consume = {error: err.response.data, page: []};
        this.tabs.recharge = {error: err.response.data, content: []};
        this.tabs.summary = {error: err.response.data, page: []};
        this.tabs.loginRecord = {error: err.response.data, content: []};
      }));
  }
  @action.bound getUserInfo(uId) {
    this.resetBase();
    accountSettingApi.getUserInfo(uId)
      .then(action('getUserInfo_success', resp => {
        this.base = {data: resp.data};
      }))
      .catch(action('getUserInfo_error', err => {
        this.base = {error: err.response.data, data: {}};
      }));
  }
  @action.bound getReportAndMonitor(uId) {
    this.tabs.business.reportAndMonitor = {};
    accountSettingApi.getReportAndMonitor(uId)
      .then(action('getReportAndMonitor_success', resp => {
        const noData = Object.keys(resp.data).every(key => {
          return resp.data[key].length === 0;
        });
        this.tabs.business.reportAndMonitor = noData ? {error: {message: '暂无数据'}, data: []} : {data: resp.data};
      }))
      .catch(action('getReportAndMonitor_error', err => {
        this.tabs.business.reportAndMonitor = {error: err.response.data, data: {}};
      }));
  }
  @action.bound getProvince(uId) {
    this.tabs.business.province = {};
    accountSettingApi.getProvince(uId)
      .then(action('getProvince_success', resp => {
        const noData = resp.data.length === 0;
        this.tabs.business.province = noData ? {error: {message: '暂无数据'}, content: []} : {content: resp.data};
      }))
      .catch(action('getProvince_error', err => {
        this.tabs.business.province = {error: err.response.data, content: []};
      }));
  }
  @action.bound getIndustry(uId) {
    this.tabs.business.industry = {};
    accountSettingApi.getIndustry(uId)
      .then(action('getIndustry_success', resp => {
        const noData = resp.data.length === 0;
        this.tabs.business.industry = noData ? {error: {message: '暂无数据'}, content: []} : {content: resp.data};
      }))
      .catch(action('getIndustry_error', err => {
        this.tabs.business.industry = {error: err.response.data, content: []};
      }));
  }
  @action.bound getScale(uId) {
    this.tabs.business.scale = {};
    accountSettingApi.getScale(uId)
      .then(action('getScale_success', resp => {
        const noData = Object.keys(resp.data).every(key => {
          return resp.data[key] === 0;
        });
        this.tabs.business.scale = noData ? {error: {message: '暂无数据'}, data: {}} : {data: resp.data};
      }))
      .catch(action('getScale_error', err => {
        this.tabs.business.scale = {error: err.response.data, data: {}};
      }));
  }
  @action.bound getAlertCorp(uId) {
    this.tabs.alertCorp = {};
    const params = uiStore.uiState.accountAlertCorp;
    delete params.totalElements;
    accountSettingApi.getAlertCorp(uId, params)
      .then(action('getAlertCorp_success', resp => {
        const noData = !resp.data || resp.data.content === undefined || resp.data && resp.data.content.content.length === 0;
        this.tabs.alertCorp = noData ? {error: {message: '暂无预警企业'}, content: []} : resp.data;
        uiStore.updateUiStore('accountAlertCorp.totalElements', pathval.getPathValue(resp, 'data.content.totalElements') || 0);
      }))
      .catch(action('getAlertCorp_error', err => {
        console.log('getAlertCorp_error', err);
        this.tabs.alertCorp = {error: err.response.data, content: []};
      }));
  }
  @action.bound getConsume(uId) {
    this.tabs.consume = {};
    const params = uiStore.uiState.accountConsume;
    delete params.totalElements;
    accountSettingApi.getConsume(uId, params)
      .then(action('getConsume_success', resp => {
        const noData = resp.data.page === undefined || resp.data.page.content.length === 0;
        this.tabs.consume = noData ? {error: {message: '暂无消费记录'}, page: []} : resp.data;
        uiStore.updateUiStore('accountConsume.totalElements', pathval.getPathValue(resp, 'data.page.totalElements') || 0);
      }))
      .catch(action('getConsume_error', err => {
        this.tabs.consume = {error: err.response.data, page: []};
      }));
  }
  @action.bound getRecharge(uId) {
    this.tabs.recharge = {};
    const params = uiStore.uiState.accountRecharge;
    delete params.totalElements;
    accountSettingApi.getRecharge(uId, params)
      .then(action('getRecharge_success', resp => {
        const noData = resp.data.content === undefined || resp.data.content.length === 0;
        this.tabs.recharge = noData ? {error: {message: '暂无充值记录'}, content: []} : resp.data;
        uiStore.updateUiStore('accountRecharge.totalElements', pathval.getPathValue(resp, 'data.totalElements') || 0);
      }))
      .catch(action('getRecharge_error', err => {
        this.tabs.recharge = {error: err.response.data, content: []};
      }));
  }
  @action.bound getSummary(uId) {
    this.tabs.summary = {};
    const params = uiStore.uiState.accountSummary;
    delete params.totalElements;
    accountSettingApi.getSummary(uId, params)
      .then(action('getSummary_success', resp => {
        const noData = resp.data.page === undefined || resp.data.page.content.length === 0;
        this.tabs.summary = noData ? {error: {message: '暂无消费记录'}, page: []} : resp.data;
        uiStore.updateUiStore('accountSummary.totalElements', pathval.getPathValue(resp, 'data.page.totalElements') || 0);
      }))
      .catch(action('getSummary_error', err => {
        this.tabs.summary = {error: err.response.data, page: []};
      }));
  }
  @action.bound getLoginRecord(uId) {
    this.tabs.loginRecord = {};
    const params = uiStore.uiState.accountLoginRecord;
    delete params.totalElements;
    accountSettingApi.getLoginRecord(uId, params)
      .then(action('getLoginRecord_success', resp => {
        const noData = resp.data.content === undefined || resp.data.content.length === 0;
        this.tabs.loginRecord = noData ? {error: {message: '暂无登录记录'}, content: []} : resp.data;
        uiStore.updateUiStore('accountLoginRecord.totalElements', pathval.getPathValue(resp, 'data.totalElements') || 0);
      }))
      .catch(action('getLoginRecord_error', err => {
        this.tabs.loginRecord = {error: err.response.data, content: []};
      }));
  }
  @action.bound resetTree() {
    this.tree = {
      searchInput: '',
      activeIndex: 0,
      activeId: -1,
      data: {},
    };
  }
  @action.bound resetAddModal() {
    this.addModal = {
      visible: false,
      errorMsg: '',
      loading: false,
      form: {
        email: {
          value: '',
          vdRule: 'vdEmail',
          errorMsg: '',
        },
        password: {
          value: '',
          vdRule: 'vdPwd',
          errorMsg: '',
        },
        confirmPassword: {
          value: '',
          vdRule: 'vdRePwd',
          errorMsg: '',
        },
        contact: {
          value: '',
          vdRule: 'vdName',
          errorMsg: '',
        },
        department: {
          value: '',
          vdRule: '',
          errorMsg: '',
        },
        contactPosition: {
          value: '',
          vdRule: '',
          errorMsg: '',
        },
        phone: {
          value: '',
          vdRule: '',
          errorMsg: '',
        },
        contactEmail: {
          value: '',
          vdRule: '',
          errorMsg: '',
        },
      },
    };
  }
  @action.bound resetBase() {
    this.base = {};
  }
  @action.bound resetPwdModal() {
    this.pwdModal = {
      visible: false,
      errorMsg: '',
      loading: false,
      form: {
        oldPwd: {
          value: '',
          vdRule: 'vdPwdIsNotEmpty',
          errorMsg: '',
        },
        newPwd: {
          value: '',
          vdRule: 'vdPwd',
          errorMsg: '',
        },
        reNewPwd: {
          value: '',
          vdRule: 'vdRePwd',
          errorMsg: '',
        },
      }
    };
  }
  @action.bound resetEditModal() {
    this.editModal = {
      visible: false,
      errorMsg: '',
      actName: 'contact',
      loading: false,
      form: {
        contact: {
          value: '',
          vdRule: 'vdName',
          errorMsg: '',
          placeholder: '姓名（必填）',
          title: '修改姓名',
        },
        contactPosition: {
          value: '',
          vdRule: '',
          errorMsg: '',
          placeholder: '职务',
          title: '修改职务',
        },
        department: {
          value: '',
          vdRule: '',
          errorMsg: '',
          placeholder: '部门',
          title: '修改部门',
        },
        phone: {
          value: '',
          vdRule: '',
          errorMsg: '',
          placeholder: '电话',
          title: '修改电话',
        },
        contactEmail: {
          value: '',
          vdRule: '',
          errorMsg: '',
          placeholder: '邮箱',
          title: '修改邮箱',
        },
      }
    };
  }
  @action.bound resetTabs() {
    this.tabs = {
      activeKey: '消费记录',
      business: {
        reportAndMonitor: {},
        province: {},
        industry: {},
        scale: {},
      },
      consume: {},
      alertCorp: {},
      recharge: {},
      summary: {},
      loginRecord: {},
    };
  }
  @action.bound resetStore() {
    this.resetTree();
    this.resetAddModal();
    this.resetBase();
    this.resetPwdModal();
    this.resetEditModal();
    this.resetTabs();
    uiStore.resetAccountPager();
  }
}

export default new AccountSettingStore();
