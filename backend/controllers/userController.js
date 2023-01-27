const User= require('../models/userModel')
const auth = require("../config/firebase-config");
const mongoose = require('mongoose')


const getAllUsers = async (req, res) => {
  const userInfo = await User.find({}).sort({createdAt: -1}) 

  res.status(200).json(userInfo)
}
const deleteUser= async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No record found!'})
   }

   const userInfo = await User.findOneAndDelete({_id: id})

   if (!userInfo) {
      return res.status(400).json({error: 'No record found!'}) // if no record found
  }

  res.status(200).json(userInfo)

}
const getOneUser = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(404).json({error: 'No record found!'})
  }

  const userInfo = await User.findById(id) 

  if (!userInfo) {
      return res.status(404).json({error: 'No record found!'}) // if no record found
  }

  res.status(200).json(userInfo)
}
// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
    
            // create a token 
            const token = createToken(user._id)
    
            res.status(200).json({email, token})
    
       } catch (error) {
            
            res.status(400).json({error: error.message})
       }
}

// sign up user 
const signupUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const middleName = req.body.middleName;
  
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const birthDate = req.body.birthDate;
    const specialization= req.body.specialization;
    console.log(auth)
  
    try {
      await auth
        .createUser({
          email: email,
          emailVerified: false,
          password: password,
          // displayName: displayName,
          disabled: false,
        })
        .then(async (userRecord) => {
          console.log("Successfully created new user:",userRecord.uid);
          const user = await User.create({
            userID: userRecord.uid,
            email:email,
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
            gender:gender,
            birthDate:birthDate,
            specialization:specialization
      
          });
          return res.status(201).json(user);
        })
        .catch((error) => {
          console.log("Error creating new user:", error);
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// upadate patient
const updateUser= async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No record found!'})
     }

     const userinfo = await User.findOneAndUpdate({_id: id}, {...req.body})

     if (!userinfo) {
        return res.status(400).json({error: 'No record found!'}) // if no record found
    }

    res.status(200).json(userinfo)
}

module.exports = { loginUser,signupUser ,getAllUsers, deleteUser,getOneUser,updateUser}