require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3000, function() {
  console.log('Server running on port 3000.')
})
