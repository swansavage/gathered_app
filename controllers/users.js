//=================
// USERS CONTROLLER
//=================


//dependencies
const express = require('express');
const router  = express.Router();
const User   = require('../models/users/users.js');
const bcrypt = require('bcrypt');



//  user index route
router.get('/', (req, res)=>{
  User.find({}, (err, allusers)=>{
    res.render('users/users.ejs', {
      users: allusers
    });
  });
});

// user new route (form)
router.get('/new', (req,res)=> {
  res.render('users/new.ejs');
});

// user create route
router.post('/', (req,res)=> {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
  res.redirect('/');
  });
});

// user edit route
router.get('/:id/edit', (req,res)=> {
  User.findById(req.params.id, (err,foundUser)=>{
    res.render('users/edit.ejs', {
      user: foundUser
    });
  });
});

// user update route
router.put('/:id', (req,res)=>{
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,foundUser)=>{
    res.redirect('/users/' + req.params.id);
  });
});

// user destroy route
router.delete('/:id', (req,res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=> {
    res.redirect('/');
  });
});

// user show route
router.get('/:id', (req,res)=> {
    User.findById(req.params.id, (err,foundUser)=> {
      res.render('users/show.ejs', {
        user: foundUser
      });
    });
});



module.exports = router;
