import { observable, action, reaction } from 'mobx';
// const helpInfo1 = '创建监控后，可查看该板块信息';
// const helpInfo2 = '创建监控、报告后，可查看该板块信息';
class LeftBarStore {
  constructor() {
    reaction(
      () => this.activeItem,
      () => {
        this.setMenuByItem();
      }
    );
  }
  @observable activeMenu = [];
  @observable activeItem = '';
  barConf = {
    report: [
      {
        menuText: '基本信息',
        menuKey: 'report',
        children: [
          {
            menuText: '工商信息',
            menuKey: 'corpDetail',
          },
          {
            menuText: '上市披露',
            menuKey: 'stock',
          },
          {
            menuText: '新闻信息',
            menuKey: 'internet',
          },
          {
            menuText: '经营信息',
            menuKey: 'assets',
          },
          {
            menuText: '团队信息',
            menuKey: 'team',
          },
        ],
      },
      {
        menuText: '对外投资任职',
        menuKey: 'investAndOffice',
        children: [
          {
            menuText: '企业对外投资',
            menuKey: 'entinvItem',
          },
          {
            menuText: '法人对外投资任职',
            menuKey: 'frPosAndInv',
          },
          {
            menuText: '董监高对外投资任职',
            menuKey: 'managePosAndInv',
            lock: true,
          },
        ],
      },
      {
        menuText: '风险信息',
        menuKey: 'risk',
        children: [
          {
            menuText: '法务信息',
            menuKey: 'riskCourt',
          },
          {
            menuText: '行政信息',
            menuKey: 'riskCheck',
          },
          {
            menuText: '纳税公告',
            menuKey: 'riskTax',
          },
        ],
      },
      {
        menuText: '抵质押信息',
        menuKey: 'pledge',
        children: [
          {
            menuText: '股权相关',
            menuKey: 'equityRela',
          },
          // {
          //   menuText: '抵押相关',
          //   menuKey: 'mortgageRela',
          // },
        ],
      },
      {
        menuText: '关联图',
        menuKey: 'network',
        children: [
          {
            menuText: '基础关联',
            menuKey: 'network',
          },
          {
            menuText: '风险关系',
            menuKey: 'blackNetwork',
          },
        ],
      },
      {
        menuText: '企业历史',
        menuKey: 'trendAnalyse',
        children: [
          {
            menuText: '历史时间轴',
            menuKey: 'timeAxis',
            lock: true,
          },
          {
            menuText: '历史风险',
            menuKey: 'alertAnalysis',
            lock: true,
          },
        ],
      },
    ],
    loaning: [
      {
        menuText: '多维综合评价',
        menuKey: 'comprehenEval',
        lock: true,
        moduleKey: 'SCORE',
      },
      {
        menuText: '盈利能力分析',
        menuKey: 'profitEval',
        lock: true,
        developing: true,
        moduleKey: 'PROFIT',
      },
      {
        menuText: '营运能力分析',
        menuKey: 'operationEval',
        lock: true,
        developing: true,
        moduleKey: 'OPERATION',
      },
      {
        menuText: '成长能力分析',
        menuKey: 'growthAbilityEval',
        lock: true,
        developing: true,
        moduleKey: 'GROWING',
      },
    ],
    monitor: [
      {
        menuText: '监控时间轴',
        menuKey: 'monitorTimeAxis',
        lock: true,
      },
      {
        menuText: '监控预警',
        menuKey: 'monitorAlert',
        lock: true,
      }
    ]
  }

  @action.bound setMenuByItem() {
    const barConf = this.barConf;
    this.activeMenu.pop();
    Object.keys(barConf).forEach((moduleKey)=>{
      barConf[moduleKey].forEach(item => {
        if (item.children) {
          item.children.forEach(child => {
            if (child.menuKey === this.activeItem) {
              if (!this.activeMenu.includes(item.menuKey)) {
                this.activeMenu.push(item.menuKey);
              }
            }
          });
        }
      });
    });
  }
  @action.bound getReportType(routing) {
    const { monitorId, reportId} = routing.location.query;
    let reportType;
    if (monitorId) {
      reportType = 'monitor'; // 监控
    }
    if (reportId) {
      reportType = 'report'; // 报告
    }
    return reportType;
  }
  @action.bound resetStore() {
    this.activeMenu = ['report'];
    this.activeItem = 'corpDetail';
  }
  @action combineServerData(data) {
    this.activeItem = data.activeItem;
  }
}
export default new LeftBarStore();
