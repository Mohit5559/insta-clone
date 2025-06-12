const config = require('./config');
const mongoose = require("mongoose");

// Connect nodeJs to Mongodb
function dbConnect() {
    mongoose.connect(config.db_host, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // If we use mongodb clude and live server so add this line.
        // useCreateIndex:true  // in local server don't use this line.
    })
    .then(console.log('DB connected Successfull!'))
    .catch(err => console.log(`error= ${err}`))
}

module.exports = dbConnect;