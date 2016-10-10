const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');

//Setting up the App
app.use(express.static('./public'));
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

//Setting up the server
const port = process.env.PORT || 3000;
const server = http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
