const db = require("../models");
const UserAssignee = db.ASSIGNEE_USER;
// const UserAssignee = require("../models/userAssignee");

exports.addUserAssignee = function(req, res){
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"})
        return;
    }
    const date = require('date-and-time');
    const now  =  new Date();
    const dateToday = date.format(now,'YYYY/MM/DD');
    const loginUserName = "Admin";
    const userAssignee = {
        uId: req.body.uId,
        clientName: req.body.clientName,
        projectName: req.body.projectName,
        siteName: req.body.siteName,
        active: req.body.active,
        createdBy: loginUserName,
        createdDate: dateToday,
        updatedBy: loginUserName,
        updatedDate: dateToday,
    };
    UserAssignee
    .create(userAssignee).then(data =>{
        res.send({status:'Success', message:"User assignee insert successfully",Data: data})
    })
    .catch(error=>{
        res.status(500).json({
            message:err.message || "Some error occurred while create operation"
          })
    })
}

exports.getUserAssignee = function(req,res){
    UserAssignee.findAll()
    .then(data =>{
        res.send({status:'Success', message:"User assignee get all data",Data: data})
    })
    .catch(err =>{
        res.send.status(500).json({
          message: 
            err.message || "Some error occurred while create operation"
        });
      });
}

exports.getUserAssigneeById = function(req,res){
    const id = req.params.id;
    UserAssignee.findOne({where : {id : id}})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found user assignee with id " + id });
        else res.send({status:'Success', message:"User assignee get data",Data: data});
    })
    .catch(err => {
        res
      .status(500)
      .json({ message: "Error retrieving client with id=" + id });
    })
}

exports.deleteAssigneeById = function(req,res){
    const id = req.params.id;
    UserAssignee.destroy({where : {id : id}})
    .then(data => {
      if (!data) {
         res.status(404).json({
          message: `Cannot delete user assignee with id=${id}. Maybe attendance was not found!`
        })
      } else {
      res.json({
          message: "User assignee was deleted successfully!"
        })
      }
    })
    .catch(err => {
      reject( res.status(500).send({
        message: "Could not delete user assignee with id=" + id
      }))
    });
}