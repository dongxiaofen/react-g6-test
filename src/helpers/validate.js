const validate = {
  isNotEmpty: (value) => {
    if (value.length < 1) {
      return false;
    }
    return true;
  },
  validatePwd: (pwd) => {
    const reg = /^(?![a-zA-Z\d]+$)(?![a-zA-Z-(\W|_))]+$)(?![\d-(\W|_))]+$)[a-zA-Z\d-(\W|_))]{8,32}$/g;
    if (reg.test(pwd)) {
      return true;
    }
    return false;
  },
  isEqual: (pwd1, pwd2) => {
    if (pwd1 === pwd2) {
      return true;
    }
    return false;
  },
  email: (value) => {
    if (value) {
      const regExp = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-_.])+[A-Za-z0-9]{1,25}$/;
      return regExp.test(value);
    }
    return false;
  },
  vdEmail: (email) => {
    let msg = '';
    if (!validate.isNotEmpty(email)) {
      msg = '请输入账号';
    } else if (!validate.email(email)) {
      msg = '请输入正确的邮箱格式';
    }
    return msg;
  },
  vdPwd: (pwd, rePwd) => {
    let msg = '';
    if (!validate.isNotEmpty(pwd)) {
      msg = '请输入密码';
    } else if (!validate.validatePwd(pwd)) {
      msg = '请输入包含字母，数字和特殊字符的8-32位密码';
    } else if (rePwd && !validate.isEqual(pwd, rePwd)) {
      msg = '两次输入的密码不一致';
    }
    return msg;
  },
  vdRePwd: (pwd1, pwd2) => {
    let msg = '';
    if (!validate.isNotEmpty(pwd1)) {
      msg = '确认密码不能为空';
    } else if (pwd2 && !validate.isEqual(pwd1, pwd2)) {
      msg = '两次输入的密码不一致';
    } else if (!validate.validatePwd(pwd1)) {
      msg = '请输入包含字母，数字和特殊字符的8-32位密码';
    }
    return msg;
  },
  vdName: (name) => {
    let msg = '';
    if (!validate.isNotEmpty(name)) {
      msg = '请输入姓名';
    }
    return msg;
  },
  vdPwdIsNotEmpty: (pwd) => {
    let msg = '';
    if (!validate.isNotEmpty(pwd)) {
      msg = '请输入旧密码';
    }
    return msg;
  }
};

export default validate;
