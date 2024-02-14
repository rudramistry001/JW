
module.exports = (sequelize, Sequelize) => {
    const UserAssignee = sequelize.define("userAssignee", {
        uId: {
        type: Sequelize.STRING
      },
      clientName: {
        type: Sequelize.STRING
      },
      projectName: {
        type: Sequelize.STRING
      },
      siteName: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: true
      }
    });
    return UserAssignee;
  };
