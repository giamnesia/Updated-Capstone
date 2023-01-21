const User= require('../models/userModel')
const auth = require("../config/firebase-config");



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

module.exports = { loginUser,signupUser  }