// actions.js

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const SET_TOKEN = "SET_TOKEN";

export const SetToken = (data) => ({
  type: SET_TOKEN,
  payload: data,
});

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};
