const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();//calling function which is in another file
const app = express()
const port = process.env.PORT || 5000 ;//using port provided by heroku

app.use(cors()) //Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))//this path is used for api
app.use('/api/notes', require('./routes/notes'))
if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}
app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})
