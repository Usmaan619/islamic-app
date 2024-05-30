// reducer

import { combineReducers } from "redux";
import { DECREMENT, INCREMENT, SET_TOKEN } from "../actions/action";

const initialState = {
  count: 0,

  token: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };

    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer: AuthReducer,
});

export default rootReducer;
