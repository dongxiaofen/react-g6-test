import logoImgDx from '../../static/images/1.6/Header/logo.png';
import logoImgGd from '../../static/images/loginGd/logo2.png';
import logoImgSc from '../../static/images/homePage/header_logo_1.png';

import loginLogo from 'imgs/login/loginLogo.png';
import cfcaLoginLogo from 'imgs/login/cfca_loginLogo.png';
import dxLoginLogo from '../../static/images/1.6/login/dx_loginLogo.png';
import appCodeImg from '../../static/images/1.6/Header/appCode.png';
import appCodeImgSc from 'imgs/homePage/downloadApp2.png';
export default function getPermissionMeta(env) {
  let obj;
  if (env === 'dianxin_prod') {
    obj = {
      logo: logoImgDx,
      favicon: '/favicon2.ico',
      scmSource: 'TEL_WEB',
      logoStyle: 'logo',
      loginLogo: dxLoginLogo,
      loginLogoStyle: 'dxLoginLogoImg',
      beian: '渝ICP备12002268号 Copyright @ 2013-2014 版权归中国电信金融行业信息化应用（重庆）基地所有',
      title: '烽火台 | 实时预警提升企业决策力',
      pdfStyle: 'telPdfBg',
      downloadApp: appCodeImg,
    };
  }else if (env === 'gd_dianxin_prod') {
    obj = {
      logo: logoImgGd,
      favicon: '/favicon2.ico',
      scmSource: 'TEL_WEB',
      logoStyle: 'logoGd',
      loginLogo: dxLoginLogo,
      loginLogoStyle: 'dxLoginLogoImg',
      beian: '渝ICP备12002268号 Copyright @ 2013-2014 版权归中国电信金融行业信息化应用（重庆）基地所有',
      title: '实时预警提升企业决策力',
      pdfStyle: 'telPdfBg',
      downloadApp: appCodeImg,
    };
  }else if (env === 'cfca_prod') {
    obj = {
      logo: logoImgSc,
      favicon: '/favicon3.ico',
      scmSource: 'SC_WEB',
      logoStyle: 'cfca_logo',
      loginLogo: cfcaLoginLogo,
      loginLogoStyle: 'cfcaLoginLogoImg',
      beian: '京ICP证120015号 京公网安备110102005601',
      title: '洞悉-风险管理平台',
      pdfStyle: 'cfcaPdfBg',
      downloadApp: appCodeImgSc,
    };
  }else {
    obj = {
      logo: logoImgSc,
      favicon: '/favicon3.ico',
      scmSource: 'SC_WEB',
      logoStyle: 'sc_logo',
      loginLogo: loginLogo,
      loginLogoStyle: 'loginLogoImg',
      beian: '渝公网安备 50019002500288号',
      title: '星象-风险管理平台',
      pdfStyle: 'cfcaPdfBg',
      downloadApp: appCodeImgSc,
    };
  }
  return obj;
}
