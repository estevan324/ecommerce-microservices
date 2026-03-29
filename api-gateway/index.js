const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({ quiet: true });

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/users",
  createProxyMiddleware({
    target: process.env.USERS_API_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/users": "/users",
    },
  }),
);

app.all("/users", (req, res) => {
  res.status(405).json({ message: "Method Not Allowed" });
});

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
