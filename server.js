const path = require("path");

app.use(express.static(path.join(__dirname, "../"))); 
// this will serve index.html & login.html if they are in project root


const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Deena',
  password: 'angelica@123',  // <-- replace with your MySQL password
  database: 'mindcare'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Test Route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).send("Database error");

    if (results.length === 0) {
      return res.status(400).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, results[0].password);
    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    // ✅ If login successful → redirect to index.html
    res.redirect('/index.html');
  });
});
