module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
    userAssigneeId: {
        type: Sequelize.STRING
      },
    name:{
        type: Sequelize.STRING
    },
    checkIn: {
        type: Sequelize.DATE
      },
    checkOut: {
        type: Sequelize.DATE
    },
    createdBy:{
        type: Sequelize.STRING,
    },
    updatedBy:{
        type: Sequelize.STRING,
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    updatedAt: {
        type: Sequelize.DATE,
    }
    });
    return Attendance;
  };