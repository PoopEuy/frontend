const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const nextConfig = {
  //   env: {
  //     URL_APT1: process.env.URL_APT1,
  //   },
};
module.exports = withPlugins([withImages({})]);
