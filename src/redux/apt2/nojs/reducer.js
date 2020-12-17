import { apt2NojsType } from "./action";

const nojsInitialState = {
  dataApt2Nojs: false,
  errorApt2Nojs: false,
};

export default function reducer(state = nojsInitialState, action) {
  switch (action.type) {
    case apt2NojsType.APT2_NOJS:
      return {
        ...state,
        dataApt2Nojs: action.payload.data,
      };
    default:
      return state;
  }
}
