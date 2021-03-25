import { createStore, applyMiddleware, combineReducers } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import DataTable from "@redux/dataTable/reducer";
import DataApt1Nojs from "@redux/apt1/nojs/reducer";
import DataApt2Nojs from "@redux/apt2/nojs/reducer";
import DataApt1v3 from "@redux/apt1v3/reducer";
import Setting from "@redux/setting/reducer";
import Ticket from "@redux/ticket/reducer";
import Clock from "@redux/clock/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  DataTable,
  DataApt1Nojs,
  DataApt2Nojs,
  DataApt1v3,
  Setting,
  Ticket,
  Clock,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
