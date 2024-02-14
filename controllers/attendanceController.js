const db = require("../models");
const Attendance = db.ATTENDANCE;
const { sequelize } = require("../models");
const Op = db.Sequelize.Op;

exports.addAttendance = function(req,res){
  const date = require('date-and-time');
  const now  =  new Date();
  const dateToday = date.format(now,'YYYY/MM/DD');

  if(!req.body){
        res.status(400).send({message:"content can not be empty!"})
        return;
    }
    const loginUserName = "Admin";
    const attendance = {
        userAssigneeId: req.body.userAssigneeId,
        name : req.body.name,
        checkIn : req.body.checkIn,
        checkOut: req.body.checkOut,
        createdBy: loginUserName,
        updatedBy: loginUserName,
    };
  
    Attendance
    .create(attendance).then(data =>{
        res.send({status:'Success', message:"Attendance insert successfully",Data: data})
    })
    .catch(error=>{
        res.status(500).json({
            message:error.message || "Some error occurred while create operation"
          })
    })
}

exports.getAttendances = function(req,res){
    Attendance.findAll()
    .then(data =>{
        res.send({status:'Success', message:"Attendance get all data",Data: data})
    })
    .catch(err =>{
        res.status(500).json({
          message: 
            err.message || "Some error occurred while create operation"
        });
      });
}

exports.getAttendanceById = function(req,res){
    const userId = req.params.id;
    Attendance.findOne({where : {id : userId}})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found attendance with id " + id });
        else res.send({status:'Success', message:"attendance get data",Data: data});
    })
    .catch(err => {
        res
      .status(500)
      .json({ message: "Error retrieving attendance with id=" + id });
    })
}

exports.getAttendanceReportByClient = async function(req,res){
  const clientName = req.params.clientName;
  const [results, metadata] = await sequelize.query(
    "select attendances.name, attendances.checkIn, attendances.checkOut,attendances.updatedBy from attendances Inner Join userAssignees on attendances.userAssigneeId = userAssignees.uId where userAssignees.clientName = :cName", {
      replacements: { cName: clientName },
    }
  );
  res.send({status:'Success', message:"Attendance report by client get data",Data: results});
}

exports.getAttendanceReportByProject = async function(req,res){
  const projectName = req.params.projectName;
  const [results, metadata] = await sequelize.query(
    "select attendances.name, attendances.checkIn, attendances.checkOut,attendances.updatedBy from attendances Inner Join userAssignees on attendances.userAssigneeId = userAssignees.uId where userAssignees.clientName = :pName", {
      replacements: { pName: projectName },
    }
  );
  res.send({status:'Success', message:"Attendance report by project get data",Data: results});
}

exports.getAttendanceReportBySite = async function(req,res){
  const siteName = req.params.siteName;
  const [results, metadata] = await sequelize.query(
    "select attendances.name, attendances.checkIn, attendances.checkOut,attendances.updatedBy from attendances Inner Join userAssignees on attendances.userAssigneeId = userAssignees.uId where userAssignees.siteName = :sName", {
      replacements: { sName: siteName },
    }
  );
  res.send({status:'Success', message:"Attendance report by site get data",Data: results});
}


exports.getAttendanceReportByDate = async function(req,res){

  const fromDate = req.params.fromDate;
  const toDate = req.params.toDate;

// await sequelize.query(`select * from attendances where createdAt between ${fromDate} and ${toDate}`).then(result => {
//     console.log(result)
// })
Attendance.findAll({
  where: {
      createdAt: {
          [Op.lt]: new Date(new Date(toDate).getTime() + 60 * 60 * 24 * 1000 - 1),
          [Op.gt]: new Date(fromDate)
      }
  },
}).then(data =>{
  res.send({status:'Success', message:"Attendance get all data",Data: data})
})
}

exports.updateAttendance = function(req,res){
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        }); 
      }
      const userId = req.params.id;
      Attendance.update(req.body, { where: {id: userId} })
        .then(data =>{
            if (!data) {
                res.status(404).json({    
                  message: `Cannot update attendance with id=${userId}. Maybe attendance was not found!`
                });
              } else res.send({ message: "Attendance was updated successfully." });
        })
        .catch(err => {
            res.status(500).json({
              message: "Error updating attendance with id=" + userId
            });
          }
        )
}

exports.deleteAttendance = function(req,res){
    const id = req.params.id;
    Attendance.destroy({where :  {id : id}})
    .then(data => {
      if (!data) {
       res.status(404).json({
          message: `Cannot delete attendance with id=${id}. Maybe attendance was not found!`
        })
      } else {
        res.json({
          message: "Attendance was deleted successfully!"
        })
      }
    })
    .catch(err => {
     res.status(500).send({
        message: "Could not delete attendance with id=" + id
      })
    });
}