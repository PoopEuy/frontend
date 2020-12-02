import { instanceApt2 } from "./axios";

export const apt2GetNojs = async () => {
  const result = await instanceApt2
    .get("/api/nojs")
    .then((res) => {
      return {
        data: res.data,
        error: false,
      };
    })
    .catch((error) => {
      return {
        data: false,
        error: error.message,
      };
    });

  return result;
};

export const apt2PutNojs = async (nojs, data) => {
  const result = await instanceApt2
    .put(`/api/nojs/${nojs}`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apt2PostNojs = async (data) => {
  const result = await instanceApt2
    .post(`/api/nojs`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};
