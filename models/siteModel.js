module.exports = (sequelize, Sequelize) => {
    const Site = sequelize.define("site", {
    clientId: {
        type: Sequelize.STRING
      },
      projectId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdBy:{
        type: Sequelize.STRING,
       },
      updatedBy:{
          type: Sequelize.STRING,
      },
    });
    return Site;
  };