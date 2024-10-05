const mongoose = require('mongoose');

require('dotenv').config()

console.log(process.env.DBURI)

mongoose.connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
        console.log('Connected to MongoDB')
        module.exports = {db: mongoose.connection.db};
    })
  .catch((error) => console.error('Connection error', error));



