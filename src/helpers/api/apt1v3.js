import { instanceApt1v3 } from "./axios";

export const apt1v3GetNojs = async () => {
  const result = await instanceApt1v3
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

export const apt1v3PutNojs = async (nojs, data) => {
  const result = await instanceApt1v3
    .put(`/api/nojs/${nojs}`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apt1v3PostNojs = async (data) => {
  const result = await instanceApt1v3
    .post(`/api/nojs`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apt1v3GetLogger = async (param) => {
  const result = await instanceApt1v3
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

export const apt1v3GetLoggerSla = async (param) => {
  const result = await instanceApt1v3
    .get(`/api/logger/sla`, {
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

export const apt1v3GetLoggerSlaTVD = async (param) => {
  const result = await instanceApt1v3
    .get(`/api/logger/tvd`, {
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

export const apt1v3ApiCapacity = async (params) => {
  const result = await instanceApt1v3
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

export const apt1v3ApiProgram = async (params) => {
  const result = await instanceApt1v3
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
