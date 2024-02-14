const db = require("../models");
const Client = db.CLIENT;

exports.addClient = function(req,res){
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"})
        return;
    }
    const date = require('date-and-time');
    const now  =  new Date();
    const dateToday = date.format(now,'YYYY/MM/DD');
    const loginUserName = "Admin";
    const client = {
        name: req.body.name,
        detail: req.body.detail,
        createdBy: loginUserName,
        createdDate: dateToday,
        updatedBy: loginUserName,
        updatedDate: dateToday,
    };

    Client
    .create(client).then(data =>{
        res.send({status:'Success', message:"Client insert successfully",Data: data})
    })
    .catch(error=>{
        res.status(500).json({
            message:err.message || "Some error occurred while create operation"
          })
    })
}

exports.getClients = function(req,res){
    Client.findAll()
    .then(data =>{
        res.send({status:'Success', message:"Client get all data",Data: data})
    })
    .catch(err =>{
        res.status(500).json({
          message: 
            err.message || "Some error occurred while create operation"
        });
      });
}

exports.getClientById = function(req,res){
    const id = req.params.id;
    Client.findOne({where: {id : id}})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found client with id " + id });
        else res.send({status:'Success', message:"Client get data",Data: data});
    })
    .catch(err => {
        res
      .status(500)
      .json({ message: "Error retrieving client with id=" + id });
    })
}



exports.updateClient = function(req,res){
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        }); 
      }
      const id = req.params.id;
      Client.update(req.body,{ where: {id: id} })
        .then(data =>{
            if (!data) {
                res.status(404).json({    
                  message: `Cannot update client with id=${id}. Maybe client was not found!`
                });
              } else res.send({ message: "Client was updated successfully." });
        })
        .catch(err => {
            res.status(500).json({
              message: "Error updating Client with id=" + id
            });
          }
        )
}

exports.deleteClient = function(req,res){
    const id = req.params.id;
    Client.destroy({where : {id: id}})
    .then(data => {
      if (!data) {
       res.status(404).json({
          message: `Cannot delete client with id=${id}. Maybe client was not found!`
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