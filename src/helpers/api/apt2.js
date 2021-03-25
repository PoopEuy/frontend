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

export const apt2GetLoggerSla = async (param) => {
  const result = await instanceApt2
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

export const apt2ApiGetVendor = async () => {
  const result = await instanceApt2
    .get(`/api/vendors`)
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

export const apt2ApiAddVendor = async (data) => {
  const result = await instanceApt2
    .post(`/api/vendors`, data)
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

export const apt2ApiEditVendor = async (id, data) => {
  const result = await instanceApt2
    .put(`/api/vendors/${id}`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apiGetCutoff = async (param) => {
  const result = await instanceApt2
    .get(`/api/cutoff`, { params: { site: param } })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apiAddCutoff = async (data) => {
  const result = await instanceApt2
    .post(`/api/cutoff`, data)
    .then((res) => {
      return res.status;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apiAddTicket = async (data) => {
  const result = await instanceApt2
    .post(`/api/ticket`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return result;
};

export const apiEditTicket = async (id) => {
  const result = await instanceApt2
    .put(`/api/ticket/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return result;
};

export const apiGetTicket = async (params) => {
  const result = await instanceApt2
    .get(`/api/ticket`, { params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apiGetProgress = async (params) => {
  const result = await instanceApt2
    .get(`/api/progress`, { params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const apiAddProgress = async (data) => {
  const result = await instanceApt2
    .post(`/api/progress`, data)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return result;
};

export const apiPutProgress = async (id) => {
  const result = await instanceApt2
    .put(`/api/progress/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return result;
};
