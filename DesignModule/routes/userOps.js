var express = require("express");
var router = express.Router();
var sequelize = require("../db/config");
var Sequelize = require("sequelize");
const Op = Sequelize.Op

router.post("/login", (req, res) => {
    console.log("Inside post request", req.body);
    sequelize.user_table
      .findAll({
        order: [["userId", "ASC"]],
        where: {
          email: req.body.email
        },
  
        attributes: ["firstName", "lastName", "email", "password", "role"]
      })
      .then(userInstance => {
        console.log(userInstance);
        if(res.status = "200"){
          console.log('inside login'),
          res.cookie('cookie', req.body.email , { maxAge: 900000, httpOnly: false, path :'/' })
        }
        res.json({
          user: userInstance,
          status: 200
        });
      })
      .catch(function(err) {
        res.json({
          message: err.message,
          status: 404
        });
      });
  });

  router.post("/register", (req, res, next) => {
    console.log(req.body);
    let user = sequelize.user_table.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
  
    user
      .save()
      .then(userInstance => {
        console.log("User Registered Successfully");
        console.log(res.status)
        
        res.json({
          user: userInstance,
          message: "User Registered Successfully!!!",
          status: 200
          
        });
  
        
      })
      .catch(function(err) {
        res.json({
          message: err.message,
          status: 404
        });
      });
    });

    module.exports = router;