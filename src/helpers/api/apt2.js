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

export const apt2GetLogger = async (param) => {
  const result = await instanceApt2
    .get(`/api/logger`, {
      params: param,
    })
    .then((res) => {
      return {
        data: res.data,
        error: false,
      };
    })
    .catch((error) => {
      return {
        error: true,
        message: error.message,
      };
    });

  return result;
};

export const apt2ApiCapacity = async (params) => {
  const result = await instanceApt2
    .get(`/api/capacity`)
    .then((res) => {
      return {
        error: false,
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        error: true,
        message: error.message,
      };
    });

  return result;
};

export const apt2ApiProgram = async (params) => {
  const result = await instanceApt2
    .get(`/api/statusprogram`)
    .then((res) => {
      return {
        error: false,
        data: res.data,
      };
    })
    .catch((error) => {
      return {
        error: true,
        message: error.message,
      };
    });

  return result;
};
