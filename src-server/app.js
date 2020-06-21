const express = require('express');
require('./db/mongoose'); //Load MongoDB Database.
const downloadRouter = require('./routers/download');
const uploadRouter = require('./routers/upload');
const keycodeCheck = require('./routers/keycodeCheck');
const cors = require('cors');

// Core Modules
const path = require('path');

const PORT = process.env.PORT;
const app = express();

// Public Directory:
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// Methods on app :-
app.use(cors());
app.use(express.json());

// Load Routers:-
app.use(downloadRouter, uploadRouter, keycodeCheck);


// Start App
app.listen(PORT, () => {
    console.log('App started on PORT ' + PORT)
});