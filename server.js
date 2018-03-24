const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const Vendor = require('./models/vendors/vendors.js');
const User  = require('./models/users/users.js');

// =====MIDDLEWARE========
// method methodOverride
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static middleware
app.use(express.static('public'));
// session middleware
app.use(session({
  secret:'feedmeseymour',
  resave:false,
  saveUninitialized: false
}));

//=====CONTROLLERS=======

// vendors controller
const vendorsController = require('./controllers/vendors.js');
app.use('/vendors', vendorsController);

// users controller
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

// sessions controller
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController);


//=====ROUTES===========
//index route
app.get('/', (req,res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentuser
  });
});

// seed route
const seed = require('./models/seed.js')
app.get('/seedVendors', (req, res)=> {
  Vendor.create(seed, (err, createdVendors)=>{
    res.redirect('/vendors');
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
