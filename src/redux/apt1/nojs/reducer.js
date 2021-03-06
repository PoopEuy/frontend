import { apt1NojsType } from "./action";

const nojsInitialState = {
  dataApt1Nojs: false,
  dataApt1NojsDetail: false,
  dataApt1NojsEdit: false,
  errorApt1Nojs: false,
};

export default function reducer(state = nojsInitialState, action) {
  switch (action.type) {
    case apt1NojsType.APT1_NOJS:
      return {
        ...state,
        dataApt1Nojs: action.payload.data,
        errorApt1Nojs: action.payload.error,
      };
    case apt1NojsType.APT1_NOJS_DETAIL:
      return {
        ...state,
        dataApt1NojsDetail: action.payload.data,
      };
    case apt1NojsType.APT1_NOJS_EDIT:
      return {
        ...state,
        dataApt1NojsEdit: action.payload.data,
      };
    default:
      return state;
  }
}
