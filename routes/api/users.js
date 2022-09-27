const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');



const User = require('../../models/Users');

//@route POST api/users
//@desv Register user
//@access public
router.post(
  "/", 
  [
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min:6})

], 
  async (req, res) => {
  //console.log(req.body);

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }

  const {name,email,password}=req.body;

  try{

  //see if user exists
   let user= await User.findOne({email});

   if(user){
    return res.status(400).json({errors: [{msg: 'User already exists'}]});
   }

  //get user gravetor

  const avatar = gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    });

  //encript password

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password,salt);

  await user.save();

  //return jsonwebtoken

    res.send("User registered");

  }catch(err){

    console.error(err.message);

  }









});

module.exports = router;