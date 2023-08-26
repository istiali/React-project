const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "sample",
});

app.post('/register', (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO register (name, email, number, password) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.number,
    req.body.password,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error: " + err.message);
    }
    return res.json(data);
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);

  const sql = "SELECT * FROM register WHERE email=? AND password=?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error: " + err.message);
    }

    if (data.length > 0) {
      const user = data[0];
      if (user.role === "admin") {
        return res.json("Admin");
      }
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

app.get('/getAllUsers', (req, res) => {
  const sql = "SELECT * FROM register";
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error: " + err.message);
    }
    return res.json(data);
  });
});

app.put('/updateUserRole', (req, res) => {
    const { email, newRole } = req.body;
    const sql = "UPDATE register SET role = ? WHERE email = ?";
    
    db.query(sql, [newRole, email], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error: " + err.message);
      }
      return res.json("Role updated successfully");
    });
  });
  

app.listen(8081, () => {
  console.log("Running");
});
