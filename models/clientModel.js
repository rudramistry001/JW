module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
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
    return Client;
  };