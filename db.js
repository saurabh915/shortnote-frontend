const mongoose = require('mongoose');
// { useNewUrlparser:true,
//     useUnifiedTopology:true,}

const mongoURI = "mongodb+srv://saurabh99:patil99@cluster0.hjvio.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI,  { useNewUrlParser: true ,
             useUnifiedTopology:true,}   ,() => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;