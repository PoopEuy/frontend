import { apt1GetNojs, apt1PutNojs, apt1PostNojs } from "@helpers/api/apt1";

export const apt1NojsType = {
  APT1_NOJS: "APT1_NOJS",
  APT1_NOJS_DETAIL: "APT1_NOJS_DETAIL",
  APT1_NOJS_EDIT: "APT1_NOJS_EDIT",
};

export const getApt1Nojs = () => (dispatch) => {
  const data = apt1GetNojs();
  data.then((res) => {
    dispatch({
      type: apt1NojsType.APT1_NOJS,
      payload: {
        data: res.data,
        error: res.error,
      },
    });
  });
};

export const editApt1Nojs = (nojs, data) => (dispatch) => {
  apt1PutNojs(nojs, data);
};

export const addApt1Nojs = (data) => (dispatch) => {
  apt1PostNojs(data);
};
