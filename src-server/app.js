const express = require('express');
require('./db/mongoose'); //Load MongoDB Database.
const downloadRouter = require('./routers/download');
const uploadRouter = require('./routers/upload');
const keycodeCheck = require('./routers/keycodeCheck');
const { job } = require('./crons/autoDelete');
const cors = require('cors');
const startupParams = require('./startup/start.js');
const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
    transports: [
      new transports.File({ filename: 'src-server/logs/combined.log' }) 
    ],
    exceptionHandlers: [
      new transports.File({ filename: 'src-server/logs/exceptions.log' })
    ]
});

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
app.use(downloadRouter, uploadRouter, keycodeCheck);

// Set Crons: Each minute, search for expired texts or files:-
job.start();

// Start App
app.listen(...startupParams(process.env.PORT));