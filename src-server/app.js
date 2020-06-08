const express = require('express');
require('./db/mongoose'); //Load MongoDB Database.
const downloadRouter = require('./routers/download');
const uploadRouter = require('./routers/upload')

// Core Modules
const path = require('path');

const PORT = process.env.PORT;
const app = express();

// Public Directory:
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

app.use(express.json());

// Load Routers:-
app.use(downloadRouter, uploadRouter);


// Start App
app.listen(PORT, () => {
    console.log('App started on PORT ' + PORT)
});