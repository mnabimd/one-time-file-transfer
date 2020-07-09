const express = require('express');
require('./db/connection'); //Load Sequelize Database.
const downloadRouter = require('./routers/download');
const uploadRouter = require('./routers/upload');
const keycodeCheck = require('./routers/keycodeCheck');
const { job } = require('./crons/autoDelete');
const cors = require('cors');
const startupParams = require('./startup/start.js');

// Core Modules
const path = require('path');

const app = express();

// Public Directory:
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// Methods on app :-
app.use(cors());
app.use(express.json());

// Load Routers:-
// app.use(downloadRouter, uploadRouter, keycodeCheck);
app.use(uploadRouter, downloadRouter, keycodeCheck);

// Set Crons: Each minute, search for expired texts or files:-
job.start();

// Start App
app.listen(...startupParams(process.env.PORT));