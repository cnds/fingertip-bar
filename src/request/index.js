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

// 游戏详情
export const getClientAdDetail = (queryStr) => {
  if (process.env.NODE_ENV === "development") {
    return axios.get(`/m/ad_detail?${queryStr}`);
  }

  return axios.get(`https://api.maobey.com/m/ad_detail?${queryStr}`);
};

// 发送短信
export const sendSms = (queryStr, params) => {
  if (process.env.NODE_ENV === "development") {
    return axios.post(`/m/sms?${queryStr}`, params);
  }

  return axios.post(`https://api.maobey.com/m/sms?${queryStr}`, params);
};

// 绑定手机
export const bindMobile = (queryStr, params) => {
  if (process.env.NODE_ENV === "development") {
    return axios.post(`/m/bind_mobile?${queryStr}`, params);
  }

  return axios.post(`https://api.maobey.com/m/bind_mobile?${queryStr}`, params);
};

// 获取余额详情
export const getBalanceDetail = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/balance_detail?${queryStr}`);
};
