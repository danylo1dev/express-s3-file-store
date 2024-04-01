require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json());

const indexRouter = require("./indexRouter");

app.use(indexRouter);

app.listen(process.env.Port);
