const mongoose = require('mongoose');

//mongodb://username:password@host:port/database
const URI = 'mongodb+srv://DMM:Nefta-Diana@cluster0.29r8p.mongodb.net/appShop';
mongoose.connect(URI,{ useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;


// Database : appNode
// Collection : libros