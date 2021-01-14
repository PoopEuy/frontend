import { apt1v3NojsType } from "./action";

const initialState = {
  dataApt1v3Nojs: false,
  dataApt1v3Capacity: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case apt1v3NojsType.APT1V3_NOJS:
      return {
        ...state,
        dataApt1v3Nojs: action.payload.data,
      };
    case apt1v3NojsType.APT1V3_CAPACITY:
      return {
        ...state,
        dataApt1v3Capacity: action.payload.data,
      };
    default:
      return state;
  }
}
