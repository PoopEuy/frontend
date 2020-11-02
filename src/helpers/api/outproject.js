import * as service from "./axios";

const param_get_live_data = "/total?tz=Asia/Jakarta&noc=true&project_name=";
const param_get_project_name = "/project";

export const opGetLiveData = async (project_name) => {
  let url = `${param_get_live_data}${project_name}`;
  const result = await service.getTotalEnergy
    .get(url)
    .then((res) => {
      return {
        data: res.data[0].data,
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
  const result = await service.getProjectName
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