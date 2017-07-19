import fs from 'fs';
import cp from 'child_process';
import path from 'path';
import url from 'url';
import superagent from 'superagent';
import nodemailer from 'nodemailer';
import qiniu from 'qiniu';

const Access_Key = 'sDS7g5o_Ik92uZJ3_vCIP9qOk1RYzETIYF2o5VA-';
const Secret_Key = 'V5lMQ7JiZ-goU8L7bvm9PUVX5aYY779ACotOvkP1';
// const Bucket_Name = 'intel-wise';
// const DOMAIN = 'http://oq4zadj3a.bkt.clouddn.com/';
const Bucket_Name = 'sc-static';
const DOMAIN = 'http://static.socialcredits.cn/';

const BASE_DIRNAME = process.cwd();
const PDF_DIRNAME = path.join(BASE_DIRNAME, '/static/pdf/');

const _writeToLog = (fileName, str) => {
  const logPath = path.join(PDF_DIRNAME, `${fileName}.log`);
  fs.writeFile(logPath, str);
}

const writeDownLoadUrl = (fileName, str) => {
  const _str = `{downloadUrl: ${str}}`;
  writeToLog(fileName, _str);
}

// const deletePDFFile = (fileName) => {
//   const file = path.join(PDF_DIRNAME, `${fileName}`);
//   deleteFile(file);
// }

const deleteFile = (file, callBack) => {
  let command = ['./src/helpers/delPdf.sh'];
  if (typeof file === 'string') {
    command.push(file);
  } else if (Object.prototype.toString.call(file) === '[object Array]') {
    command = command.concat(file);
  }
  const del = cp.spawn("sh", command);
  del.stdout.on('end', function () {
    console.log('stdout: pdf删除成功');
    if (callBack) {
      callBack();
    }
  });
}

export const sendMail = (downloadUrl, mail) => {
  const transportor = nodemailer.createTransport({
    host: 'smtp.mxhichina.com',
    auth: {
      user: 'no-reply@socialcredits.cn',
      pass: 'abc123Ab'
    }
  });
  const mailOption = {
    from: 'no-reply@socialcredits.cn',
    to: mail || '494024259@qq.com',
    html: '<div style="margin:0 auto;padding: 30px;width: 838px;border:1px solid #e0e0e0;height: 870px;color: #757575">' +
    '<div><img src=/><span>d洞悉</span></div>' +
    '<div style="background-color: #e0e0e0;height: 1px;margin-top: 30px"></div>' +
    '<div style="font-family:MicrosoftYaHei-Bold;font-size:20px;color:#616161;margin-top: 50px">尊敬的用户，您好！</div>' +
    '<div style="font-size: 16px;margin-top: 30px">您选择下载的<span style="color:#42a5f5 ">重庆誉存大数据有限公司</span>的<span style="color:#42a5f5 ">贷前基础报告</span>已生成，请点击下方按钮下载报告</div>' +
    '<div style="width: 100%;text-align: center;margin-top: 60px">' +
    `<a href =${downloadUrl} style="display:inline-block;text-align: center;background-color:#42a5f5;width:230px;padding-top: 17px; padding-bottom:17px;border-radius: 10px;font-size: 20px;color: white">` +
    '<span>下载报告</span></a>' +
    '</div>' +
    '<div style="text-align: center;margin-top: 15px">下载即视为同意《<a style="color: #42a5f5">免责声明</a>》</div>' +
    '<div style="font-size: 14px;margin-top: 100px">声明：</br>' +
    '本报告的使用仅限于对目标公司的初步评估。未经星象书面授权，任何机构或个人不得以任何形式复制、转发或公开传播本报告的全部或部分内容，不得将报告内容作为诉讼、仲裁、传媒所引用之证明或依据，不得用于营利或用于未经允许的其它用途。</div>' +
    '<div style="text-align: center;color: #bdbdbd;font-size: 14px;margin-top: 50px">此邮件为 星象 · 风险管理平台 的系统邮件，无需回复。</div>' +
    '<div style="text-align: center;color: #ff9800;font-size: 36px;margin-top: 50px">联系我们：400-139-1819</div>' +
    '<div style="width: 100%;color: #9e9e9e;font-size: 14px;margin-top: 30px">' +
    '<span style="width: 33%;display: inline-block">星象网址： star.socialcredits.cn</span>' +
    '<span style="width: 33%;display: inline-block;text-align: center">企业网址： www.socialcredits.cn</span>' +
    '<span style="width: 33%;display: inline-block;text-align: right">企业邮箱： info@socialcredits.cn</span>' +
    '</div></div>',
    // attachments: [{
    //   filename: '01.png',
    //   path: './img/r-book1.png',
    //   cid: '00000001'
    // }]
  };
  transportor.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(('sendMail..err......' + error));
    } else {
      console.log('Message send success......' + info.response);
    }
  });
}
const deleteFileOnQiniu = (fileName, idx) => {
  qiniu.conf.ACCESS_KEY = Access_Key;
  qiniu.conf.SECRET_KEY = Secret_Key;
  const client = new qiniu.rs.Client();
  const bucket = Bucket_Name;
  client.remove(bucket, fileName, function (err, ret) {
    if (!err) {
      console.log(`删除文件${fileName}成功======${idx}`);
    } else {
      console.log(`删除文件${fileName}失败======${idx}`);
      console.log(err);
    }
  });
}

// 记录文件名到待删除文件中
const recordToPdfs = (str) => {
  fs.appendFile(path.join(PDF_DIRNAME, 'pdfs.log'), str);
}

// 删除pfds.log中的文件
export const deletePdfsOnQiniu = () => {
  try {
    const strFileNames = fs.readFileSync(path.join(PDF_DIRNAME, 'pdfs.log'), 'utf-8');
    const arrayFileNames = strFileNames.split(',');
    if (arrayFileNames.length > 0) {
      deleteFile(path.join(PDF_DIRNAME, `pdfs.log`));
      arrayFileNames.map((item, idx) => {
        if (item) {
          deleteFileOnQiniu(item, idx);
        }
      });
    }
  } catch (e) {
    console.log('删除七牛文件出错！');
  }
}

const uptoken = (Bucket_Name, fileName) => {
  const putPolicy = new qiniu.rs.PutPolicy(Bucket_Name + ":" + fileName);
  return putPolicy.token();
};

const uploadFile = (uptoken, key) => {
  const fileName = `${key}.pdf`;
  const localFile = path.join(PDF_DIRNAME, `${key}.pdf`);
  const extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, fileName, localFile, extra, function (err, ret) {
    if (!err) {
      // console.log(ret.hash, ret.key, ret.persistentId, '=======uploadFile result======');
      // 上传成功，获取下载连接
      _writeToLog(key, `creating,5,`);
      // 上传成功，　删除当前生成的pdf和html文件
      deleteFile(path.join(PDF_DIRNAME, `${key}.pdf`));
      deleteFile(path.join(PDF_DIRNAME, `${key}.html`));
      // 记录文件名到pdfs.log中
      recordToPdfs(`${key}.pdf,`);
      return getDownLoadUrl(key);
    } else {
      console.log(err, '=======uploadFile error======');
    }
  });
}

export const UpFileToQiniu = (fileName) => {
  _writeToLog(fileName, `creating,4,`);
  qiniu.conf.ACCESS_KEY = Access_Key;
  qiniu.conf.SECRET_KEY = Secret_Key;
  const token = uptoken(Bucket_Name, `${fileName}.pdf`);
  uploadFile(token, fileName);
}

const getDownLoadUrl = (fileName) => {
  qiniu.conf.ACCESS_KEY = Access_Key;
  qiniu.conf.SECRET_KEY = Secret_Key;
  const url = `${DOMAIN}${fileName}.pdf`;
  const policy = new qiniu.rs.GetPolicy();
  const downloadUrl = policy.makeRequest(url);
  _writeToLog(fileName, `sucess,6,${downloadUrl}`);
  return downloadUrl;
}

export const checkPDF = (req, res) => {
  const {companyName, stamp, username} = req.query;
  const statusFile = path.join(PDF_DIRNAME, `${username}${stamp}.log`);
  const result = fs.readFileSync(statusFile, 'utf-8');
  fs.exists(statusFile, (exists) => {
    if (exists) {
      const result = fs.readFileSync(statusFile, 'utf-8');
      const resultObj = {};
      const resultArray = result.split(',');
      resultObj.status = resultArray[0];
      resultObj.process = resultArray[1];
      resultObj.download = resultArray[2];
      res.status = 200;
      res.json(resultObj);
      if (resultObj.status === 'sucess') {
        deleteFile(statusFile);
      }
    } else {
      res.status = 404;
      res.json({
        errorCode: 404,
        message: '没有找到要下载的PDF文件,请稍后重试'
      });
    }
  });
}

exports.writeToLog = _writeToLog;
