const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

const Vendor = require('./models/vendors/vendors.js');


// MIDDLEWARE
// method methodOverride
app.use(methodOverride('_method'));
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





//  index route
app.get('/vendors', (req, res)=>{
  Vendor.find({}, (err, allVendors)=>{
    res.render('vendors/vendors.ejs', {
      vendors: allVendors
    });
  });
});

// vendor new route (form)
app.get('/vendors/new', (req,res)=> {
  res.render('vendors/new.ejs');
});

// vendor post route
app.post('/vendors', (req,res)=> {
  Vendor.create(req.body, ()=>{
  res.redirect('/vendors');
  });
});

// vendor edit route
app.get('/vendors/:id/edit', (req,res)=> {
  Vendor.findById(req.params.id, (err,foundVendor)=>{
    res.render('vendors/edit.ejs', {
      vendor: foundVendor
    });
  });
});


// new vendor show route
app.get('/vendors/:id', (req,res)=> {
    Vendor.findById(req.params.id, (err,foundVendor)=> {
      res.render('vendors/show.ejs', {
        vendor: foundVendor
      });
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
