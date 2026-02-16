import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";


dotenv.config();

const app = express();
app.use(cors());

// AUTH MIDDLEWARE

function verifyToken(req, res, next) {
  console.log("Incoming:", req.originalUrl);

  if (req.originalUrl.startsWith("/auth")) return next();

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.headers["x-user-id"] = decoded.id;
    req.headers["x-user-role"] = decoded.role;

    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// PROXIES

const authProxy = createProxyMiddleware({
  target: "http://auth:5001",
  changeOrigin: true,

  onProxyReq: (proxyReq, req) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});


const productProxy = createProxyMiddleware({
  target: "http://product:5002",
  changeOrigin: true,

  pathRewrite: {
    "^/products": "",
  },

  onProxyReq: (proxyReq, req) => {
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});

app.use(verifyToken);

// ROLE 

function adminOnly(req, res, next) {
  if (req.headers["x-user-role"] !== "ADMIN")
    return res.status(403).send("Admins only");

  next();
}

// ROUTES

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "/auth",
    },
  }),
);


app.delete("/products/:id", adminOnly, productProxy);
app.use("/products", productProxy);

app.listen(process.env.PORT, () =>
  console.log(`Gateway running on ${process.env.PORT}`),
);
