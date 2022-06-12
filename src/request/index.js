import axios from "axios";

export const getDashboard = (queryStr) => {
  return axios.get(`https://api.maobey.com/m/dashboard?${queryStr}`);
};
