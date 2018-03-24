//====================
// SESSIONS CONTROLLER
//====================


//=====Dependencies=====
const express = require('express');
const router = express.Router();

const User = require('../models/users/users.js');
const bcrypt = require('bcrypt');


//======Routes======


// session new route
router.get('/new', (req,res)=> {
    res.render('sessions/new.ejs');
});


// session create route
router.post('/', (req,res) => {
  User.findOne( {username: req.body.username}, (err, foundUser)=>{
    if( bcrypt.compareSync(req.body.password, foundUser.password) ){
      req.session.currentuser = foundUser;
      res.redirect('/');
    } else {
      res.send('wrong password');
    }
  });
});


// session destroy route
router.delete('/', (req,res)=>{
  req.session.destroy( ()=>{
    res.redirect('/')
  });
});


module.exports = router;
