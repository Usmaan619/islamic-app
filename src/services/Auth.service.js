import axios from "axios";
import { environment } from "../enviroments/enviroment";
import { setData } from "./Storage.service";
import { SetToken } from "../actions/action";

export const registerAPI = async (payload) => {
  try {
    return await axios.post(`${environment?.apiUrl}sign_m`, payload);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const loginAPI = async () => {
  try {
    return await axios.get(`${environment?.apiUrl}login`);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const checkToken = async (dispatch, token) => {
  await setData("token", token);
  dispatch(SetToken(token));
};
