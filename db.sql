--create admin table--
const createAdmin = `
     CREATE TABLE IF NOT EXISTS admin(
       adminId INT(6) NOT NULL PRIMARY KEY,
       firstName VARCHAR(255),
       lastName VARCHAR(255),
       email VARCHAR(255),
       password VARCHAR(1024)
     )`;

--insert new admins into admin table--
INSERT INTO admin (adminId, firstName, lastName, email, password) VALUE(?,?,?,?,?)

--to verify whether the admin already exists--
SELECT * FROM admin WHERE email = ?

--to edit the admin profile--
UPDATE admin SET firstName = ?, lastName = ? WHERE adminId = ?

--create a table for applied job applications--
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


--insert applications into job application table--
INSERT INTO applications (appId, jobId, userId, userName, firstName, lastName, email, phoneNumber, experience, projects) VALUES (?,?,?,?,?,?,?,?,?,?)`;

--verify whether the user already applied for the job--
SELECT * FROM applications WHERE jobId = ? AND userId = ?`;

--verify whether the user is already registered--
`SELECT * FROM users WHERE email=?`

--to create a table for posted jobs--
CREATE TABLE IF NOT EXISTS jobs(
       jobId INT(6) NOT NULL PRIMARY KEY,
       role VARCHAR(255),
       company VARCHAR(255),
       description VARCHAR(1024),
       preferredSkills VARCHAR(255),
       salary VARCHAR(255),
       adminId INT(6)
     )`

--to insert new jobs being posted into posted jobs table--
let insertJob = `INSERT INTO jobs (jobId, role, company, description, preferredSkills, salary, adminId) VALUES (?,?,?,?,?,?,?)`;

--to see all jobs openings that are posted--
SELECT * fROM jobs

--to see all the job openings posted by a particular admin--
`SELECT * fROM jobs WHERE adminId = ?`

--to get a specific job opening posted by a particular admin-- 
SELECT * FROM jobs WHERE jobId = ? AND adminId = ?

--to get all the applications for a particular job--
`SELECT * FROM applications WHERE jobId = ?`

--To delete a specific job posted by a particular admin--
`DELETE FROM jobs WHERE jobId = ? AND adminId = ?`;

--To delete all applications realted to a job posting--
`DELETE FROM applications WHERE jobId = ?`;

--To get all the jobs that are posted by admin--
`SELECT * fROM jobs WHERE adminId = ?`;
 
--to create a user table--
const createUser = `
     CREATE TABLE IF NOT EXISTS users(
       userId INT(6) NOT NULL PRIMARY KEY,
       userName VARCHAR(255),
       firstName VARCHAR(255),
       lastName VARCHAR(255),
       email VARCHAR(255),
       password VARCHAR(1024),
       phoneNumber VARCHAR(10),
       address VARCHAR(1024)
     )`;

--to insert new accounts in user table--
let insertUser = `INSERT INTO users (userId, userName, firstName, lastName, email, password, phoneNumber, address) VALUES (?,?,?,?,?,?,?,?)`;

--verifies whether the username already exists--
let checkUserName = `SELECT * FROM users WHERE userName = ?`;

--verifies whether the eamil is already registered to a user's account--
let checkEmail = `SELECT * FROM users WHERE email = ?`

--to get all users--
let getUser = `SELECT * FROM users WHERE userId = ?`;

--to edit a user profile--
UPDATE users SET firstName = ?, lastName = ?, address = ?, phoneNumber = ? WHERE userId = ?



