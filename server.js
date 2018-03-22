const express = require('express');
const mongoose = require('mongoose');
const app     = express();
const port    = process.env.PORT || 3000;




//  index route
app.get('/', (req, res)=>{
  res.send('INDEX PAGE');
});












const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth';
mongoose.connect(mongoURI);

mongoose.connection.once('open', ()=>{
  console.log('*******************');
  console.log('connected to mongo');
  console.log('*******************');
});


app.listen(port,()=>{
  console.log('---------------------------------');
  console.log('Server running on port: ' + port);
  console.log('---------------------------------');
});
