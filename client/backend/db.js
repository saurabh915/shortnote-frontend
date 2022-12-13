const mongoose = require('mongoose');
// { useNewUrlparser:true,
//     useUnifiedTopology:true,}

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    mongoose.connect(mongoURI,  { useNewUrlParser: true ,
             useUnifiedTopology:true,}   ,() => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;