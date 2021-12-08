const express = require('express');
const passport = require('./../../auth/passport');
const router = express.Router();
//router.use(express.static('public'));

router.get('/login', function (req, res, next) {
    res.render('../components/auth/login', { title: 'Login' });
});


router.post('/login',
  passport.authenticate('local'),
  function(req, res){
    console.log('passport auth success!!=======================================')
    if(req.user){
      res.render('index');
    }
    else{
      res.redirect('/login');
    }
  }
);



router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;