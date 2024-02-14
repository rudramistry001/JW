const db = require("../models");
const Project = db.PROJECT;
const { sequelize } = require("../models");

exports.addProject = function(req,res){
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"})
        return;
    }
    const date = require('date-and-time');
    const now  =  new Date();
    const dateToday = date.format(now,'YYYY/MM/DD');
    const loginUserName = "Admin";
    const project = {
        clientId: req.body.clientId,
        name: req.body.name,
        detail: req.body.detail,
        createdBy: loginUserName,
        createdDate: dateToday,
        updatedBy: loginUserName,
        updatedDate: dateToday,
    };

    Project
    .create(project).then(data =>{
        res.send({status:'Success', message:"Project insert successfully",Data: data})
    })
    .catch(error=>{
        res.status(500).json({
            message:error.message || "Some error occurred while create operation"
          })
    })
}

exports.getProjects = function(req,res){
    Project.findAll()
    .then(data =>{
        res.send({status:'Success', message:"Project get all data",Data: data})
    })
    .catch(err =>{
        res.status(500).json({
          message: 
            err.message || "Some error occurred while create operation"
        });
      });
}

exports.getProjectById = function(req,res){
    const id = req.params.id;
    Project.findOne({where : {id: id}})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found project with id " + id });
        else res.send({status:'Success', message:"Project get data",Data: data});
    })  
    .catch(err => {
        res
      .status(500)
      .json({ message: "Error retrieving Tutorial with id=" + id });
    })
}

exports.getProjectByClient = async function(req,res){
  const cId = req.params.clientId;

  const [results, metadata] = await sequelize.query(
     "select * from projects where clientId = :id",
    {
      replacements: { id: cId },
    }
  );
  res.send({status:'Success', message:"project get data",Data: results});
 }

exports.updateProject = function(req,res){
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        }); 
      }
      const id = req.params.id;
      Project.update(req.body, { where: {id : id} })
        .then(data =>{
            if (!data) {
                res.status(404).json({    
                  message: `Cannot update project with id=${id}. Maybe project was not found!`
                });
              } else res.send({ message: "Project was updated successfully." });
        })
        .catch(err => {
            res.status(500).json({
              message: "Error updating Project with id=" + id
            });
          }
        )
}

exports.deleteProject = function(req,res){
    const id = req.params.id;
    Project.destroy({where : {id:id}})
    .then(data => {
      if (!data) {
         res.status(404).json({
          message: `Cannot delete project with id=${id}. Maybe project was not found!`
        })
      } else {
         res.json({
          message: "Project was deleted successfully!"
        })
      }
    })
    .catch(err => {
       res.status(500).send({
        message: "Could not delete Project with id=" + id
      })
    });
}