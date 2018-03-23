const express = require('express');
const router  = express.Router();
const Vendor   = require('../models/vendors/vendors.js');




//  vendor index route
router.get('/', (req, res)=>{
  Vendor.find({}, (err, allVendors)=>{
    res.render('vendors/vendors.ejs', {
      vendors: allVendors
    });
  });
});

// vendor new route (form)
router.get('/new', (req,res)=> {
  res.render('vendors/new.ejs');
});

// vendor create route
router.post('/', (req,res)=> {
  Vendor.create(req.body, ()=>{
  res.redirect('/');
  });
});

// vendor edit route
router.get('/:id/edit', (req,res)=> {
  Vendor.findById(req.params.id, (err,foundVendor)=>{
    res.render('vendors/edit.ejs', {
      vendor: foundVendor
    });
  });
});

// vendor update route
router.put('/:id', (req,res)=>{
  Vendor.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,foundVendor)=>{
    res.redirect('/vendors/' + req.params.id);
  });
});

// vendor destroy route
router.delete('/:id', (req,res)=>{
  Vendor.findByIdAndRemove(req.params.id, (err, foundVendor)=> {
    res.redirect('/');
  });
});

// vendor show route
router.get('/:id', (req,res)=> {
    Vendor.findById(req.params.id, (err,foundVendor)=> {
      res.render('vendors/show.ejs', {
        vendor: foundVendor
      });
    });
});



module.exports = router;
