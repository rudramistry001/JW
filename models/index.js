const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.dialect,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    // dialectOptions: {
    //   options: {
    //     // instanceName: 'MSSQLNODE',
    //     trustServerCertificate: true
    //   },
    // }
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.url = dbConfig.uri;
db.USER = require("../models/userModel.js")(sequelize, Sequelize);
db.ASSIGNEE_USER = require("../models/userAssignee")(sequelize, Sequelize);
db.CLIENT = require("../models/clientModel")(sequelize, Sequelize);
db.PROJECT = require("../models/projectModel")(sequelize, Sequelize);
db.SITE = require("../models/siteModel")(sequelize, Sequelize);
db.ATTENDANCE = require("../models/attendanceModel")(sequelize, Sequelize);
module.exports = db;
