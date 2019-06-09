import * as dotenv from "dotenv";
import * as utils from "./utils";
if (utils.isDev()) dotenv.config();

import * as bodyParser from "body-parser";
import * as express from "express";
import { Api } from "./api/api";

if (utils.isDev()) {
  console.log("Starting server in dev mode.");
} else {
  console.log("Starting server in prod mode.");
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const api = new Api();
app.use("", api.getRouter());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
