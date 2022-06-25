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
export const getAdDetail = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/ad_detail?${queryStr}`);
};
