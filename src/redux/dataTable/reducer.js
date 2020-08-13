import { tableActionTypes } from "./action";

const tableInitialState = {
  dataTable: false,
  error: false,
  title: false,
};

export default function reducer(state = tableInitialState, action) {
  switch (action.type) {
    case tableActionTypes.TABLE_NOJS:
      return Object.assign({}, state, {
        dataTable: action.payload.data,
        error: action.payload.error,
        title: action.payload.title,
      });
    default:
      return state;
  }
}
