import { observable, action } from 'mobx';
import { accountSettingApi } from 'api';
import pathval from 'pathval';
import Formater from 'helpers/formatTreeData';
import uiStore from './ui';
import messageStore from './message';
class AccountSettingStore {
  @observable tree = {
    searchInput: '',
    activeIndex: 0,
    data: {},
  };
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
  @observable base = {};
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
  @observable editModal = {
    visible: false,
    errorMsg: '',
    loading: false,
    form: {
      contact: {
        value: '',
        vdRule: 'vdName',
        errorMsg: '',
      },
      contactPosition: {
        value: '',
        vdRule: '',
        errorMsg: '',
      },
      department: {
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
    }
  };
  @observable tabs = {
    business: {
      reportAndMonitor: {},
      province: {},
      industry: {},
      scale: {},
    },
    consume: {},
    recharge: {},
    summary: {},
    loginRecord: {},
  };
  @action.bound changeValue(key, value) {
    pathval.setPathValue(this, key, value);
  }
  @action.bound changePwd(url, params) {
    this.pwdModal.loading = true;
    accountSettingApi.changePwd(url, params)
      .then(action('changePwd_success', () => {
        this.resetPwdModalInfo();
        messageStore.openMessage({
          type: 'info',
          content: '修改密码成功',
        });
      }))
      .catch(action('changePwd_error', err => {
        this.pwdModal.loading = false;
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '新增账号失败',
        });
      }));
  }
  @action.bound addNewUser(params) {
    this.addModal.loading = true;
    accountSettingApi.addNewUser(params)
      .then(action('addNewUser_success', () => {
        this.resetAddInfo();
        messageStore.openMessage({
          type: 'info',
          content: '新增账号成功',
        });
        accountSettingApi.getTreeList()
          .then(action('getTreeList_success', resp => {
            if (resp.data && resp.data.length > 0) {
              const treeData = new Formater(resp);
              treeData.formatData(null, null, 'cy@sc.cn');
              this.tree.data = {content: treeData.formatResult};
            } else {
              this.tree.data = {error: {message: '暂无用户信息'}, content: []};
            }
          }))
          .catch(action('getTreeList_error', err => {
            this.tree.data = {error: err.response.data, content: []};
          }));
      }))
      .catch(action('addNewUser_error', err => {
        messageStore.openMessage({
          type: 'error',
          content: err.response && err.response.data && err.response.data.message || '新增账号失败',
        });
        this.addModal.loading = false;
      }));
  }
  @action.bound getTreeList() {
    this.resetStore();
    accountSettingApi.getTreeList()
      .then(action('getTreeList_success', resp => {
        if (resp.data && resp.data.length > 0) {
          const treeData = new Formater(resp);
          treeData.formatData(null, null, 'cy@sc.cn');
          this.tree.data = {content: treeData.formatResult};
          const uId = treeData.formatResult[0].id;
          this.getUserInfo(uId);
          this.getReportAndMonitor(uId);
          this.getProvince(uId);
          this.getIndustry(uId);
          this.getScale(uId);
          this.getConsume(uId);
          this.getRecharge(uId);
          this.getSummary(uId);
          this.getLoginRecord(uId);
        } else {
          this.tree.data = {error: {message: '暂无用户信息'}, content: []};
        }
      }))
      .catch(action('getTreeList_error', err => {
        this.tree.data = {error: err.response.data, content: []};
        this.base = {data: {}};
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
    this.base = {};
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
        const noData = resp.data.monitorSatisic.length === 0 && resp.data.reportStatisic.length === 0;
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
  @action.bound getConsume(userId) {
    this.tabs.consume = {};
    const uId = userId || this.base.data.id;
    const params = uiStore.uiState.accountConsume;
    delete params.totalElements;
    accountSettingApi.getConsume(uId, params)
      .then(action('getConsume_success', resp => {
        const noData = resp.data.page === undefined || resp.data.page.content.length === 0;
        this.tabs.consume = noData ? {error: {message: '暂无消费记录'}, page: []} : resp.data;
        uiStore.updateUiStore('accountConsume.totalElements', resp.data.page.totalElements);
      }))
      .catch(action('getConsume_error', err => {
        this.tabs.consume = {error: err.response.data, page: []};
      }));
  }
  @action.bound getRecharge(userId) {
    this.tabs.recharge = {};
    const uId = userId || this.base.data.id;
    const params = uiStore.uiState.accountRecharge;
    delete params.totalElements;
    accountSettingApi.getRecharge(uId, params)
      .then(action('getRecharge_success', resp => {
        const noData = resp.data.content === undefined || resp.data.content.length === 0;
        this.tabs.recharge = noData ? {error: {message: '暂无充值记录'}, content: []} : resp.data;
        uiStore.updateUiStore('accountRecharge.totalElements', resp.data.totalElements);
      }))
      .catch(action('getRecharge_error', err => {
        this.tabs.recharge = {error: err.response.data, content: []};
      }));
  }
  @action.bound getSummary(userId) {
    this.tabs.summary = {};
    const uId = userId || this.base.data.id;
    const params = uiStore.uiState.accountSummary;
    delete params.totalElements;
    accountSettingApi.getSummary(uId, params)
      .then(action('getSummary_success', resp => {
        const noData = resp.data.page === undefined || resp.data.page.content.length === 0;
        this.tabs.summary = noData ? {error: {message: '暂无消费记录'}, page: []} : resp.data;
        uiStore.updateUiStore('accountSummary.totalElements', resp.data.page.totalElements);
      }))
      .catch(action('getSummary_error', err => {
        this.tabs.summary = {error: err.response.data, page: []};
      }));
  }
  @action.bound getLoginRecord(userId) {
    this.tabs.loginRecord = {};
    const uId = userId || this.base.data.id;
    const params = uiStore.uiState.accountLoginRecord;
    delete params.totalElements;
    accountSettingApi.getLoginRecord(uId, params)
      .then(action('getLoginRecord_success', resp => {
        const noData = resp.data.content === undefined || resp.data.content.length === 0;
        this.tabs.loginRecord = noData ? {error: {message: '暂无登录记录'}, content: []} : resp.data;
        uiStore.updateUiStore('accountLoginRecord.totalElements', resp.data.totalElements);
      }))
      .catch(action('getLoginRecord_error', err => {
        this.tabs.loginRecord = {error: err.response.data, content: []};
      }));
  }
  @action.bound resetAddInfo() {
    this.addModal = {
      visible: false,
      errorMsg: '',
      loading: false,
      form: {
        errorMsg: '',
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
  @action.bound resetPwdModalInfo() {
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
      loading: false,
      form: {
        contact: {
          value: '',
          vdRule: 'vdName',
          errorMsg: '',
        },
        contactPosition: {
          value: '',
          vdRule: '',
          errorMsg: '',
        },
        department: {
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
      }
    };
  }
  @action.bound resetStore() {
    this.resetAddInfo();
    this.tree.searchInput = '';
    this.tree.activeIndex = 0;
    this.tree.data = {};
    this.base = {};
    this.tabs = {
      business: {
        reportAndMonitor: {},
        province: {},
        industry: {},
        scale: {},
      },
      consume: {},
      recharge: {},
      summary: {},
      loginRecord: {},
    };
  }
}

export default new AccountSettingStore();
