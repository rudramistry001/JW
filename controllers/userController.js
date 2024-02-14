const db = require("../models");
const User = db.USER;
const bcrypt = require('bcrypt');
const { sequelize } = require("../models");
const saltRounds = 10;

exports.login = async function(req,res,next){
    const body = req.body;
    const user = await User.findOne({email: body.email});
    if(user === null){
      res.status(400).json({status : 'Error' , error: "EmailId are not match" });
    }
    if(user) {
      const validPassword = await bcrypt.compare(body.password,user.password);
      user.password = undefined;
      if(validPassword){
        res.json({status : 'Success' , message : "Your login success fully",Data:user})
      }else{
        res.status(400).json({status : 'Error' , error: "Invalid Password" });
      }
    }
}

exports.register = async function (req, res, next) {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const date = require('date-and-time');
  const now = new Date();
  const loginUserName = "Admin";
  const dateToday = date.format(now, 'YYYY/MM/DD');

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    account: req.body.account,
    password: encryptedPassword,
    role: req.body.role,
    contactNumber: req.body.contactNumber,
    active: req.body.active,
    createdBy: loginUserName,
    updatedBy: loginUserName,
  };

  // Check if email already exists
  User.findOne({ where: { email: user.email } })
    .then(existingUser => {
      if (existingUser) {
        // Email already exists, send a response indicating that
        res.status(409).json({
          status: 'Error',
          message: 'User registered already exists',
        });
      } else {
        // Email doesn't exist, create the new user
        User.create(user)
          .then(data => {
            res.send({
              status: 'Success',
              message: "User registered successfully",
              Data: data
            });
          })
          .catch(err => {
            res.status(500).json({
              message: err.message || "Some error occurred while creating the user"
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while checking email existence"
      });
    });
};

exports.getUsers = function(req,res,next){
  User.findAll().then(data =>{
      res.send({status:'Success', message:"Users get all data",Data: data})
    })
    .catch(err =>{
      res.status(500).json({
        message:
          err.message || "Some error occurred while create operation"
      });
    });
}

exports.getUserById = async function(req,res,next){
  const userId = req.params.id;
  await User.findOne({where : {id: userId}})
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found user with id " + userId });
      else res.send({status:'Success', message:"User get data",Data: data});
  })
  .catch(err => {
    res
      .status(500)
      .json({ message: "Error retrieving Tutorial with id=" + userId });
  });
}

exports.getUserByRole= function(req,res){
  const roleName = req.params.role;
  User.findAll({ where : {role: roleName}})
  .then(data => {
    if(!data)
    res.status(404).send({ message: "Not found user with role " + roleName });
    else res.json({status:'Success', message:"Users get data",Data: data});
  })
  .catch(err => {
    res
  .status(500)
  .json({ message: "Error retrieving user with role=" + roleName });
  })
}

exports.updateUser = function(req, res, next){
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const userId = req.params.id;
  User.update(req.body, { where: {id: userId} })
    .then(data => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update User with id=${userId}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating Tutorial with id=" + userId
      });
    });
};

exports.getUsersRoleVise = async function(req,res) {
  const roleName = req.params.role;
  const siteName = req.params.site;
  const [results, metadata] = await sequelize.query(
    "select users.firstName, users.lastName from users Inner Join userAssignees on users.id = userAssignees.id where userAssignees.siteName = :site and users.role = :role",
    {
      replacements: { role: roleName, site: siteName },
    }
  );
  res.send({status:'Success', message:"Users get data",Data: results});
}

exports.resetPassword = function(req,res){
if(!req.body){
  return res.status(400).send({
    message: "reset password value is empty!"
  });
}


};

exports.deleteUser = function(req,res,next){
  const promise = new Promise((resolve, reject)=>{
    const id = req.params.id;
    User.destroy({where : {id: id}})
    .then(data => {
      if (!data) {
        reject( res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        }))
      } else {
        resolve( res.send({
          message: "User was deleted successfully!"
        }))
      }
    })
    .catch(err => {
      reject( res.status(500).send({
        message: "Could not delete User with id=" + id
      }))
    });
  })
  promise.then(values=>{
    console.log('value',values)
  })
}
