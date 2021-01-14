import axios from "axios";

const baseURLApt1 = process.env.NEXT_PUBLIC_BASE_URL_APT1;
const baseURLApt1V3 = process.env.NEXT_PUBLIC_BASE_URL_APT1V3;
const baseURLApt2 = process.env.NEXT_PUBLIC_BASE_URL_APT2;
const baseURLOutProject = process.env.NEXT_PUBLIC_BASE_URL_OP;
const accessToken = process.env.NEXT_PUBLIC_TOKEN_APT1;

const OPToken = process.env.NEXT_PUBLIC_TOKEN_OP;

export const instanceApt1 = axios.create({
  baseURL: baseURLApt1,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const instanceApt1v3 = axios.create({
  baseURL: baseURLApt1V3,
});

export const instanceApt2 = axios.create({
  baseURL: baseURLApt2,
});

export const outProjectService = axios.create({
  baseURL: baseURLOutProject,
  headers: {
    Authorization: `Token ${OPToken}`,
  },
});
