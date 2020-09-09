import { instanceApt1 } from "./axios";

export const apt1GetNojs = async () => {
  const result = await instanceApt1
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

export const apt1PutNojs = async (nojs, data) => {
  const result = await instanceApt1
    .put(`/api/nojs/${nojs}`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apt1PostNojs = async (data) => {
  const result = await instanceApt1
    .post(`/api/nojs`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apt1GetServiceOpen = async () => {
  const result = await instanceApt1
    .get(`/api/servicewithsla`, {
      params: {
        status: "OPEN",
      },
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

export const apt1PutServiceOpen = async (service_id, data) => {
  const result = await instanceApt1
    .put(`/api/servicecalls/${service_id}`, data)
    .then((res) => {
      return {
        error: false,
      };
    })
    .catch((error) => {
      return {
        error: true,
      };
    });

  return result;
};

export const apt1GetServiceChart = async (param) => {
  const result = await instanceApt1
    .get(`/api/servicecount`, {
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
