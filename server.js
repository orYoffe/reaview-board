const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const compression = require("compression");
const { getAdvisors, getLanguages } = require("./api/endpoints");

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(compression());

app.get("/api/advisors", getAdvisors);
app.get("/api/laguages", getLanguages);

app.use(
  express.static(path.resolve(__dirname, "./build"), {
    maxAge: "1y", // one year
  })
);
app.use("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `
API server listening at http://localhost:${port}
on ${process.env.NODE_ENV || "development"} environment
`
  );
});
