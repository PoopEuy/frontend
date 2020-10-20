import axios from "axios";

const baseURLApt1 = process.env.NEXT_PUBLIC_BASE_URL_APT1;
const accessToken =
  "860Y2paeQbjXa0hQo2sV2JVwftxAKZLpDGZUxEpFTk9kvcyYYTvQSMo1R4yL4qN2GV4DJ6K5WjgrSmAP";
export const instanceApt1 = axios.create({
  baseURL: baseURLApt1,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
