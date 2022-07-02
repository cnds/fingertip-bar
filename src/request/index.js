import axios from "axios";

// 首页信息
export const getDashboard = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/dashboard?${queryStr}`);
};

// 排重
export const deduplicate = (queryStr) => {
  if (process.env.NODE_ENV === "development") {
    return axios.get(`/m/deduplicate?${queryStr}`);
  }

  return axios.get(`https://api.maobey.com/m/deduplicate?${queryStr}`);
};

// 个人中心信息
export const getAccount = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/account?${queryStr}`);
};

// 我的游戏
export const getMyGames = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/my_games?${queryStr}`);
};

// 游戏详情
export const getServeAdDetail = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/ad_detail?${queryStr}`);
};

// 获取余额详情
export const getBalanceDetail = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/balance_detail?${queryStr}`);
};

// 服务端转发后端接口，避免CORS跨域
// 游戏详情
export const getClientAdDetail = (queryStr) => {
  if (process.env.NODE_ENV === "development") {
    return axios.get(`/api/getClientAdDetail?${queryStr}`);
  }

  return axios.get(`https://m.maobey.com/api/getClientAdDetail?${queryStr}`);
};

// 发送短信
export const sendSms = (queryStr, params) => {
  if (process.env.NODE_ENV === "development") {
    return axios.post(`/api/sendSms?${queryStr}`, params);
  }

  return axios.post(`https://api.maobey.com/api/sendSms?${queryStr}`, params);
};

// 绑定手机
export const bindMobile = (queryStr, params) => {
  if (process.env.NODE_ENV === "development") {
    return axios.post(`/api/bindMobile?${queryStr}`, params);
  }

  return axios.post(
    `https://api.maobey.com/api/bindMobile?${queryStr}`,
    params
  );
};

// 提现
export const applyWithdraw = (queryStr, params) => {
  if (process.env.NODE_ENV === "development") {
    return axios.post(`/api/applyWithdraw?${queryStr}`, params);
  }

  return axios.post(
    `https://api.maobey.com/api/applyWithdraw?${queryStr}`,
    params
  );
};
