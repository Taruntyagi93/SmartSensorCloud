var express = require("express");
var router = express.Router();
var sequelize = require("../db/config");
var Sequelize = require("sequelize");
const Op = Sequelize.Op

router.post("/addData", (req, res, next) => {
 console.log("data",req.body);
 console.log(req.body.data);
 let sensor_info = sequelize.sensor_data_table.build({
   sensorId: req.body.sensorId,
   data:req.body.data ,
   id:req.body.id
 });

 sensor_info
   .save()
   .then(userInstance => {
     console.log("Sensor Registered Successfully");
     res.json({
       sensor_info: userInstance,
       message: "Sensor Registered Successfully!!!",
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

router.get("/fetchData", (req, res) => {
  console.log("Inside get request",req.query);
  sequelize.sensor_data_table
    .findAll({where: {
      updatedAt: {[Op.between]:[req.query.checkin,req.query.checkout]
      }
      ,      
     sensorId: req.query.guests,
     
   },
      order: [["updatedAt", "ASC"]],
      attributes: [
        "sensorId",
        "data",
        "createdAt",
        "updatedAt"
      ]
    })
    .then(sensorInstances => {
      console.log(sensorInstances);
 
      res.json({
        sensors: sensorInstances,
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

 



router.post("/updateData", (req, res, next) => {
 console.log("data update", req.body);
 
 sequelize.sensor_data_table
   .update(
     {
      //sensorId: req.body.sensorId,
      sensorId: req.body.sensorId,
      data:req.body.data ,
      id:req.body.id
     },
     { returning: true, where: { sensorId: req.body.sensorId} }
   )
   .then(updatedStudent => {
     res.json({
       messgage: updatedStudent,
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

router.post("/deleteData", (req, res, next) => {
   console.log("inside delete sensor collected data",req.body);
   sequelize.sensor_data_table
     .destroy({
       where: {
        sensorId: req.body.sensorId
       }
     })
     .then(deletedInstance => {
       console.log(deletedInstance);
       res.json({
         student: deletedInstance,
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

// router.get("/editStudentRequest/:id", function(req, res) {
//  console.log("Inside Recruiter Display Post Request");
//  console.log("Req Body : ", req.body);
//  console.log("Req Params : ", req.params);
//  sequelize.student_table
//    .findAll({
//      where: {
//        uid: req.params.id
//      },
//      attributes: [
//        "uid",
//        "student_name",
//        "counsellor_name",
//        "hours",
//        "role",
//        "joining_date"
//      ]
//    })
//    .then(studentInstances => {
//      const studentInstance = studentInstances[0].dataValues;
//      res.json({
//        student: studentInstance,
//        status: 200
//      });
//    })
//    .catch(function(err) {
//      res.json({
//        message: err.message,
//        status: 404
//      });
//    });
// });

// router.post("/editStudentRequest", (req, res, next) => {
//  console.log(req.body);
//  sequelize.student_table
//    .findAll({
//      where: {
//        uid: req.body.id
//      },
//      attributes: [
//        "uid",
//        "student_name",
//        "counsellor_name",
//        "hours",
//        "role",
//        "joining_date"
//      ]
//    })
//    .then(studentInstances => {
//      const studentInstance = studentInstances[0].dataValues;
//      res.json({
//        student: studentInstance,
//        status: 200
//      });
//    })
//    .catch(function(err) {
//      res.json({
//        message: err.message,
//        status: 404
//      });
//    });
// });

// router.post("/editStudentDetails", (req, res, next) => {
//  console.log("edit student test", req.body);
//  sequelize.student_table
//    .update(
//      {
//        student_name: req.body.student_ame,
//        counsellor_name: req.body.counsellor_name,
//        role: req.body.role,
//        hours: req.body.hours,
//        joining_date: req.body.joining_date
//      },
//      { returning: true, where: { uid: req.body.id } }
//    )
//    .then(updatedStudent => {
//      res.json({
//        messgage: updatedStudent,
//        status: 200
//      });
//    })
//    .catch(function(err) {
//      res.json({
//        message: err.message,
//        status: 404
//      });
//    });
// });

// router.post("/deleteStudent", (req, res, next) => {
//  console.log(req.body);
//  sequelize.student_table
//    .destroy({
//      where: {
//        uid: req.body.id
//      }
//    })
//    .then(deletedInstance => {
//      console.log(deletedInstance);

//      res.json({
//        student: deletedInstance,
//        status: 200
//      });
//    })
//    .catch(function(err) {
// res.json({
//        message: err.message,
//        status: 404
//      });
//    });
// });

module.exports = router;