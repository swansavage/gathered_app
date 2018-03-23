const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const Vendor = require('./models/vendors/vendors.js');


// =====MIDDLEWARE========
// method methodOverride
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//=====CONTROLLERS=======

// vendors controller
const vendorsController = require('./controllers/vendors.js');
app.use('/vendors', vendorsController);




//=====ROUTES===========
//index route
app.get('/', (req,res) => {
  res.render('index.ejs');
});

// seed route
const seed = require('./models/seed.js')
app.get('/seedVendors', (req, res)=> {

  Vendor.create(seed, (err, createdVendors)=>{
    console.log(seed);
    console.log(createdVendors);
    res.redirect('/');
  });
});



const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gathered';
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
