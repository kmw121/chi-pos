// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
          target: "http://18.221.86.250:8080",
      changeOrigin: true,
    })
  );
};
