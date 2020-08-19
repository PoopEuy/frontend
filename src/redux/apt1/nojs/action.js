import Axios from "axios";

export const apt1NojsType = {
  APT1_NOJS: "APT1_NOJS",
  APT1_NOJS_DETAIL: "APT1_NOJS_DETAIL",
  APT1_NOJS_EDIT: "APT1_NOJS_EDIT",
};

export const getApt1Nojs = () => (dispatch) => {
  const access_token =
    "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";
  Axios.get("http://127.0.0.1:8000/api/nojs", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: apt1NojsType.APT1_NOJS,
        payload: {
          data: res.data,
          error: false,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: apt1NojsType.APT1_NOJS,
        payload: {
          data: false,
          error: error.message,
        },
      });
    });
};

export const getApt1NojsDetail = (nojs) => (dispatch) => {
  const access_token =
    "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";
  Axios.get("http://127.0.0.1:8000/api/nojs/" + nojs, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      dispatch({
        type: apt1NojsType.APT1_NOJS_DETAIL,
        payload: {
          data: res.data,
          error: false,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: apt1NojsType.APT1_NOJS_DETAIL,
        payload: {
          data: false,
          error: error.message,
        },
      });
    });
};

export const editApt1Nojs = (nojs, data) => (dispatch) => {
  console.log("action edit");
  const access_token =
    "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";
  Axios.put("http://127.0.0.1:8000/api/nojs/" + nojs, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: apt1NojsType.APT1_NOJS_EDIT,
        payload: {
          data: true,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: apt1NojsType.APT1_NOJS_EDIT,
        payload: {
          data: false,
        },
      });
    });
};

export const addApt1Nojs = (data) => (dispatch) => {
  console.log("action add");
  const access_token =
    "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";
  Axios.post("http://127.0.0.1:8000/api/nojs/", data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: apt1NojsType.APT1_NOJS_EDIT,
        payload: {
          data: true,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: apt1NojsType.APT1_NOJS_EDIT,
        payload: {
          data: false,
        },
      });
    });
};
