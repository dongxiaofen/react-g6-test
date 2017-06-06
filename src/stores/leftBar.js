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
    'report': [
      {
        menuText: '基本信息',
        menuKey: 'report',
        children: [
          {
            menuText: '工商信息',
            menuKey: 'corpDetail',
          },
          {
            menuText: '对外投资任职',
            menuKey: 'investAndOffice',
          },
          {
            menuText: '上市披露',
            menuKey: 'stock',
          },
          {
            menuText: '税务信息',
            menuKey: 'tax',
          },
          {
            menuText: '风险信息',
            menuKey: 'risk',
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
        menuText: '关联网络',
        menuKey: 'network',
        children: [
          {
            menuText: '关联关系',
            menuKey: 'network',
          },
          {
            menuText: '风险关系', menuKey: 'blackNetwork',
          },
        ],
      },
      {
        menuText: '趋势分析',
        menuKey: 'trendAnalyse',
        children: [
          {
            menuText: '事件时间轴',
            menuKey: 'timeAxis',
          },
          {
            menuText: '预警分析',
            menuKey: 'alertAnalysis',
          },
        ],
      },
      {
        menuText: '信息核查',
        menuKey: 'infoCheck',
        children: [
          {
            menuText: '关联人核查',
            menuKey: 'relPerCheck',
          },
          {
            menuText: '税务核查',
            menuKey: 'taxCheck',
          },
        ],
      },
      {
        menuText: '企业现勘',
        menuKey: 'corprationXk',
        children: [
          {
            menuText: '现勘记录',
            menuKey: 'nowRecord',
          },
        ],
      },
    ],
    loaning: [
      {
        menuText: '多维综合评价',
        menuKey: 'comprehenEval',
      },
      {
        menuText: '盈利能力分析',
        menuKey: 'profitEval',
      },
      {
        menuText: '营运能力分析',
        menuKey: 'operationEval',
      },
      {
        menuText: '成长能力分析',
        menuKey: 'growthAbilityEval',
      },
    ],
    monitor: [
      {
        menuText: '监控时间轴',
        menuKey: 'monitorTimeAxis',
      },
      {
        menuText: '监控预警',
        menuKey: 'monitorAlert',
      }
    ]
  }

  @action.bound setMenuByItem() {
    const barConf = this.barConf;
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
