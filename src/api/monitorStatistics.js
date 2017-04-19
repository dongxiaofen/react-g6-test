import axios from 'axios';

// 头条顶部的四个板块
export function getStatistic(params) {
  return axios.get('/api/riskBoard/statistic', { params: params });
}

// 变化趋势
export function getChangeTrend(params) {
  return axios.get('/api/riskBoard/changeTrend', { params: params });
}

// 获取所有地区分布
export function getProvinceAll(params) {
  return axios.get('/api/riskBoard/distribution/province/all', { params: params });
}

// 获取选定区域的数据
export function getProvince(params) {
  return axios.get('/api/riskBoard/distribution/province', { params: params });
}

// // 行业趋势
// export function getStatisticTrend(params, industryId) {
//   const newParams = params;
//   newParams.industryId = industryId;
//   return dispatch => {
//     setLoading(dispatch, 'statisticTrend', true);
//     axios.get('/api/riskBoard/industry/trend', { params: newParams })
//       .then((resp) => {
//         dispatch({
//           type: ActionTypes.SET_HEAD_TREND_STATISTIC_TREND,
//           data: resp.data,
//           params: newParams,
//         });
//         setLoading(dispatch, 'statisticTrend');
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: ActionTypes.SET_HEAD_TREND_STATISTIC_TREND,
//           data: [],
//         });
//         setErrorBody(
//           dispatch,
//           ['statisticChart', 'lineResult', 'errorBody'],
//           err.response.data
//         );
//         setLoading(dispatch, 'statisticTrend');
//       });
//   };
// }

// // 行业统计
// export function getStatisticChart(params) {
//   return (dispatch, getState) => {
//     setLoading(dispatch, 'statisticChart', true);
//     axios.get('/api/riskBoard/industry/statistic', { params: params })
//       .then((resp) => {
//         dispatch({
//           type: ActionTypes.SET_HEAD_TREND_STATISTIC_CHART,
//           data: resp.data,
//         });
//         setLoading(dispatch, 'statisticChart');
//         const newParams = getState().getIn(['headTrend', 'params']).toJS();
//         const industryId = getState().getIn(['headTrend', 'statisticChart', 'industryId']);
//         getStatisticTrend(newParams, industryId)(dispatch);
//       })
//       .catch((err) => {
//         setErrorBody(
//           dispatch,
//           ['statisticChart', 'pieResult', 'errorBody'],
//           err.response.data
//         );
//         setLoading(dispatch, 'statisticChart');
//       });
//   };
// }

// // 来源分析(最下面的图表)
// export function getSource(params) {
//   return dispatch => {
//     setLoading(dispatch, 'source', true);
//     axios.get('/api/riskBoard/source', { params: params })
//       .then((resp) => {
//         dispatch({
//           type: ActionTypes.SET_HEAD_TREND_SOURCE,
//           data: resp.data,
//           params: params,
//         });
//         setLoading(dispatch, 'source');
//       })
//       .catch((err) => {
//         console.log(err);
//         setErrorBody(
//           dispatch,
//           ['source', 'pieResult', 'errorBody'],
//           err.response.data
//         );
//         setErrorBody(
//           dispatch,
//           ['source', 'lineResult', 'errorBody'],
//           err.response.data
//         );
//         setLoading(dispatch, 'source');
//       });
//   };
// }

// export function setParams(params) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: ActionTypes.SET_HEAD_TREND_PARAMS,
//       data: params,
//     });
//     const newParams = getState().getIn(['headTrend', 'params']).toJS();
//     getStatistic(newParams)(dispatch);
//     getChangeTrend(newParams)(dispatch);
//     getStatisticChart(newParams)(dispatch, getState);
//     getProvinceAll(newParams)(dispatch, getState);
//     getSource(newParams)(dispatch);
//   };
// }
