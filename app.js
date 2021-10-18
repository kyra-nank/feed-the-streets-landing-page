require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public')); // allows server to find static files

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
  console.log('Server running on port 3000.')
})
