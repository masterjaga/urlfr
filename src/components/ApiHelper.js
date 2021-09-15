import axios from "axios";
import constants from "../config/constants";
axios.defaults.baseURL = constants.apiUrl;
export const createShortUrl = obj => {
  const requestUrl = "shorten";
  return axios.post(requestUrl, obj);
};

export const getMostViewUrl = () => {
  const requestUrl = "topaccessurls";
  return axios.get(requestUrl);
};