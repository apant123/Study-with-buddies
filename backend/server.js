const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // This should be replaced with a database in a real-world application.


app.post('/api/signup', async (req, res) => {
  try {
    // Assume user is created successfully
    const user = await User.create(req.body);
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
