const express = require('express');
const app     = express();
const port    = 3000;




//  index route
app.get('/', (req, res)=>{
  res.send('INDEX PAGE');
});

















app.listen(port,()=>{
  console.log('listening on: ' + port);
})
