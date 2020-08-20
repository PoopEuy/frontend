import { tickActionTypes } from "./action";

const tickInitialState = {
  lastUpdate: false,
};

export default function reducer(state = tickInitialState, action) {
  switch (action.type) {
    case tickActionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.clock,
      });
    default:
      return state;
  }
}
