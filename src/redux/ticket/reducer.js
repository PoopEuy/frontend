import { ticketTypes } from "./action";

const initialState = {
  ticket: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ticketTypes.TICKET:
      return {
        ...state,
        ticket: action.payload.data,
      };
    default:
      return state;
  }
}
