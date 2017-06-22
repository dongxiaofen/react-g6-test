import fs from 'fs';
import cp from 'child_process';
import path from 'path';
import url from 'url';
import superagent from 'superagent';
import qiniu from 'qiniu';

const Access_Key = 'sDS7g5o_Ik92uZJ3_vCIP9qOk1RYzETIYF2o5VA-';
const Secret_Key = 'V5lMQ7JiZ-goU8L7bvm9PUVX5aYY779ACotOvkP1';
const Bucket_Name = 'intel-wise';
const DOMAIN = 'http://oq4zadj3a.bkt.clouddn.com/';

const BASE_DIRNAME = process.cwd();
const PDF_DIRNAME = path.join(BASE_DIRNAME, '/static/pdf/');

const writeToLog = (fileName, str) => {
  const logPath = path.join(PDF_DIRNAME, `${fileName}.log`);
  fs.appendFile(logPath, str);
}

const writeDownLoadUrl = (fileName, str) => {
  const _str = `{downloadUrl: ${str}}`;
  writeToLog(fileName, _str);
}

const deletePdfHtml = (fileName) => {
  const pdfFile = path.join(PDF_DIRNAME, `${fileName}.pdf`);
  const htmlFile = path.join(PDF_DIRNAME, `${fileName}.html`);
  deleteFile([pdfFile, htmlFile]);
}

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
    if (callBack) { callBack(); }
  });
}

const uptoken = (Bucket_Name, fileName) => {
  const putPolicy = new qiniu.rs.PutPolicy(Bucket_Name+":"+fileName);
  return putPolicy.token();
};

const uploadFile = (uptoken, key) => {
  const fileName = `${key}.pdf`;
  const localFile = path.join(PDF_DIRNAME, fileName);
  const extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(uptoken, fileName, localFile, extra, function(err, ret) {
    if(!err) {
      // console.log(ret.hash, ret.key, ret.persistentId, '=======uploadFile result======');
      // 上传成功，获取下载连接
      getDownLoadUrl(key);
      // 上传成功，　删除当前生成的pdf和html文件
      deletePdfHtml(key);
    } else {
      console.log(err, '=======uploadFile error======');
    }
  });
}

export const UpFileToQiniu = (fileName) => {
  console.log(fileName, '=====fileName======');
  // qiniu.conf.ACCESS_KEY = Access_Key;
  // qiniu.conf.SECRET_KEY = Secret_Key;
  // const token = uptoken(Bucket_Name, `${fileName}.pdf`);
  // uploadFile(token, fileName);
}

const getDownLoadUrl = (fileName) => {
  qiniu.conf.ACCESS_KEY = Access_Key;
  qiniu.conf.SECRET_KEY = Secret_Key;
  const url = `${DOMAIN}${fileName}`;
  const policy = new qiniu.rs.GetPolicy();
  const downloadUrl = policy.makeRequest(url);
  // console.log(downloadUrl,'=====downloadUrl====');
  writeDownLoadUrl(fileName, downloadUrl);
}
