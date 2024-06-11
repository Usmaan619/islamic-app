import axios from "axios";
import { environment } from "../enviroments/enviroment";
import { setData } from "./Storage.service";
import { SetToken } from "../actions/action";

export const registerAPI = async (payload) => {
  try {
    return await axios.post(`${environment?.apiUrl}reg`, payload);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginAPI = async (payload) => {
  try {
    return await axios.post(`${environment?.apiUrl}login`, payload);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const masjidDataAPI = async () => {
  try {
    const res = await axios.get(`${environment?.apiUrl}masjid`);
    return res?.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const checkToken = async (dispatch, token) => {
  await setData("token", token);
  dispatch(SetToken(token));
};
