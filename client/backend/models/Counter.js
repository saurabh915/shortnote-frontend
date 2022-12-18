const mongoose = require('mongoose');
const { Schema } = mongoose;

const CountSchema = new Schema({
   count: {
      type: Number,
      default:1,
     
   },
  
});

const Count = mongoose.model('count', CountSchema)
module.exports = Count