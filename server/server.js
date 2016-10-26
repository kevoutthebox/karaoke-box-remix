const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const apiRouter = require('./apirouter');
const reviewRouter = require('./reviewrouter');

// Connecting to MongoDB hosted on MongoLabs
mongoose.connect(JSON.parse(fs.readFileSync(`${__dirname}/config.json`, 'utf8')).uri, () => {
  connectedToDB = true;
  console.log('mongo connection established');
});

//Setting up the App
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
//set routes for the song review portion of site using ejs and api server for react app
const songReviewRouter = express.Router();
app.use('/songreview', songReviewRouter);
reviewRouter(songReviewRouter);
apiRouter(app);

app.get('*', (req, res) => {
  // res.end(fs.readFileSync('../public/index.html'));
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
})

//Setting up the server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app).listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
