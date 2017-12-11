import __repeat from 'lodash/repeat';
export function shieldInfo(data) {
  const start = data.substring(0, 2);
  const end = data.substring(data.length - 3, data.length - 1);
  const shieldData = start + __repeat('*', data.length - 4) + end;
  // const shieldData = start + '**********' + end;
  return shieldData;
}
