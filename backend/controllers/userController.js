const be_portal= require('../models/userModel')

const auth = require("../config/firebase-config");



// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await be_portal.login(email, password)
    
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
    const firstName = req.body.fname;
    const middleName = req.body.mname;
  
    const lastName = req.body.lname;
  
  
  
  
    try {
      await auth
        .createUser({
          email: email,
          emailVerified: false,
          password: password,
          // displayName: displayName,
          disabled: false,
        })
        .then(async () => {
          console.log("Successfully created new user:");
          const user = await be_portal.create({
            firstName:firstName,
            middleName:middleName,
            lastName:lastName,
      
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

module.exports = { signupUser, loginUser }