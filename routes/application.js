const express = require("express");
const router = express.Router();
var con = require('../utils/db');
const auth = require('../utils/authUser')
const Joi = require("joi");

router.post('/:id', auth, async(req, res) => {
    const createJob = `
     CREATE TABLE IF NOT EXISTS applications(
       appId INT(6) NOT NULL PRIMARY KEY,
       jobId INT(6),
       userId INT(6),
       userName VARCHAR(255),
       firstName VARCHAR(255),
       lastName VARCHAR(255),
       email VARCHAR(255),
       phoneNumber VARCHAR(10),
       experience VARCHAR(1024),
       projects VARCHAR(1024)
     )`;
 
       con.query(createJob, (err, result) => {
         if (err) throw err;
         console.log('Table [jobs] created');
       });

   let id = Math.floor(100000 + Math.random() * 900000);
   let jobId = parseInt(req.params.id);
   let userId = req.user.userId;
   let userName = req.user.userName;
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let email = req.body.email;
   let phoneNumber = req.body.phoneNumber;
   let experience = req.body.experience;
   let projects = req.body.projects;
   let insertJob = `INSERT INTO applications (appId, jobId, userId, userName, firstName, lastName, email, phoneNumber, experience, projects) VALUES (?,?,?,?,?,?,?,?,?,?)`;

   const { error } = validateApp(req.body);
  if (error) return res.send({error: error.details[0].message})
  else{
    con.query(`SELECT * FROM applications WHERE jobId = ? AND userId = ?`, [jobId, userId], (err, result) =>{
      if (err) {
        res.status(500).json({error: err.code})
        }else {
          if(result.length === 0){
            con.query(insertJob,[id, jobId, userId, userName, firstName, lastName, email, phoneNumber, experience, projects], (err, result) => {
              if (err) {
              res.status(500).json({error: err.code})
              }else {
                res.send('Success')
                 }
             });
          } else {
            res.send({error: 'You have already applied for this job'})
          }
        }
     })
  }
   
 });

function validateApp(obj) {
  const schema = Joi.object({
      firstName: Joi.string().min(1).max(50).required(),
      lastName: Joi.string().min(1).max(50).required(),
      email: Joi.string().min(1).max(200).required().email(),
      phoneNumber: Joi.string().min(10).max(10).required(),
      experience: Joi.string().min(1).max(1024).required(),
      projects: Joi.string().min(1).max(1024).required(),
  });

  return schema.validate(obj);
}

 module.exports = router;