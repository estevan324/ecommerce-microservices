const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

app.use(
  "/login",
  createProxyMiddleware({
    target: `${process.env.USERS_API_URL}/login`,
    changeOrigin: true,
  }),
);

app.use(
  "/orders",
  createProxyMiddleware({
    target: `${process.env.ORDERS_API_URL}/orders`,
    changeOrigin: true,
  }),
);

app.listen(port, () => {
  console.log(`🚀 API Gateway running on port ${port}`);
});
