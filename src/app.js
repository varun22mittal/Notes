const express = require("express");
const noteRoutes = require("./routers/noteRoutes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);

app.use("/notes", noteRoutes);

app.use(errorHandler);

module.exports = app;
