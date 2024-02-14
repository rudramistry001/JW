module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: true
      }
    });
    return User;
  };
