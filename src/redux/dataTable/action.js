import Axios from "axios";
import jsonToTable from "@helpers/jsonToTable";

export const tableActionTypes = {
  TABLE_NOJS: "TABLE_NOJS",
};

export const setTableNojs = (data, title) => (dispatch) => {
  dispatch({
    type: tableActionTypes.TABLE_NOJS,
    payload: {
      data: data,
      error: false,
      title: title,
    },
  });
};
