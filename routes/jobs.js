const express = require("express");
const router = express.Router();
var con = require('../utils/db');
const auth = require('../utils/authAdmin');
const Joi = require("joi");

router.post('/', auth, async(req, res) => {
    const createJob = `
     CREATE TABLE IF NOT EXISTS jobs(
       jobId INT(6) NOT NULL PRIMARY KEY,
       role VARCHAR(255),
       company VARCHAR(255),
       description VARCHAR(1024),
       preferredSkills VARCHAR(255),
       salary VARCHAR(255),
       adminId INT(6)
     )`;
 
       con.query(createJob, (err, result) => {
         if (err) throw err;
         console.log('Table [jobs] created');
       });

   let id = Math.floor(100000 + Math.random() * 900000);
   let role = req.body.role;
   let company = req.body.company;
   let description = req.body.description;
   let preferredSkills = req.body.preferredSkills;
   let salary = req.body.salary;
   let adminId = req.admin.adminId;
   let insertJob = `INSERT INTO jobs (jobId, role, company, description, preferredSkills, salary, adminId) VALUES (?,?,?,?,?,?,?)`;

   const { error } = validateJob(req.body);
  if (error) return res.send({error: error.details[0].message})
  else{
    con.query(insertJob,[id, role, company, description, preferredSkills, salary, adminId], (err, result) => {
      if (err) {
      res.status(500).json({error: err.code})
      }else {
        console.log(result)
        res.json({
             id,
             role,  
             company,
             description,
             preferredSkills,
             salary,
             adminId
             })
         }
     });
  }
 });

 router.get('/', async(req, res) => {
    const createJob = `
     CREATE TABLE IF NOT EXISTS jobs(
       jobId INT(6) NOT NULL PRIMARY KEY,
       role VARCHAR(255),
       company VARCHAR(255),
       description VARCHAR(1024),
       preferredSkills VARCHAR(255),
       salary VARCHAR(255),
       adminId INT(6)
     )`;
 
       con.query(createJob, (err, result) => {
         if (err) throw err;
         console.log('Table [jobs] created');
       });

   let getAllJobs = `SELECT * fROM jobs`;

   
    con.query(getAllJobs, (err, result) => {
        if (err) {
        res.status(500).json({error: err.code})
        }else {
          res.send(result)
           }
       });
 });

 router.get('/admin', auth, async(req, res) => {
  const createJob = `
   CREATE TABLE IF NOT EXISTS jobs(
     jobId INT(6) NOT NULL PRIMARY KEY,
     role VARCHAR(255),
     company VARCHAR(255),
     description VARCHAR(1024),
     preferredSkills VARCHAR(255),
     salary VARCHAR(255),
     adminId INT(6)
   )`;

     con.query(createJob, (err, result) => {
       if (err) throw err;
       console.log('Table [jobs] created');
     });

 let getAllJobs = `SELECT * fROM jobs WHERE adminId = ?`;

 
  con.query(getAllJobs, req.admin.adminId, (err, result) => {
      if (err) {
      res.status(500).json({error: err.code})
      }else {
        res.send(result)
         }
     });
});

router.get('/admin/:id', auth, async(req, res) => {
  const createJob = `
   CREATE TABLE IF NOT EXISTS jobs(
     jobId INT(6) NOT NULL PRIMARY KEY,
     role VARCHAR(255),
     company VARCHAR(255),
     description VARCHAR(1024),
     preferredSkills VARCHAR(255),
     salary VARCHAR(255),
     adminId INT(6)
   )`;

     con.query(createJob, (err, result) => {
       if (err) throw err;
       console.log('Table [jobs] created');
     });

 let getJob = `SELECT * FROM jobs WHERE jobId = ? AND adminId = ?`;
 let getApplications = `SELECT * FROM applications WHERE jobId = ?`
 let output ={};
 
  con.query(getJob, [req.params.id, req.admin.adminId], (err, result) => {
      if (err) {
      res.status(500).json({error: err.code})
      }else {
        output.job = result[0];
        con.query(getApplications, req.params.id, (err, resultApps) => {
          if (err) {
            res.status(500).json({error: err.code})
            }else {
              output.applications = resultApps;
              res.send(output)
            }
        })
      }
     });
});

router.delete('/admin/:id', auth, async(req, res) => {
  const createJob = `
   CREATE TABLE IF NOT EXISTS jobs(
     jobId INT(6) NOT NULL PRIMARY KEY,
     role VARCHAR(255),
     company VARCHAR(255),
     description VARCHAR(1024),
     preferredSkills VARCHAR(255),
     salary VARCHAR(255),
     adminId INT(6)
   )`;

     con.query(createJob, (err, result) => {
       if (err) throw err;
       console.log('Table [jobs] created');
     });

 let deleteJob = `DELETE FROM jobs WHERE jobId = ? AND adminId = ?`;
 let deleteApp = `DELETE FROM applications WHERE jobId = ?`;
 let getAllJobs = `SELECT * fROM jobs WHERE adminId = ?`;
 
  con.query(deleteJob, [req.params.id, req.admin.adminId], (err, result) => {
      if (err) {
      res.status(500).json({error: err.code})
      }else {
        con.query(deleteApp, req.params.id, (err, resultApps) => {
          if (err) {
            res.status(500).json({error: err.code})
            }else {
              con.query(getAllJobs, req.admin.adminId, (err, result) => {
                if (err) {
                res.status(500).json({error: err.code})
                }else {
                  res.send(result)
                   }
               });
            }
        })
      }
     });
});

function validateJob(obj) {
  const schema = Joi.object({
      role: Joi.string().min(1).max(50).required(),
      company: Joi.string().min(1).max(200).required(),
      description: Joi.string().min(1).max(1024).required(),
      preferredSkills: Joi.string().min(1).max(1024).required(),
      salary:Joi.string().min(1).max(200).required(),
  });

  return schema.validate(obj);
}

 module.exports = router;