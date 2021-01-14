import {
  apt1v3GetNojs,
  apt1v3PostNojs,
  apt1v3PutNojs,
  apt1v3ApiCapacity,
} from "@helpers/api/apt1v3";

export const apt1v3NojsType = {
  APT1V3_NOJS: "APT1V3_NOJS",
  APT1V3_CAPACITY: "APT1V3_CAPACITY",
};

export const getApt1v3Nojs = () => (dispatch) => {
  const data = apt1v3GetNojs();
  data.then((res) => {
    dispatch({
      type: apt1v3NojsType.APT1V3_NOJS,
      payload: {
        data: res.data.data,
      },
    });
  });
};

export const editApt1v3Nojs = (nojs, data) => (dispatch) => {
  apt1v3PutNojs(nojs, data);
};

export const addApt1v3Nojs = (data) => (dispatch) => {
  apt1v3PostNojs(data);
};

export const getApt1v3Capacity = () => (dispatch) => {
  const data = apt1v3ApiCapacity();
  data.then((res) => {
    dispatch({
      type: apt1v3NojsType.APT1V3_CAPACITY,
      payload: {
        data: res.data.data,
      },
    });
  });
};
