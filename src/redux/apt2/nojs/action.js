import {
  apt2GetNojs,
  apt2PostNojs,
  apt2PutNojs,
  apt2ApiCapacity,
} from "@helpers/api/apt2";

export const apt2NojsType = {
  APT2_NOJS: "APT2_NOJS",
  APT2_CAPACITY: "APT2_CAPACITY",
};

export const getApt2Nojs = () => (dispatch) => {
  const data = apt2GetNojs();
  data.then((res) => {
    dispatch({
      type: apt2NojsType.APT2_NOJS,
      payload: {
        data: res.data.data,
      },
    });
  });
};

export const editApt2Nojs = (nojs, data) => (dispatch) => {
  apt2PutNojs(nojs, data);
};

export const addApt2Nojs = (data) => (dispatch) => {
  apt2PostNojs(data);
};

export const getApt2Capacity = () => (dispatch) => {
  const data = apt2ApiCapacity();
  data.then((res) => {
    dispatch({
      type: apt2NojsType.APT2_CAPACITY,
      payload: {
        data: res.data.data,
      },
    });
  });
};
