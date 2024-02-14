const db = require("../models");
const Site = db.SITE;
const { sequelize } = require("../models");

exports.addSite = function(req,res){
    if(!req.body){
        res.status(400).send({message:"content can not be empty!"})
        return;
    }
    const date = require('date-and-time');
    const now  =  new Date();
    const dateToday = date.format(now,'YYYY/MM/DD');
    const loginUserName = "Admin";
    const site = {
        clientId: req.body.clientId,
        projectId: req.body.projectId,
        name: req.body.name,
        detail: req.body.detail,
        address: req.body.address,
        createdBy: loginUserName,
        createdDate: dateToday,
        updatedBy: loginUserName,
        updatedDate: dateToday,
    };

    Site
    .create(site).then(data =>{
        res.send({status:'Success', message:"Site insert successfully",Data: data})
    })
    .catch(error=>{
        res.status(500).json({
            message:error.message || "Some error occurred while create operation"
          })
    })
}

exports.getSites = function(req,res){
    Site.findAll()
    .then(data =>{
        res.send({status:'Success', message:"Site get all data",Data: data})
    })
    .catch(err =>{
        res.send.status(500).json({
          message: 
            err.message || "Some error occurred while create operation"
        });
      });
}

exports.getSiteById = function(req,res){
    const id = req.params.id;
    Site.findOne({where : {id : id}})
    .then(data => {
        if(!data)
        res.status(404).send({ message: "Not found site with id " + id });
        else res.send({status:'Success', message:"Site get data",Data: data});
    })
    .catch(err => {
        res
      .status(500)
      .json({ message: "Error retrieving Tutorial with id=" + id });
    })
}

exports.getSiteByProject = async function(req,res){
  const name = req.params.projectName;
  const [results, metadata] = await sequelize.query(
    "select sites.id, sites.name from sites Inner Join projects on sites.projectId = projects.id where projects.name = :projectName",
    {
      replacements: { projectName: name },
    }
  );
  res.send({status:'Success', message:"Site get data",Data: results});
}

exports.getSiteByLocation = function(req,res){
  const location = req.params.location;
  Site.findAll({"address":location})
  .then(data => {
    if(!data)
    res.status(404).send({ message: "Not found site with user " + location });
    else res.send.json({status:'Success', message:"Site get data",Data: data});
  })
  .catch(err => {
    res
  .status(500)
  .json({ message: "Error retrieving site with id=" + location });
  })
}

exports.updateSite = function(req,res){
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        }); 
      }
      const id = req.params.id;
      Site.update(req.body, { where : {id : id}})
        .then(data =>{
            if (!data) {
                res.status(404).json({    
                  message: `Cannot update site with id=${id}. Maybe site was not found!`
                });
              } else res.send({ message: "Site was updated successfully." });
        })
        .catch(err => {
            res.status(500).json({
              message: "Error updating Tutorial with id=" + id
            });
          }
        )
}

exports.deleteSite = function(req,res){
    const id = req.params.id;
    Site.destroy({where : {id : id}})
    .then(data => {
      if (!data) {
       res.status(404).json({
          message: `Cannot delete site with id=${id}. Maybe site was not found!`
        })
      } else {
       res.send({
          message: "Site was deleted successfully!"
        })
      }
    })
    .catch(err => {
       res.status(500).send({
        message: "Could not delete Site with id=" + id
      })
    });
}