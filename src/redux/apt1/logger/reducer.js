import { apt1LoggerType } from "./action";

const loggerInitialState = {
  dataApt1Logger: [],
};

export default function reducer(state = loggerInitialState, action) {
  switch (action.type) {
    case apt1LoggerType.APT1_LOGGER:
      return {
        ...state,
        dataApt1Logger: action.payload.data,
      };

    default:
      return state;
  }
}
