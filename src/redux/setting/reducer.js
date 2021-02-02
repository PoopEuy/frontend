import { settingTypes } from "./action";

const initialState = {
  vendor: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case settingTypes.VENDOR:
      return {
        ...state,
        vendor: action.payload.data,
      };
    default:
      return state;
  }
}
