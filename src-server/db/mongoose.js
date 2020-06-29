const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mohammadnabi:Afghan321@clusterfree.oikmt.mongodb.net/one-time-file-transfer-api?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})