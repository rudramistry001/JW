module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
    clientId: {
        type: Sequelize.STRING
      },
    name: {
        type: Sequelize.STRING
      },
    detail: {
        type: Sequelize.STRING
      },
    createdBy:{
        type: Sequelize.STRING,
    },
    updatedBy:{
        type: Sequelize.STRING,
    }
    });
    return Project;
  };