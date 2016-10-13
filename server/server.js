const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

//Setting up the App
app.use(express.static('./public'));
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

app.get('*', (req, res) => {
  // res.end(fs.readFileSync('../public/index.html'));
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

//Setting up the server
const port = process.env.PORT || 3000;
const server = http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
