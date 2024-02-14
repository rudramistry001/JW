const express = require('express');
const userRoutes = require('./routes/userRouter');
const attendance = require('./routes/attendanceRouter');
const client = require('./routes/clientRouter');
const project = require('./routes/projectRouter');
const site = require('./routes/siteRouter');
const userAssignee = require('./routes/userAssigneeRouter');
const app = express();
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.use('/v1',userRoutes)
app.use('/v1',attendance)
app.use('/V1',client)
app.use('/v1',project)
app.use('/v1',site)
app.use('/v1',userAssignee)
module.exports = app;