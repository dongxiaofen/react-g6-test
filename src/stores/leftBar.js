import { observable, action, reaction, runInAction } from 'mobx';
const helpInfo1 = '创建高级查询报告、深度分析报告、主体监控报告后，可查看该板块信息';
const helpInfo2 = '创建主体监控报告后，可查看该板块信息';
const helpInfo3 = '创建深度分析报告、主体监控报告后，可查看该板块信息';
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
  barConf = [
    {
      menuText: '信息报告',
      menuKey: 'report',
      children: [
        { menuText: '企业基本信息', menuKey: 'corpDetail', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report', 'relation', 'free'] },
        { menuText: '上市披露', menuKey: 'stock', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report'] },
        { menuText: '风险信息', menuKey: 'risk', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report', 'relation', 'free'] },
        { menuText: '新闻信息', menuKey: 'internet', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report', 'relation'] },
        { menuText: '经营信息', menuKey: 'assets', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report'] },
        { menuText: '团队信息', menuKey: 'team', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report'] },
      ],
      helpInfo: helpInfo1,
      contain: ['main', 'analysisReport', 'report', 'relation', 'free'],
    },
    {
      menuText: '关联网络',
      menuKey: 'network',
      children: [
        { menuText: '关联关系', menuKey: 'network', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report'] },
        { menuText: '风险关系', menuKey: 'blackNetwork', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report'] },
      ],
      helpInfo: helpInfo1,
      contain: ['main', 'analysisReport', 'report'],
    },
    {
      menuText: '趋势分析',
      menuKey: 'trendAnalyse',
      children: [
        { menuText: '事件时间轴', menuKey: 'timeAxis', helpInfo: helpInfo2, contain: ['main'] },
        { menuText: '预警分析', menuKey: 'alertAnalysis', helpInfo: helpInfo3, contain: ['main', 'analysisReport'] },
      ],
      helpInfo: helpInfo3,
      contain: ['main', 'analysisReport'],
    },
    {
      menuText: '信息核查',
      menuKey: 'infoCheck',
      children: [
        {menuText: '关联人核查', menuKey: 'relPerCheck', helpInfo: helpInfo1, contain: ['main', 'analysisReport', 'report']},
      ],
      helpInfo: helpInfo1,
      contain: ['main', 'analysisReport', 'analysisReport', 'report'],
    },
    {
      menuText: '企业现勘',
      menuKey: 'corprationXk',
      children: [
        { menuText: '现勘记录', menuKey: 'xkRecord', helpInfo: helpInfo2, contain: ['main'] },
      ],
      helpInfo: helpInfo2,
      contain: ['main'],
    },
  ];

  @action.bound setMenuByItem() {
    const barConf = this.barConf;
    barConf.forEach(item => {
      item.children.forEach(child => {
        if (child.menuKey === this.activeItem) {
          runInAction('切换报告runInAction一级目录', () => {
            if (!this.activeMenu.includes(item.menuKey)) {
              this.activeMenu.push(item.menuKey);
            }
          });
        }
      });
    });
  }
  @action.bound getReportType(routing) {
    const { monitorId, reportId, analysisReportId, companyName, companyType } = routing.location.query;
    let reportType;
    if (monitorId) {
      if (companyType === 'MAIN') {
        reportType = 'main'; // 主体监控报告
      } else {
        reportType = 'relation'; // 监控关联报告
      }
    }
    if (reportId) {
      reportType = 'report'; // 高级报告
    }
    if (analysisReportId) {
      reportType = 'analysisReport'; // 深度分析报告
    }
    if (companyName) {
      reportType = 'free'; // 免费报告
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
