import axios from "axios";

const baseURLApt1 = process.env.NEXT_PUBLIC_BASE_URL_APT1;
const baseURLOutProject = process.env.NEXT_PUBLIC_BASE_URL_OP;
const accessToken =
  "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";

const OPToken = "705b7cf8e5d5957f7b5a91223b78b915292d3e50";
const timezone = "Asia/Jakarta";
const noc = true;
const project_name = "Herbert_karanganyar";

export const instanceApt1 = axios.create({
  baseURL: baseURLApt1,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getTotalEnergy = axios.create({
  baseURL: baseURLOutProject,
  headers: {
    Authorization: `Token ${OPToken}`,
  },
});

export const getProjectName = axios.create({
  baseURL: baseURLOutProject,
  headers: {
    Authorization: `Token ${OPToken}`,
  },
});