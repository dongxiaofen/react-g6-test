import __repeat from 'lodash/repeat';
export function shieldInfo(data) {
  const start = data.substring(0, 4);
  const end = data.substring(data.length - 5, data.length - 1);
  const shieldData = start + __repeat('*', data.length - 8) + end;
  // const shieldData = start + '**********' + end;
  return shieldData;
}
