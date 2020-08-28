import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import user from "./routes/api/user";
const cors = require("cors");
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml')

const app = express();

connectDB();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", user);

const port = app.get("port");

app.use((error: any, req: any, res: any, next: any) => {
  const status = error.status || 500;
  console.error("An internal error occurred: ", error);
  res.status(status).send({
      message: error.message || "Internal Server Error",
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


app.use(function(req, res, next) {
  res.status(404);
  res.json({message:'Ooops.. this is not a valid route, check api docs: /api-docs'});
});

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
