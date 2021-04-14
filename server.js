const express = require('express');
const app = express();
const port = process.env.PORT || 3080;
const path = require('path');
const users = [];

app.use(express.static(path.join(__dirname,"dist")));
//app.use('/view-users');

app.get('/api/users', (req, res) => {
  //res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname,'dist','angular-ui','index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});