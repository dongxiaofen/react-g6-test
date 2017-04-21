function Formater(response) {
  this.rootData = response.data;
  this.rootLen = this.rootData.length;
  this.pushCount = 0;
  this.formatResult = [];
}
function filterById(arr, uId) {
  return arr.filter(item => {
    return item.id === uId;
  })[0];
}
function getIdByEmail(data, email) {
  for (let idx = 0; idx < data.length; idx++) {
    if (data[idx].email === email) {
      return data[idx].id;
    }
  }
}
function formatData() {
  const email = arguments[2] || '';
  const rootData = this.rootData;
  const rootLen = this.rootLen;
  const pIdArray = arguments[0] ? arguments[0] : [getIdByEmail(rootData, email)];
  const pLevel = arguments[1] ? arguments[1] : 0;
  if (rootLen !== 0 && this.pushCount !== rootLen) {
    pIdArray.forEach(pId => {
      let nextLevel;
      let user;
      const childUserIdArr = [];
      rootData.forEach(item => {
        if (item.parentUserId === pId) {
          childUserIdArr.push(item.id);
        }
      });
      user = filterById(rootData, pId);
      this.formatResult.push(Object.assign(user, {
        childUserId: childUserIdArr,
        level: pLevel,
        extend: pLevel === 0 ? true : false,
      }));
      this.pushCount++;
      if (childUserIdArr.length > 0) {
        nextLevel = pLevel + 1;
        this.formatData(childUserIdArr, nextLevel);
      }
    });
  }
}

Formater.prototype.formatData = formatData;
export default Formater;
