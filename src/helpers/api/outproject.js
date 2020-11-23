import * as service from "./axios";

const param_get_live_data = "/total?tz=Asia/Jakarta&noc=true&project_name=";
const param_get_project_name = "/project";
const param_get_chint = "/chint/5minutes?tz=Asia/Jakarta&noc=true&project_name=";
const param_get_inverter = "/inverter/5minutes?tz=Asia/Jakarta&noc=true&project_name=";

export const opGetLiveData = async (project_name) => {
  let url = `${param_get_live_data}${project_name}`;
  const result = await service.outProjectService
    .get(url)
    .then((res) => {
      return {
        data: res.data[0].data,
        node_id: res.data[0].node_id,
        error: false,
      };
    })
    .catch((error) => {
      return {
        data: false,
        error: error,
      };
    });

  return result;
};

export const opGetProjectName = async () => {
  let url = `${param_get_project_name}`;
  const result = await service.outProjectService
    .get(url)
    .then((res) => {
      return {
        data: res.data.projects,
        error: false,
      };
    })
    .catch((error) => {
      return {
        data: false,
        error: error,
      };
    });

  return result;
};

export const opGetChint = async (project_name) => {
  let url = `${param_get_chint}${project_name}`;
  const result = await service.outProjectService
    .get(url)
    .then((res) => {
      return {
        data: res.data,
        error: false,
      };
    })
    .catch((error) => {
      return {
        data: false,
        error: error,
      };
    });

  return result;
};

export const opGetInverter = async (project_name) => {
  let url = `${param_get_inverter}${project_name}`;
  const result = await service.outProjectService
    .get(url)
    .then((res) => {
      return {
        data: res.data,
        error: false,
      };
    })
    .catch((error) => {
      return {
        data: false,
        error: error,
      };
    });

  return result;
};