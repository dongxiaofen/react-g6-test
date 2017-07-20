const config = {
  RegisterInfo: {
    'enterpriseName': '企业名称',
    'regNo': '工商注册号',
    'esDate': '成立日期',
    'frName': '法人姓名',
    'socialCreditIdentifier': '社会信用代码',
    'orgNum': '组织机构代码',
    'regCap': '注册金',
    'recCap': '实收资本',
    'enterpriseStatus': '经营状态',
    'industryPhyName': '行业门类',
    'industryName': '国民经济行业',
    'address': '注册地址',
    'enterpriseType': '企业（机构）类型',
    'regOrg': '登记机关',
    'openFrom': '经营期',
    // 'openTo': '经营期限至',
    'ancheDate': '最后年检日期',
    'cancelDate': '注销/吊销日期',
    // 'revokeDate': '吊销日期',
    'abuItem': '许可经营项目',
    'cbuItem': '一般经营项目',
    'operateScope': '经营（业务）范围',
  },
  punishListInfo: {
    'illegalFacts': '主要违法事实',
    'illegalIncome': '违法所得（万元）',
    'penaltyDate': '处罚决定书签发日期',
    'isCancel': '是否注销',
    'penaltyAmount': '罚款金额（万元）',
    'forfeitureAmount': '没收金额(万元)',
    'changeAmount': '变价金额（万元）',
    'punishmentExecution': '处罚执行情况',
    'lawsuit': '诉讼情况',
    'reconsideration': '复议情况',
    'transferJudicialOrg': '移送司法机关情况',
    'punishmentBasis': '处罚依据',
    'illegalActivities': '违法行为'
  },
  equityFreeze: {
    'freMoney': '股权冻结数额',
    'freRatio': '股权冻结比例',
    'freFromDate': '冻结开始日期',
    'freOrgName': '冻结机关',
    'freDocId': '冻结文号',
    'freToDate': '冻结截止日期',
    'unfreOrgName': '解冻机关',
    'unfreDocId': '解冻文号',
    'unfreDate': '解冻日期',
    'unfreInfo': '股权冻结数额',
  },
  equityPledge: {
    'imporg': '质权人姓名',
    'imporgType': '出质人类别',
    'imporgAmount': '出质金额（万元）',
    'imporgRecordDate': '出质备案日期',
    'imporgAthOrg': '出质审批部门',
    'imporgDate': '出质批准日期',
    'imporgTo': '出质截至日期'
  },
  equityPledgePdf: {
    assignee: '受让人',
    transferType: '转让类型',
    pledgeDate: '转让日期',
    pledgedAmount: '转让额',
    transfersRatio: '转让额所占比例',
  },
  equityTransfer: {
    assignee: '受让人',
    transferType: '转让类型',
    pledgeDate: '转让日期',
    pledgedAmount: '转让额',
    transfersRatio: '转让额所占比例',
  },
  corporateMortgage: {
    assignee: '受让人',
    transferType: '转让类型',
    pledgeDate: '转让日期',
    pledgedAmount: '转让额',
    transfersRatio: '转让额所占比例',
  },
  shareholder: {
    'shareholderName': '股东姓名',
    'shareholderType': '股东类型',
    'subConam': '认缴出资额',
    'relConam': '实缴出资额',
    'fundedRatio': '出资比例',
    'conDate': '出资日期',
  },
  personList: {
    'name': '姓名',
    'position': '职位',
  },
  filiationList: {
    'brName': '企业名称',
    'brRegno': '注册号',
    'brPrincipal': '负责人',
    'cbuItem': '经营项目',
    'brAddr': '地址',
    'belong_org': '登记机关',
  },
  entinvItemLists: {
    'entName': '投资企业名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'fundedRatio': '认缴出资比例',
    'subConam': '认缴出资额（万元）',
    'regCap': '注册资本（万元）',
    'name': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
  },
  entinvItemListsPdf: {
    'entName': '名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'fundedRatio': '出资比例',
    'subConam': '认缴出资额（万元）',
    'regCap': '注册资金（万元）',
    'name': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
  },
  frinvList: {
    'entName': '投资企业名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'fundedRatio': '出资比例',
    'subConam': '认缴出资额（万元）',
    'regCap': '注册资金（万元）',
    'frName': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
  },
  frinvListPdf: {
    'entName': '名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'fundedRatio': '出资比例',
    'subConam': '认缴出资额（万元）',
    'otherPosition': '担任职位',
    'position': '担任职位',
    'regCap': '注册资金（万元）',
    'frName': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
  },
  frPositionList: {
    'entName': '任职企业名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'position': '担任职位',
    'lerepsign': '是否为法人代表',
    'regCap': '注册资金（万元）',
    'frName': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
    otherPosition: '担任职位'
  },
  frPositionListPdf: {
    'entName': '名称',
    'entStatus': '状态',
    'entType': '类型',
    'esDate': '成立日期',
    'position': '职位',
    'lerepsign': '是否为法人代表',
    'regCap': '注册资金（万元）',
    'frName': '法人代表',
    'regNo': '注册号',
    'regOrg': '登记机关',
  },
  sharesFrostListItemLists: {
    'freMoney': '股权冻结数额',
    'freRatio': '股权冻结比例',
    'freFromDate': '冻结开始日期',
    'freOrgName': '冻结机关',
    'freDocId': '冻结文号',
    'freToDate': '冻结截止日期',
    'unfreOrgName': '解冻机关',
    'unfreDocId': '解冻文号',
    'unfreDate': '解冻日期',
    'unfreInfo': '股权冻结数额',
  },
  sharesTransferListItemLists: {
    'assignee': '受让人',
    'transferType': '转让类型',
    'pledgeDate': '转让日期',
    'pledgedAmount': '股权转让数额',
    'transfersRatio': '转让额所占比例',
  },
  sharesImpawnListItemLists: {
    'imporg': '质权人姓名',
    'imporgType': '出质人类别',
    'imporgAmount': '出质金额（万元）',
    'imporgRecordDate': '出质备案日期',
    'imporgAthOrg': '出质审批部门',
    'imporgDate': '出质批准日期',
    'imporgTo': '出质截至日期'
  },
  alterList: {
    'altDate': '变更日期',
    'altItem': '变更事项',
    'altBe': '变更前信息',
    'altAf': '变更后信息',
  },
  yearBaseInfo: {
    'name': '名称',
    'regNo': '注册号',
    'enterpriseStatus': '企业经营状态',
    'employeeCount': '从业人数',
    'zipcode': '邮政编码',
    'phone': '企业联系电话',
    'email': '电子邮箱',
    'address': '企业通信地址',
    'buyEquity': '是否有投资信息或购买其他公司股权',
    'equityTransfer': '本年度是否发生股东股权转让',
  },
  yearWebsite: {
    'type': '类型',
    'name': '名称',
    'link': '网址'
  },
  yearInvestor: {
    'shareholderName': '股东',
    'subConam': '认缴出资额（万元）',
    'subConDate': '认缴出资时间',
    'subConType': '认缴出资方式',
    'paidConMoney': '实缴出资额（万元）',
    'paidTime': '实缴出资时间',
    'paidType': '实缴出资方式'
  },
  yearAssetsInfo: {
    'generalAssets': '资产总额',
    'ownersEequity': '所有者权益合计',
    'revenue': '销售总额',
    'profit': '利润总额',
    'mainRevenue': '营业总收入中主营业务收入',
    'netProfit': '净利润',
    'taxPayment': '纳税总额',
    'liability': '负债总额',
  },
  yearEquityChange: {
    'shareholderName': '股东',
    'equityBefore': '变更前股权比例',
    'equityAfter': '变更后股权比例',
    'time': '股权变更日期',
  },
  yearChangeRecords: {
    'changedItem': '修改事项',
    'beforeChange': '修改前',
    'afterChange': '修改后',
    'time': '修改日期',
  },
  // 行业
  relationReport: {
    'title': '报告标题',
    'agency': '报告来源',
    'publishTime': '报告时间',
  },
  // 网络图对外投资
  entinvItemList: {
    'entName': '公司名称',
    'regNo': '注册号',
    'name': '法人代表',
    'entType': '企业类型',
    'regCap': '注册资本（单位：万元）',
    'esDate': '成立时间',
    'regCapcur': '注册币种',
    'regOrg': '登记机关',
    'entStatus': '登记状态',
    'hr': '横线',
    'subConam': '认缴出资额（单位：万元）',
    'currency': '认缴出资币种',
    'fundedRatio': '认缴出资比例',
    'frName': '法人姓名',
  },
  frPositionListForPortal: {
    'entName': '公司名称',
    'regNo': '注册号',
    'frName': '姓名',
    'entType': '企业类型',
    'regCap': '注册资本（万元）',
    'esDate': '成立时间',
    'regCapCur': '注册币种',
    'regOrg': '登记机关',
    'entStatus': '登记状态',
    'hr': '横线',
    'position': '职位',
    'lerepsign': '是否法定代表人',
  },
  // 资产
  trademark: {
    'name': '商标名称',
    // 'categoryId': '分类编号',
    'flowStatus': '商标状态',
    'flowStatusTime': '状态更新时间',
    'category': '商标分类',
  },
  patentInfo: {
    'title': '专利名称',
    'classificationNumbercname': '专利分类',
    'type': '专利类型',
    'classificationNumber': '分类号',
    'authPubDate': '授权日期',
    'authPubNum': '授权号',
    'classificationNumberNumber': '分类号',
    // 'applyPubNum': '分类号',
    'inventionPerson': '发明人',
    // 'applyPubDate': '发布日期',
    'applyNum': '申请号',
    'applyDate': '申请日期',
    // 'authPubNum': '公布号',
    'description': '专利描述',
  },
  biddingList: {
    'title': '招投标标题',
    'type': '公告类型',
    'announceType': '公告类型',
    'publishDate': '公告日期', //PDF里面使用不要注释
    'publishedDateTime': '公告日期',
    'participator': '投标方',
    'date': '公告日期',
    // 'url': '查看详情',
  },
  newsDict: {
    // '人员变更': ['任职', '离职', '团队'],
    // '诉讼纠纷': ['违法', '侵权', '信用', '负面消息'],
    // '企业战略': ['方向', '资金', '上市', '股权', '合作'],
    // '经营状况': ['质押', '风险', '经营', '盈亏', '负债'],
    // '品牌产品': ['品牌', '产品项目'],
    // default
    '人事变动': ['高管变动', '员工情况'],
    '诉讼纠纷': ['违法涉诉'],
    '企业战略': ['投资融资', '业务变动', '收购重组', '股权变动', '合作经营', '重大交易'],
    '经营状况': ['债务抵押', '安全事故', '亏损盈利'],
    '品牌产品': ['公司信息', '成果奖项', '产品信息'],
    '其他新闻': ['相关提及', ''],
  },
  newsContent: {
    'title': '新闻标题',
    'label': '新闻类型',
    'publishTime': '发布日期',
    'source': '新闻来源',
  },
  recruitmentJob: {
    'position': '近期招聘职位',
    'salary': '薪资',
    'address': '地点',
    'requireNum': '人数',
    'releaseTime': '职位发布时间',
  },
  recruitment: {
    '4k<': '4K以下',
    '4k-8k': '4k-8k',
    '8k-15k': '8k-15k',
    '>15k': '15k以上',
    '面议': '面议',
  },
  courtCount: {
    'courtAnnouncement': '法院公告',
    'courtNotice': '开庭公告',
    'judgeDoc': '判决文书',
    'courtExecution': '被执行人信息',
    'dishonestyList': '失信被执行人信息',
    'litigationAssets': '涉诉资产',
  },
  courtAnnouncement: {
    'type': '公告类型',
    'typeName': '公告类型',
    'docType': '公告类型',
    'publishTime': '公告时间',
    'court': '公告法院',
    'judgeTime': '开庭时间',
    'plaintiff': '原告',
    'defendant': '被告',
    'province': '省份',
    'caseCode': '案号',
    'caseReason': '案由',
    'identity': '本案身份',
    'content': '公告内容',
    'relevantDepartments': '当事方',
    'litigant': '当事方',
  },
  // 开庭公告
  courtNotice: {
    'court': '公告法院',
    'publishDate': '公告时间',
    'judgeTime': '开庭时间',
    'identity': '本案身份',
    'title': '公告标题',
    'caseCode': '案号',
    'caseReason': '案由',
    'areaName': '省份',
    'relevantDepartments': '当事方',
    'litigant': '当事方',
    'content': '公告内容',
    'detail': '公告内容',
  },
  judgeDoc: {
    'companyName': '事件企业',
    'relation': '关联关系',
    'publishDate': '发布日期',
    'title': '文书标题',
    'court': '判决法院',
    'caseCode': '案件字号',
    'content': '文书详情',
    'caseReason': '案由',
    'trailDate': '裁判日期',
    'litigant': '当事方',
    'identity': '本案身份',
    'detail': '文书详情',
    'label': '审判程序',
    'docId': 'link',
  },
  courtList: {
    'courtNotice': '开庭公告',
    'courtAnnouncement': '法院公告',
    'judgeDoc': '判决文书',
    'courtExecution': '被执行人信息',
    'dishonestyList': '失信被执行人信息',
    'litigationAssets': '涉诉资产',
    'blackList': '失信信息'
  },
  courtExecuted: {
    'caseCreateTime': '立案时间',
    'pname': '被执行人姓名/名称',
    'orgCode': '被执行人组织机构代码',
    'caseCode': '案号',
    'execCourtName': '执行法院',
    'caseState': '案件状态',
    'execMoney': '执行标的（元）',
  },
  courtDishonesty: {
    'publishDate': '发布日期',
    'companyName': '失信被执行人全称',
    'relation': '关联关系',
    'orgCode': '组织机构代码',
    'frName': '法人',
    'disruptTypeName': '失信被执行人行为具体情形',
    'caseCode': '案号',
    'areaName': '区域',
    'gistId': '执行依据文号',
    'regDate': '立案日期',
    'gistUnit': '作出执行依据单位',
    'duty': '生效法律文书确定的义务',
    'performance': '被执行履行情况',
    'courtName': '执行法院',
  },
  dishonestyList: {
    'publishDate': '发布日期',
    'companyName': '失信被执行人全称',
    'relation': '关联关系',
    'orgCode': '组织机构代码',
    'frName': '法人',
    'disruptTypeName': '失信被执行人行为具体情形',
    'caseCode': '案号',
    'areaName': '区域',
    'gistId': '执行依据文号',
    'regDate': '立案日期',
    'gistUnit': '作出执行依据单位',
    'duty': '生效法律文书确定的义务',
    'performance': '被执行履行情况',
    'courtName': '执行法院',
  },
  courtLitigation: {
    'releaseTime': '发布日期',
    'title': '项目名称',
    'category': '资产类别',
    'location': '所在地',
    'court': '委托法院',
    'status': '状态',
    'price': '参考价（万元）',
    'result': '成交结果',
    'contactPerson': '联系人',
    'contactPhone': '联系电话',
    'sourceUrl': '信息来源',
    'projectNotice': '项目公告',
  },
  punishList: {
    'abnormalOperation': '经营异常信息',
    'checkMessage': '抽查检查信息',
  },
  jyErrorData: {
    'specauseno': '序号',
    'abntime': '列入日期',
    'specause': '列入经营异常名录原因',
    'retime': '移除日期',
    'recause': '移除经营异常名录原因',
    'decorg': '作出决定机关',
  },
  checkMessage: {
    'seqNo': '序号',
    'institution': '检查实施机关',
    'checkType': '类型',
    'checkDate': '日期',
    'checkResult': '结果',
  },
  illegalRecord: {
    'illegalIncome': '违法所得(万元)',
    'penaltyDate': '处罚决定书签发日期',
    'isCancel': '是否注销',
    'penaltyAmount': '罚款金额(万元)',
    'ForfeitureAmount': '没收金额(万元)',
    'changeAmount': '变价金额(万元)',
    'lawsuit': '诉讼情况',
    'reconsideration': '复议情况',
    'transferJudicialOrg': '移送司法机关情况',
    'illegalActivities': '违法行为',
    'punishmentExecution': '处罚执行情况',
    'punishmentBasis': '处罚依据',
    'illegalFacts': '主要违法事实',
  },
  checkMessageList: {
    'seqNo': '序号',
    'institution': '检查实施机关',
    'checkType': '类型',
    'checkDate': '日期',
    'checkResult': '结果',
  },
  taxPublicInfo: {
    'evalDate': '公告时间',
    'blackType': '公告类型',
    'areaName': '区域名称',
    'taxOrgType': '税务局分类',
    'managerOrg': '主管税务机构',
    'taxOrg': '公告税务局',
    'taxType': '税种',
    'taxSum': '余额或金额(元)',
    'financeName': '财务负责人姓名',
    'financeCardNo': '财务负责人证件号码',
    'address': '生产经营地址',
    'contactPhone': '联系电话',
    'illegal': '违法事实及处罚情况',
    'isOwingTax': '有无欠税',
    'evalReason': '认定原因',
  },
  newsAlter: {
    'title': '新闻标题',
  },
  bidding: {
    'title': '标题',
    'publishDate': '公告时间',
    'participator': '投标方',
    'detail': '详细信息',
  },
  blackList: {
    'companyName': '风险关联公司',
    'layer': '关联层数',
    'riskRecord': '疑似风险记录',
  },
  currentNetwork: {
    'name': '关联企业/关系人',
    'relation': '与主体企业关系',
    'invConum': '投资金额',
    'invRatio': '投资比例',
    'monitorStatus': '状态',
    'status': '是否注销',
    'caseRecord': '疑似风险记录',
  },
  TradeMark: {
    'name': '商标名称',
    'flowStatus': '商标状态',
    'base64': '商标图片',
    'category': '商标分类'
  },
  Patent: {
    'title': '专利名称',
    'classificationNumbercname': '专利分类',
    'applyDate': '申请日期',
    'applyNum': '申请号',
    'classificationNumber': '分类号',
    'authPubNum': '授权号',
    'inventionPerson': '发明人',
    'type': '专利类型',
    'description': '专利描述',
  },
  recruitAddress: {
    'time': '日期',
    'address': '新增招聘地址'
  },
  recruitLeaving: {
    'time': '日期',
    'leaving': '刷新简历人数'
  },
  recruitPosition: {
    'time': '日期',
    'position': '新增招聘职位'
  },
  recruitSalaryAvg: {
    'time': '日期',
    'salary': '平均薪资'
  },
  recruitmentStatisticResponse: {
    'categoryInfo': '招聘岗位分析',
    'degreeInfo': '招聘学历要求',
    'location': '办公地点',
    'salaryAvg': '平均薪资',
    'salaryDis': '招聘平均薪资',
    'scale': '从业人员',
    'workingYearsAvg': '平均工作年限',
  },
  // 招聘岗位分布
  categoryInfo: {
    'name': '职位',
    'value': '百分比',
  },
  // 招聘学历要求
  degreeInfo: {
    'name': '学历',
    'value': '百分比',
  },
  // 所学专业
  categoryTypeInfo: {
    'name': '专业',
    'value': '百分比',
  },
  // 招聘列表
  category: {
    'category': '职位',
    'salaryText': '薪资',
    'address': '地点',
    'requireNum': '人数',
    'releaseTime': '职位发布时间',
  },
  recentRecruitment: {
    category: '近期招聘职位',
    salaryText: '薪资',
    address: '地点',
    requireNum: '人数',
    releaseTime: '职位发布时间',
  },
  // 新增离职意向
  dimissions: {
    dimissions: '在职员工刷新求职简历'
  },
  // 新增岗位
  job: {
    posts: '新增岗位（首次招聘）',
    address: '详细地点',
    position: '岗位',
    salary: '薪资',
    requireNum: '人数',
  },
  recLocation: {
    locations: '新增办公地点（首次招聘）',
    address: '详细地点',
    position: '岗位',
    salary: '薪资',
    requireNum: '人数',
  },
  brief: {
    'stockCode': '股票代码',
    'company_name': '公司简称',
    'company_english_name': '英文名称',
    'legal_person': '法定代表人',
    'secretary': '公司董秘书',
    'primary_industry': '行业种类',
    'issued_price': '发行价格（元）',
    'issued_shares': '发行数量（万股）',
    'pe': '发行市盈率（倍）',
    'reg_cap': '注册资本（万元）',
    'listing_date': '上市时间',
    'prospectus_date': '招股时间',
    'fax': '公司传真',
    'zipcode': '邮政编码',
    'website': '公司网址',
    'reg_address': '注册地址',
    'release_mode': '发行方式',
    'sponsor_institution': '保荐机构',
    'listing_recommender': '上市推荐人',
    'main_underwriter': '主承销商',
  },
  stockShareHolder: {
    'name': '股东名称',
    'shares': '持股数量（股）',
    'proportion': '持股比例（%）',
    'shares_property': '股份性质',
  },
  stockCirculateShareHolder: {
    'name': '股东名称',
    'shares': '持股数量（股）',
    'proportion': '持股比例（%）',
    'shares_property': '股份性质',
  },
  stockManagement: {
    'name': '姓名',
    'position': '职务',
    'birth_year': '出生年份',
    'gender': '性别',
    'degree': '学历',
  },
  stockAnnouncement: {
    'title': '公告标题',
    'type': '公告类型',
    'announcementTime': '公告日期',
  },
  news: {
    'title': '新闻标题',
    'alterDt': '发布日期',
    'detail': '新闻详情', // 预警分析详情
  },
  stock: {
    'title': '公告标题'
  },
  executed: {
    'caseNO': '案件编号',
    'court': '法院',
    'executionTarget': '执行金额（元）',
    'recordTime': '立案时间',
  },
  personBlacklist: {
    'publishSource': '贷款平台',
    'loanAmount': '贷款金额（元）',
    'overAmount': '逾期金额（元）',
    'state': '还款状态',
    'loanDate': '贷款日期',
    'loanTerm': '贷款期限（年）',
    'overDate': '逾期开始日期'
  },
  rule32to50: {
    companyName: '关联企业',
    relation: '关联关系',
    policy: '参考依据',
  },
  rule11: {
    companyName: '关联企业',
    relation: '关联关系',
    altDate: '变更日期',
    altBe: '变更前',
    altAf: '变更后'
  },
  rule12: {
    companyName: '关联企业',
    relation: '关联关系',
  },
  rule7: {
    companyName: '关联企业',
    relation: '关联关系',
    casesDis: '失信被执行人记录',
    casesLegal: '作为被告且败诉的法务信息',
  },
  rule10: {
    involedIndustryPolicy: '政策依据',
  },
  rule12to31: {
    policy: '政策依据',
  },
  biddingStatistic: {
    winMoneyAmount: '总中标金额（元）',
    winCount: '总中标次数',
    bidMoneyAmount: '总投标金额（元）',
    bidCount: '总投标次数',
  },
  biddingCount: {
    bidCount: '总投标数',
    bidMoneyAmount: '总投标金额（元）',
    winCount: '总中标数量',
    winMoneyAmount: '总中标金额（元）',
  },
  biddingTable: {
    date: '日期',
    bidCount: '投标数',
    bidMoneyAmount: '投标金额（元）',
    winCount: '中标数量',
    winMoneyAmount: '中标金额（元）',
  }
};

export default config;
