const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

require("./routes/index")(app);

const PORT = process.env.PORT;

const cluster = require("cluster");
const http = require("http");
const { dbSuccessLog, dbErrorLog, messageLog } = require("./common/messages");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  dbSuccessLog(`Master : ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    dbErrorLog(`Worker : ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer(app).listen(PORT);

  messageLog(`Worker : ${process.pid} started`);
}
